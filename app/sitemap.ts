import type { MetadataRoute } from "next";

import { getAllPosts, getAllTags } from "@/lib/posts";
import { absoluteUrl } from "@/site.config";

function lastModified(isoDate: string): string {
  return `${isoDate}T12:00:00.000Z`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const latest = posts[0]?.date;

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latest ? lastModified(latest) : undefined,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: latest ? lastModified(latest) : undefined,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/posts/${post.slug}`),
      lastModified: lastModified(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...tags.map((tag) => ({
      url: absoluteUrl(`/tags/${tag.slug}`),
      lastModified: lastModified(tag.latestDate),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
