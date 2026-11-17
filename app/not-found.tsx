import type { Metadata } from "next";
import Link from "next/link";

import { Sheet } from "@/components/sheet";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Sheet className="py-8">
      <h1 className="text-xl">Page not found.</h1>
      <p className="mt-3 text-muted">The link may be old, or the post has not been published.</p>
      <p className="mt-4">
        <Link href="/" className="underline underline-offset-4">
          Home
        </Link>
      </p>
    </Sheet>
  );
}
