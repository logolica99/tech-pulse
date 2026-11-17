import "server-only";

import { cacheLife } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

import { CATEGORIES, categoryFromSlug, isCategory, type Category } from "@/lib/categories";
import { formatDate, tagSlug } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";
import type { Post, PostCardData, PostSource, PostTag, TagSummary } from "@/lib/types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const FILE_NAME = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.(md|mdx)$/;

const ALLOWED_FIELDS = new Set([
  "title",
  "date",
  "summary",
  "tags",
  "category",
  "sources",
  "draft",
]);

function fail(file: string, problems: string[]): never {
  throw new Error(
    [`Invalid post ${file}:`, ...problems.map((problem) => `- ${problem}`), "See PUBLISHING.md."].join(
      "\n",
    ),
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isoDate(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getUTCFullYear();
    const month = String(value.getUTCMonth() + 1).padStart(2, "0");
    const day = String(value.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.trim())) {
    return value.trim();
  }

  return null;
}

function isRealDate(iso: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function readingMinutes(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function parseSources(value: unknown, problems: string[]): PostSource[] {
  if (!Array.isArray(value) || value.length === 0) {
    problems.push("sources must be a non-empty list of { title, url }");
    return [];
  }

  return value.flatMap((item, index): PostSource[] => {
    const label = `sources[${index}]`;
    if (!isRecord(item)) {
      problems.push(`${label} must be an object with title and url`);
      return [];
    }

    const title = typeof item.title === "string" ? item.title.trim() : "";
    const url = typeof item.url === "string" ? item.url.trim() : "";
    if (!title) problems.push(`${label}.title must be a non-empty string`);

    let parsed: URL | null = null;
    try {
      parsed = new URL(url);
    } catch {
      parsed = null;
    }

    if (!parsed || (parsed.protocol !== "http:" && parsed.protocol !== "https:")) {
      problems.push(`${label}.url must be an absolute http(s) URL`);
    }

    if (!title || !parsed) return [];
    return [{ title, url }];
  });
}

function parseTags(value: unknown, problems: string[]): PostTag[] {
  if (!Array.isArray(value) || value.length === 0) {
    problems.push("tags must be a list of 1 to 6 short labels");
    return [];
  }

  if (value.length > 6) problems.push("tags can include at most 6 labels");

  const tags: PostTag[] = [];
  const seen = new Set<string>();

  for (const [index, item] of value.entries()) {
    if (typeof item !== "string") {
      problems.push(`tags[${index}] must be a string`);
      continue;
    }

    const name = item.trim().replace(/\s+/g, " ");
    if (name.length < 2 || name.length > 32) {
      problems.push(`tags[${index}] must be 2 to 32 characters`);
      continue;
    }

    if (!/^[\p{L}\p{N}][\p{L}\p{N} +&/-]*$/u.test(name)) {
      problems.push(`tags[${index}] may contain letters, numbers, spaces, &, /, +, and hyphens`);
      continue;
    }

    const slug = tagSlug(name);
    if (!slug) {
      problems.push(`tags[${index}] does not produce a URL slug`);
      continue;
    }

    if (seen.has(slug)) {
      problems.push(`duplicate tag "${name}"`);
      continue;
    }

    seen.add(slug);
    tags.push({ name, slug });
  }

  return tags;
}

async function parsePostFile(filename: string, raw: string): Promise<{ post: Post; draft: boolean }> {
  const file = `content/posts/${filename}`;
  const problems: string[] = [];
  const match = FILE_NAME.exec(filename);

  if (!match) {
    fail(file, [
      "file name must look like YYYY-MM-DD-slug.md (lowercase slug, .md or .mdx)",
    ]);
  }

  const filenameDate = match[1];
  const parsed = matter(raw);
  const data: unknown = parsed.data;

  if (!isRecord(data)) {
    fail(file, ["frontmatter must be a YAML mapping"]);
  }

  for (const key of Object.keys(data)) {
    if (!ALLOWED_FIELDS.has(key)) {
      problems.push(
        `unknown frontmatter field "${key}". Allowed: title, date, summary, tags, category, sources, draft`,
      );
    }
  }

  const title = typeof data.title === "string" ? data.title.trim() : "";
  if (title.length < 8 || title.length > 120) {
    problems.push("title must be a string of 8 to 120 characters");
  }

  const date = isoDate(data.date);
  if (!date || !isRealDate(date)) {
    problems.push('date must be a real calendar date in YYYY-MM-DD form (quote it: "2026-11-16")');
  } else if (date !== filenameDate) {
    problems.push(`date ${date} must match the file name date ${filenameDate}`);
  }

  const summary = typeof data.summary === "string" ? data.summary.trim() : "";
  if (summary.length < 40 || summary.length > 320) {
    problems.push("summary must be a single string of 40 to 320 characters");
  }
  if (summary.includes("\n")) problems.push("summary must be a single line");

  const category = typeof data.category === "string" ? data.category.trim() : "";
  if (!isCategory(category)) {
    problems.push(`category must be exactly one of: ${CATEGORIES.join(", ")}`);
  }

  const tags = parseTags(data.tags, problems);
  const sources = parseSources(data.sources, problems);

  let draft = false;
  if (data.draft !== undefined) {
    if (typeof data.draft !== "boolean") problems.push("draft must be true or false");
    else draft = data.draft;
  }

  const body = parsed.content.trim();
  if (body.length < 80) problems.push("body must be Markdown of at least 80 characters");
  if (/^\s*import\s/m.test(body) || /^\s*export\s/m.test(body)) {
    problems.push("body must be Markdown. Do not import or export JavaScript");
  }

  if (problems.length > 0 || !date || !isCategory(category)) {
    fail(file, problems.length > 0 ? problems : ["frontmatter could not be read"]);
  }

  const html = await renderMarkdown(body);
  const slug = filename.replace(/\.(md|mdx)$/, "");

  return {
    draft,
    post: {
      slug,
      title,
      date,
      dateLabel: formatDate(date),
      summary,
      category: category as Category,
      tags,
      readingMinutes: readingMinutes(body),
      html,
      sources,
    },
  };
}

async function readPublishedPosts(): Promise<Post[]> {
  let entries;
  try {
    entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  } catch {
    throw new Error("Missing content/posts. Add a Markdown file there. See PUBLISHING.md.");
  }

  const files = entries.filter((entry) => !entry.name.startsWith("."));
  const directories = files.filter((entry) => !entry.isFile());
  if (directories.length > 0) {
    throw new Error(
      `content/posts must contain only post files. Found a directory: ${directories[0]?.name}`,
    );
  }

  const posts: Post[] = [];
  for (const entry of files) {
    const raw = await fs.readFile(path.join(POSTS_DIR, entry.name), "utf8");
    const { post, draft } = await parsePostFile(entry.name, raw);
    if (!draft) posts.push(post);
  }

  if (posts.length === 0) {
    throw new Error("At least one published post is required. See PUBLISHING.md.");
  }

  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate post slug "${post.slug}". File names must be unique.`);
    }
    slugs.add(post.slug);
  }

  posts.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.slug < b.slug ? 1 : -1;
  });

  return posts;
}

export async function getAllPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("max");
  return readPublishedPosts();
}

export function toCard(post: Post): PostCardData {
  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    dateLabel: post.dateLabel,
    summary: post.summary,
    category: post.category,
    tags: post.tags,
    readingMinutes: post.readingMinutes,
  };
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getAllTags(): Promise<TagSummary[]> {
  const posts = await getAllPosts();
  const map = new Map<string, TagSummary>();

  for (const post of posts) {
    for (const tag of post.tags) {
      const existing = map.get(tag.slug);
      if (!existing) {
        map.set(tag.slug, {
          slug: tag.slug,
          name: tag.name,
          count: 1,
          latestDate: post.date,
        });
      } else {
        existing.count += 1;
      }
    }
  }

  const latest = posts[0]?.date ?? "";
  for (const category of CATEGORIES) {
    const slug = category.toLowerCase();
    if (!map.has(slug)) {
      map.set(slug, {
        slug,
        name: category,
        count: 0,
        latestDate: latest,
      });
    }
  }

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getPostsByTag(slug: string): Promise<{ tag: TagSummary; posts: Post[] } | null> {
  const posts = await getAllPosts();
  const matched = posts.filter((post) => post.tags.some((tag) => tag.slug === slug));
  if (matched.length === 0) {
    const category = categoryFromSlug(slug);
    if (!category) return null;
    return {
      tag: {
        slug,
        name: category,
        count: 0,
        latestDate: posts[0]?.date ?? "",
      },
      posts: [],
    };
  }

  const name = matched[0]?.tags.find((tag) => tag.slug === slug)?.name ?? slug;
  return {
    tag: {
      slug,
      name,
      count: matched.length,
      latestDate: matched[0]?.date ?? name,
    },
    posts: matched,
  };
}
