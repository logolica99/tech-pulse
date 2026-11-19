export const CATEGORIES = ["AI", "Energy", "Robotics", "Space", "Funding", "Other"] as const;

export type Category = (typeof CATEGORIES)[number];

export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}

export function categorySlug(category: Category): string {
  return category.toLowerCase();
}

export function categoryFromSlug(slug: string): Category | null {
  return CATEGORIES.find((category) => categorySlug(category) === slug) ?? null;
}

export function categoryPath(category: Category): string {
  return `/tags/${categorySlug(category)}`;
}
