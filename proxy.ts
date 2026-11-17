import { timingSafeEqual } from "node:crypto";

import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

import { classify } from "@/lib/visits/classify";
import { recordVisit } from "@/lib/visits/store";

/** Paths worth counting. Everything else is grouped so random probes can't flood the stats. */
function normalizePath(pathname: string): string {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (
    p === "/" ||
    p === "/about" ||
    p === "/rss.xml" ||
    p === "/sitemap.xml" ||
    p === "/robots.txt" ||
    p === "/llms.txt" ||
    /^\/posts\/[a-z0-9-]{1,120}$/.test(p) ||
    /^\/tags\/[a-z0-9-]{1,60}$/.test(p)
  ) {
    return p;
  }
  return "(other)";
}

function statsKeyOk(given: string | null): boolean {
  const expected = process.env.STATS_KEY;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
  // Private stats page: refuse outright without the right key, and never count it.
  if (request.nextUrl.pathname === "/stats" || request.nextUrl.pathname.startsWith("/stats/")) {
    if (!statsKeyOk(request.nextUrl.searchParams.get("key"))) {
      return new NextResponse("Not found", {
        status: 404,
        headers: { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" },
      });
    }
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }

  const isPrefetch =
    request.headers.has("next-router-prefetch") ||
    request.headers.get("purpose") === "prefetch" ||
    request.headers.get("sec-purpose")?.includes("prefetch");

  const pathname = request.nextUrl.pathname;
  const isAsset = /\/(opengraph-image|twitter-image|icon|apple-icon)(-[\w]+)?$/.test(pathname);

  if (request.method === "GET" && !isPrefetch && !isAsset) {
    const visitor = classify(request.headers.get("user-agent"), request.headers.get("signature-agent"));
    const path = normalizePath(pathname);
    // Fire and forget: never delay or fail the page because of counting.
    event.waitUntil(recordVisit(visitor, path).catch(() => {}));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next internals, Vercel internals, metadata images, and files with extensions
    // (except the feeds and robots files, which crawlers care about).
    "/((?!_next/|_vercel/|api/|icon|apple-icon|opengraph-image|twitter-image|favicon|.*\\.(?!xml$|txt$)[a-z0-9]+$).*)",
  ],
};
