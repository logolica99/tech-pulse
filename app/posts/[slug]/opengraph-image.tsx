import { ImageResponse } from "next/og";

import { OgCard, ogSize } from "@/components/og-card";
import { logoDataUrl, ogFonts } from "@/lib/og-fonts";
import { getAllPosts, getPost } from "@/lib/posts";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Blogs article";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const title = post?.title ?? "Blogs";
  const kicker = post ? `${post.category} · ${post.dateLabel}` : "Daily edition";

  return new ImageResponse(<OgCard logo={await logoDataUrl()} kicker={kicker} title={title} />, {
    ...size,
    fonts: await ogFonts(),
  });
}
