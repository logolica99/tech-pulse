import { ImageResponse } from "next/og";

import { OgCard, ogSize } from "@/components/og-card";
import { getAllPosts, getPost } from "@/lib/posts";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Tech Pulse article";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const title = post?.title ?? "Tech Pulse";
  const kicker = post ? `${post.category} · ${post.dateLabel}` : "Daily briefing";

  return new ImageResponse(<OgCard kicker={kicker} title={title} />, { ...size });
}
