import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PostList } from "@/components/post-list";
import { Sheet } from "@/components/sheet";
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

  const description =
    result.tag.count === 0
      ? `Posts tagged ${result.tag.name} on ${siteConfig.name}.`
      : `${result.tag.count} ${result.tag.count === 1 ? "post" : "posts"} tagged ${result.tag.name} on ${siteConfig.name}.`;

  return {
    title: result.tag.name,
    description,
    alternates: { canonical: `/tags/${result.tag.slug}` },
    openGraph: {
      title: result.tag.name,
      description,
      url: `/tags/${result.tag.slug}`,
    },
  };
}

function TagFallback() {
  return (
    <div aria-hidden="true">
      <Sheet className="py-8">
        <div className="h-6 w-24 bg-line" />
        <div className="mt-6 h-16 w-full bg-line" />
      </Sheet>
    </div>
  );
}

async function TagBody({ params }: TagPageProps) {
  const { tag: slug } = await params;
  const result = await getPostsByTag(slug);
  if (!result) notFound();

  const countLabel =
    result.tag.count === 0
      ? "No posts yet."
      : result.tag.count === 1
        ? "1 post."
        : `${result.tag.count} posts.`;

  return (
    <Sheet className="py-8">
      <h1 className="text-xl">{result.tag.name}</h1>
      <p className="mt-2 text-sm text-muted">{countLabel}</p>
      <div className="mt-8">
        <PostList posts={result.posts.map(toCard)} />
      </div>
    </Sheet>
  );
}

export default function TagPage({ params }: TagPageProps) {
  return (
    <Suspense fallback={<TagFallback />}>
      <TagBody params={params} />
    </Suspense>
  );
}
