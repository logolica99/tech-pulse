import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { JsonLd } from "@/components/json-ld";
import { SourceList } from "@/components/source-list";
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
    authors: [{ name: siteConfig.author.name, url: absoluteUrl("/about") }],
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `/posts/${post.slug}`,
      publishedTime: `${post.date}T00:00:00.000Z`,
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
    <div className="mx-auto w-full max-w-2xl animate-pulse px-5 py-12 motion-reduce:animate-none" aria-hidden="true">
      <div className="h-3 w-28 rounded-full bg-chip" />
      <div className="mt-5 h-12 w-4/5 rounded-lg bg-chip" />
      <div className="mt-4 h-6 w-full rounded-lg bg-chip" />
      <div className="mt-10 space-y-3">
        <div className="h-4 w-full rounded bg-chip" />
        <div className="h-4 w-11/12 rounded bg-chip" />
        <div className="h-4 w-4/5 rounded bg-chip" />
      </div>
    </div>
  );
}

async function PostBody({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const categoryTag = post.tags.find((tag) => tag.slug === post.category.toLowerCase());
  const categoryHref = categoryTag ? `/tags/${categoryTag.slug}` : "/";

  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
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
            url: absoluteUrl("/about"),
          },
          publisher: {
            "@type": "Person",
            name: siteConfig.author.name,
          },
          citation: post.sources.map((source) => source.url),
        }}
      />
      <p className="font-sans text-xs uppercase tracking-[0.16em] text-muted">
        <Link href="/" className="hover:text-ink">
          Briefing
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href={categoryHref} className="text-accent hover:underline">
          {post.category}
        </Link>
      </p>
      <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">{post.title}</h1>
      <p className="mt-5 text-xl leading-relaxed text-muted">{post.summary}</p>
      <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-sm text-muted">
        <time dateTime={post.date}>{post.dateLabel}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
        <span aria-hidden="true">·</span>
        <Link href="/about" className="text-ink hover:underline" rel="author">
          {siteConfig.author.name}
        </Link>
      </p>
      <div
        className="prose prose-lg mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <SourceList sources={post.sources} />
    </article>
  );
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <Suspense fallback={<PostFallback />}>
      <PostBody params={params} />
    </Suspense>
  );
}
