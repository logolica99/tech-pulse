import Link from "next/link";

import { Sheet } from "@/components/sheet";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/site.config";

export async function Footer() {
  const posts = await getAllPosts();
  const latest = posts[0]?.date.slice(0, 4) ?? "2026";
  const earliest = posts[posts.length - 1]?.date.slice(0, 4) ?? latest;
  const years = latest === earliest ? latest : `${earliest}–${latest}`;

  return (
    <footer className="mt-16 border-t border-line">
      <Sheet className="flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:items-baseline sm:justify-between">
        <p>
          © {years} {siteConfig.owner.name}
        </p>
        <nav aria-label="Footer" className="flex gap-4">
          <Link href="/about" className="underline underline-offset-4">
            About
          </Link>
          <a href="/rss.xml" className="underline underline-offset-4">
            RSS
          </a>
          <a href="/sitemap.xml" className="underline underline-offset-4">
            Sitemap
          </a>
        </nav>
      </Sheet>
    </footer>
  );
}
