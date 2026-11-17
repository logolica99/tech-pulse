import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { PostIndex } from "@/components/post-index";
import { getAllPosts, toCard } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/site.config";

const title = `${siteConfig.name} — AI, energy, and notable tech`;

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
  const latest = posts[0];

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
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
            url: absoluteUrl("/about"),
          },
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            url: absoluteUrl(`/posts/${post.slug}`),
          })),
        }}
      />
      <p className="font-sans text-xs uppercase tracking-[0.18em] text-copper">Daily briefing</p>
      <h1 className="mt-3 font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-6xl">
        AI, energy, and the technology around them.
      </h1>
      <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">
        Edited by {siteConfig.author.name}. Recent posts are listed newest first.
        {latest ? ` The latest is from ${latest.dateLabel}.` : ""}
      </p>
      <div className="mt-10">
        <PostIndex posts={posts} />
      </div>
    </div>
  );
}
