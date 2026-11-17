import { rfc822 } from "@/lib/format";
import type { PostCardData } from "@/lib/types";
import { absoluteUrl, siteConfig } from "@/site.config";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function renderRss(posts: PostCardData[]): string {
  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/posts/${post.slug}`);
      const categories = [post.category, ...post.tags.map((tag) => tag.name)]
        .filter((name, index, all) => all.indexOf(name) === index)
        .map((name) => `      <category>${escapeXml(name)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${escapeXml(rfc822(post.date))}</pubDate>
      <description>${escapeXml(post.summary)}</description>
      <dc:creator>${escapeXml(siteConfig.author.name)}</dc:creator>
${categories}
    </item>`;
    })
    .join("\n");

  const lastBuild = posts[0] ? rfc822(posts[0].date) : rfc822("2026-11-17");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${escapeXml(lastBuild)}</lastBuildDate>
    <atom:link href="${escapeXml(absoluteUrl("/rss.xml"))}" rel="self" type="application/rss+xml"/>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <generator>${escapeXml(siteConfig.name)}</generator>
${items}
  </channel>
</rss>
`;
}
