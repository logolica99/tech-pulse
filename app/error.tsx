"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-20 sm:py-28">
      <p className="font-sans text-xs uppercase tracking-[0.18em] text-copper">Error</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">This page did not load.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        The briefing is still there. Try this page again, or go back to the latest posts.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to the briefing</Link>
        </Button>
      </div>
    </div>
  );
}
