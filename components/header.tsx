import Link from "next/link";
import Image from "next/image";
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
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-base text-fg">
            <Image
              src="/logo.png"
              alt=""
              width={296}
              height={322}
              style={{ height: "2rem", width: "auto" }}
            />
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
