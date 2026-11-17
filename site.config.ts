import "server-only";

/**
 * Blogs site configuration.
 *
 * This is the only file to edit when renaming the site or pointing it at a domain.
 *
 * Canonical URL, in order:
 * 1. `CANONICAL_SITE_URL` below, when it is not null. This is the one-line switch.
 * 2. `NEXT_PUBLIC_SITE_URL` (set it in Vercel, then redeploy — it is inlined at build time).
 * 3. The Vercel production host (`VERCEL_PROJECT_PRODUCTION_URL`).
 * 4. The current Vercel deployment host (`VERCEL_URL`).
 * 5. http://localhost:3847 for `npm run dev`.
 *
 * The live origin is https://blogs.jubaerjami.com. RSS, the sitemap, canonical
 * links, and Open Graph tags use `CANONICAL_SITE_URL` when it is set.
 */

/** Live canonical origin. */
const CANONICAL_SITE_URL: string | null = "https://blogs.jubaerjami.com";

function normalizeOrigin(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, "");
  const local = /^(localhost|127\.0\.0\.1)(:|\/|$)/i.test(trimmed);
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `${local ? "http" : "https"}://${trimmed}`;
  return new URL(withProtocol).origin;
}

function resolveSiteUrl(): string {
  if (CANONICAL_SITE_URL) return normalizeOrigin(CANONICAL_SITE_URL);

  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv?.trim()) return normalizeOrigin(fromEnv);

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production?.trim()) return normalizeOrigin(production);

  const deployment = process.env.VERCEL_URL;
  if (deployment?.trim()) return normalizeOrigin(deployment);

  return "http://localhost:3847";
}

export const siteConfig = {
  name: "Blogs",
  description:
    "A daily briefing on artificial intelligence, energy, robotics, space, and other notable tech, edited by Jubaer Jami.",
  url: resolveSiteUrl(),
  author: {
    name: "Jubaer Jami",
  },
  locale: "en_US",
} as const;

export function absoluteUrl(path = "/"): string {
  if (path === "/" || path === "") return siteConfig.url;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${suffix}`;
}
