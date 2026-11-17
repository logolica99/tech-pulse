import Link from "next/link";
import { Suspense } from "react";

import { Nav } from "@/components/nav";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/site.config";

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3 text-ink">
          <span className="h-2.5 w-2.5 rounded-full bg-copper" aria-hidden="true" />
          <span className="font-display text-[1.7rem] leading-none tracking-tight">{siteConfig.name}</span>
        </Link>
        <div className="flex items-center justify-between gap-2 sm:justify-end">
          <Suspense fallback={<NavLinks current={null} />}>
            <Nav />
          </Suspense>
          <ThemeToggle />
        </div>
      </div>
      <div className="h-0.5 bg-copper" aria-hidden="true" />
    </header>
  );
}
