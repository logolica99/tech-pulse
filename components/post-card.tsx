import Link from "next/link";

import type { PostCardData } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PostCard({ post, featured = false }: { post: PostCardData; featured?: boolean }) {
  const categoryTag = post.tags.find((tag) => tag.slug === post.category.toLowerCase());
  const categoryHref = categoryTag ? `/tags/${categoryTag.slug}` : "/";

  return (
    <article className="border-b border-line py-8 first:pt-2">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs uppercase tracking-[0.14em] text-muted">
        <time dateTime={post.date}>{post.dateLabel}</time>
        <span aria-hidden="true">·</span>
        <Link href={categoryHref} className="text-accent hover:underline">
          {post.category}
        </Link>
        <span aria-hidden="true">·</span>
        <span>
          {post.readingMinutes} min read
        </span>
      </p>
      <h2
        className={cn(
          "mt-3 font-display tracking-tight text-ink",
          featured ? "text-4xl leading-[1.12] sm:text-5xl" : "text-3xl leading-tight",
        )}
      >
        <Link href={`/posts/${post.slug}`} className="underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-copper">
          {post.title}
        </Link>
      </h2>
      <p className={cn("mt-3 max-w-prose text-muted", featured ? "text-lg leading-relaxed" : "text-base leading-relaxed")}>
        {post.summary}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <li key={tag.slug}>
            <Link
              href={`/tags/${tag.slug}`}
              className="inline-flex rounded-full border border-line bg-chip px-2.5 py-1 font-sans text-xs text-ink hover:border-accent"
            >
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
