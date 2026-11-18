import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { JsonLd } from "@/components/json-ld";
import { Sheet } from "@/components/sheet";
import { SourceList } from "@/components/source-list";
import { categoryPath } from "@/lib/categories";
import { getAllPosts, getPost } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/site.config";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.summary,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `/posts/${post.slug}`,
      publishedTime: post.published,
      modifiedTime: `${post.date}T00:00:00.000Z`,
      authors: [siteConfig.author.name],
      tags: post.tags.map((tag) => tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

function PostFallback() {
  return (
    <div aria-hidden="true">
      <Sheet className="py-8">
        <div className="h-3 w-24 bg-line" />
        <div className="mt-4 h-8 w-4/5 bg-line" />
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full bg-line" />
          <div className="h-4 w-11/12 bg-line" />
          <div className="h-4 w-4/5 bg-line" />
        </div>
      </Sheet>
    </div>
  );
}

async function PostBody({ params }: PostPageProps) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPost(slug), getAllPosts()]);
  if (!post) notFound();

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const read = post.readingMinutes === 1 ? "1 min" : `${post.readingMinutes} min`;

  return (
    <Sheet className="py-8">
      <article>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.summary,
            datePublished: post.date,
            dateModified: post.date,
            url: absoluteUrl(`/posts/${post.slug}`),
            mainEntityOfPage: absoluteUrl(`/posts/${post.slug}`),
            articleSection: post.category,
            keywords: post.tags.map((tag) => tag.name).join(", "),
            author: {
              "@type": "Person",
              name: siteConfig.author.name,
              url: siteConfig.author.url,
            },
            publisher: {
              "@type": "Person",
              name: siteConfig.owner.name,
            },
            citation: post.sources.map((source) => source.url),
          }}
        />
        <h1 className="text-2xl leading-snug sm:text-3xl">{post.title}</h1>
        <p className="mt-2 text-sm text-muted">
          <time dateTime={post.date}>{post.dateLabel}</time>
          <span aria-hidden="true"> · </span>
          <Link href={categoryPath(post.category)} className="underline underline-offset-4">
            {post.category}
          </Link>
          <span aria-hidden="true"> · </span>
          <span>{read}</span>
          <span aria-hidden="true"> · </span>
          <span>
            by{" "}
            <a href={siteConfig.author.url} rel="author" className="underline underline-offset-4">
              {siteConfig.author.name}
            </a>
          </span>
        </p>
        <p className="mt-4">{post.summary}</p>
        <div className="prose mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
        <p className="mt-8 text-sm">
          {post.tags.map((tag, index) => (
            <span key={tag.slug}>
              {index > 0 ? <span aria-hidden="true">, </span> : null}
              <Link href={`/tags/${tag.slug}`} className="underline underline-offset-4">
                {tag.name}
              </Link>
            </span>
          ))}
        </p>
        <SourceList sources={post.sources} />
        {related.length > 0 ? (
          <section aria-labelledby="more-posts" className="mt-12">
            <h2 id="more-posts" className="text-base">
              More
            </h2>
            <ul className="mt-2 space-y-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/posts/${item.slug}`} className="underline underline-offset-4">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </Sheet>
  );
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <Suspense fallback={<PostFallback />}>
      <PostBody params={params} />
    </Suspense>
  );
}
