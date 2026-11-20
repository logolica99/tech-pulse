/**
 * Temporary GTA 6 homepage and nav rules.
 *
 * The shiny top-nav link is visible through the end of Friday, 27 November 2026
 * in America/Los_Angeles (PST, UTC-8). It hides automatically from
 * 2026-11-28T00:00:00-08:00, even if this build stays cached after that date.
 */

export const GTA6_NAV_EXPIRES_AT = "2026-11-28T08:00:00.000Z";

export function isGta6NavLive(now = Date.now()): boolean {
  return now < Date.parse(GTA6_NAV_EXPIRES_AT);
}

export function isGta6Post(post: {
  category: string;
  tags: { name: string; slug: string }[];
}): boolean {
  if (post.category === "GTA 6") return true;
  return post.tags.some((tag) => tag.slug === "gta-6" || tag.name === "GTA 6");
}
