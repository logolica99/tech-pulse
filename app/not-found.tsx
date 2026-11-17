import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-20 sm:py-28">
      <p className="font-sans text-xs uppercase tracking-[0.18em] text-copper">404</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">That page is not in the briefing.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        The link may be old, or the post has not been published.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link href="/">Read the latest</Link>
        </Button>
      </div>
    </div>
  );
}
