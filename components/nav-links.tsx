import Link from "next/link";

import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Briefing" },
  { href: "/about", label: "About" },
] as const;

function isCurrent(href: string, pathname: string | null): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ current }: { current: string | null }) {
  return (
    <nav aria-label="Primary" className="flex items-center gap-1 font-sans text-sm">
      {links.map((link) => {
        const active = isCurrent(link.href, current);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-2 text-muted transition-colors hover:bg-chip hover:text-ink",
              active && "bg-chip text-ink",
            )}
          >
            {link.label}
          </Link>
        );
      })}
      <a
        href="/rss.xml"
        className="rounded-full px-3 py-2 text-muted transition-colors hover:bg-chip hover:text-ink"
      >
        RSS
      </a>
    </nav>
  );
}
