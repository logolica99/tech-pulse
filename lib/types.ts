import type { Category } from "@/lib/categories";

export type PostTag = {
  name: string;
  slug: string;
};

export type PostSource = {
  title: string;
  url: string;
};

export type PostCardData = {
  slug: string;
  title: string;
  date: string;
  published: string;
  dateLabel: string;
  summary: string;
  category: Category;
  tags: PostTag[];
  readingMinutes: number;
};

export type PostImage = {
  src: string;
  alt: string;
  credit: string;
};

export type Post = PostCardData & {
  html: string;
  sources: PostSource[];
  image: PostImage | null;
};

export type TagSummary = {
  slug: string;
  name: string;
  count: number;
  latestDate: string;
};
