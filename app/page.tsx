import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { PostList } from "@/components/post-list";
import { Sheet } from "@/components/sheet";
import { getAllPosts, toCard } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/site.config";

const title = `${siteConfig.name} — AI, energy, robotics, and space`;

export const metadata: Metadata = {
  title: { absolute: title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: siteConfig.description,
    url: "/",
  },
};

export default async function HomePage() {
  const posts = (await getAllPosts()).map(toCard);

  return (
    <Sheet className="py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          author: {
            "@type": "Person",
            name: siteConfig.author.name,
            url: siteConfig.author.url,
          },
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            url: absoluteUrl(`/posts/${post.slug}`),
          })),
        }}
      />
      <h1 className="sr-only">{siteConfig.name}</h1>
      <PostList posts={posts} />
    </Sheet>
  );
}
