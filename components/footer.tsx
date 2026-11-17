import Link from "next/link";

import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/site.config";

export async function Footer() {
  const posts = await getAllPosts();
  const latest = posts[0]?.date.slice(0, 4) ?? "2026";
  const earliest = posts[posts.length - 1]?.date.slice(0, 4) ?? latest;
  const years = latest === earliest ? latest : `${earliest}–${latest}`;

  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 py-10 font-sans text-sm text-muted sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-sm space-y-2">
          <p className="text-ink">
            © {years} {siteConfig.author.name}
          </p>
          <p>Every post on {siteConfig.name} lists the sources it used.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/" className="hover:text-ink">
            Briefing
          </Link>
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
          <a href="/rss.xml" className="hover:text-ink">
            RSS
          </a>
          <a href="/sitemap.xml" className="hover:text-ink">
            Sitemap
          </a>
        </nav>
      </div>
    </footer>
  );
}
