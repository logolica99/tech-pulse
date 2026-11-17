import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PostCard } from "@/components/post-card";
import { getAllTags, getPostsByTag, toCard } from "@/lib/posts";
import { siteConfig } from "@/site.config";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag: slug } = await params;
  const result = await getPostsByTag(slug);
  if (!result) return { title: "Tag not found" };

  const description = `${result.tag.count} ${result.tag.count === 1 ? "post" : "posts"} tagged ${result.tag.name} on ${siteConfig.name}.`;

  return {
    title: `Posts tagged ${result.tag.name}`,
    description,
    alternates: { canonical: `/tags/${result.tag.slug}` },
    openGraph: {
      title: `Posts tagged ${result.tag.name}`,
      description,
      url: `/tags/${result.tag.slug}`,
    },
  };
}

function TagFallback() {
  return (
    <div className="mx-auto w-full max-w-2xl animate-pulse px-5 py-12 motion-reduce:animate-none" aria-hidden="true">
      <div className="h-3 w-20 rounded-full bg-chip" />
      <div className="mt-4 h-12 w-40 rounded-lg bg-chip" />
      <div className="mt-8 h-24 w-full rounded-lg bg-chip" />
    </div>
  );
}

async function TagBody({ params }: TagPageProps) {
  const { tag: slug } = await params;
  const result = await getPostsByTag(slug);
  if (!result) notFound();

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
      <p className="font-sans text-xs uppercase tracking-[0.18em] text-copper">
        <Link href="/" className="hover:underline">
          Briefing
        </Link>
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">{result.tag.name}</h1>
      <p className="mt-4 text-lg text-muted">
        {result.tag.count} {result.tag.count === 1 ? "post" : "posts"} tagged {result.tag.name}.
      </p>
      <div className="mt-8">
        {result.posts.map((post, index) => (
          <PostCard key={post.slug} post={toCard(post)} featured={index === 0} />
        ))}
      </div>
    </div>
  );
}

export default function TagPage({ params }: TagPageProps) {
  return (
    <Suspense fallback={<TagFallback />}>
      <TagBody params={params} />
    </Suspense>
  );
}
