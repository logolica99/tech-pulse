"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Sheet } from "@/components/sheet";

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
    <Sheet className="py-8">
      <h1 className="text-xl">This page did not load.</h1>
      <p className="mt-3 text-muted">Try again, or go back to the posts.</p>
      <p className="mt-4">
        <button type="button" onClick={reset} className="underline underline-offset-4">
          Try again
        </button>
        {" · "}
        <Link href="/" className="underline underline-offset-4">
          Home
        </Link>
      </p>
    </Sheet>
  );
}
