import { getAllPosts, toCard } from "@/lib/posts";
import { renderRss } from "@/lib/rss";

export async function GET() {
  const posts = await getAllPosts();
  const xml = renderRss(posts.map(toCard));

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
