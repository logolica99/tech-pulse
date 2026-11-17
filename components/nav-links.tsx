import Link from "next/link";

import { CATEGORIES, categoryPath } from "@/lib/categories";
import { cn } from "@/lib/utils";

const links = [
  ...CATEGORIES.map((category) => ({ href: categoryPath(category), label: category })),
  { href: "/about", label: "About" },
  { href: "/rss.xml", label: "RSS" },
];

function isCurrent(href: string, pathname: string | null): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ current }: { current: string | null }) {
  return (
    <nav aria-label="Sections" className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
      {links.map((link) => {
        const active = isCurrent(link.href, current);
        const className = cn("underline underline-offset-4", active ? "text-fg" : "text-muted");
        if (link.href.endsWith(".xml")) {
          return (
            <a key={link.href} href={link.href} className={className}>
              {link.label}
            </a>
          );
        }
        return (
          <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={className}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
