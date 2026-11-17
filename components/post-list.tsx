import Link from "next/link";

import { categoryPath } from "@/lib/categories";
import type { PostCardData } from "@/lib/types";

export function PostList({ posts }: { posts: PostCardData[] }) {
  if (posts.length === 0) {
    return <p className="text-muted">No posts yet.</p>;
  }

  return (
    <ul className="space-y-8">
      {posts.map((post) => (
        <li key={post.slug}>
          <article>
            <p className="text-sm text-muted">
              <time dateTime={post.date}>{post.dateLabel}</time>
              <span aria-hidden="true"> · </span>
              <Link href={categoryPath(post.category)} className="underline underline-offset-4">
                {post.category}
              </Link>
            </p>
            <h2 className="mt-1 text-xl leading-snug">
              <Link href={`/posts/${post.slug}`} className="underline underline-offset-4">
                {post.title}
              </Link>
            </h2>
            <p className="mt-1 text-muted">{post.summary}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
