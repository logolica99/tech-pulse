import Link from "next/link";
import { Suspense } from "react";

import { Nav } from "@/components/nav";
import { NavLinks } from "@/components/nav-links";
import { Sheet } from "@/components/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/site.config";

export function Header() {
  return (
    <header className="border-b border-line">
      <Sheet className="py-5">
        <div className="flex items-baseline justify-between gap-4">
          <Link href="/" className="text-base text-fg">
            {siteConfig.name}
          </Link>
          <ThemeToggle />
        </div>
        <Suspense fallback={<NavLinks current={null} />}>
          <Nav />
        </Suspense>
      </Sheet>
    </header>
  );
}
