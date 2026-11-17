"use client";

import { useMemo, useState } from "react";

import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/categories";
import type { PostCardData } from "@/lib/types";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "AI", label: "AI" },
  { id: "Energy", label: "Energy" },
  { id: "Other", label: "Other" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

export function PostIndex({ posts }: { posts: PostCardData[] }) {
  const [filter, setFilter] = useState<FilterId>("all");

  const counts = useMemo(
    () => ({
      all: posts.length,
      AI: posts.filter((post) => post.category === "AI").length,
      Energy: posts.filter((post) => post.category === "Energy").length,
      Other: posts.filter((post) => post.category === "Other").length,
    }),
    [posts],
  );

  const visible = filter === "all" ? posts : posts.filter((post) => post.category === filter);
  const label: Category | "the briefing" = filter === "all" ? "the briefing" : filter;

  return (
    <div>
      <div role="group" aria-label="Filter posts by category" className="flex flex-wrap gap-2">
        {FILTERS.map((item) => {
          const selected = filter === item.id;
          return (
            <Button
              key={item.id}
              type="button"
              size="sm"
              variant={selected ? "default" : "outline"}
              aria-pressed={selected}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
              <span className="tabular-nums opacity-70">{counts[item.id]}</span>
            </Button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "post" : "posts"}
        {filter === "all" ? "." : ` in ${filter}.`}
      </p>
      {visible.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-raised px-6 py-14 text-center">
          <h2 className="font-display text-3xl tracking-tight text-ink">Nothing in {label} yet.</h2>
          <p className="mx-auto mt-3 max-w-sm text-muted">
            Posts filed under {label} will show up here after they are published.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          {visible.map((post, index) => (
            <PostCard key={post.slug} post={post} featured={index === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
