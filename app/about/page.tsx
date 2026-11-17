import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { Sheet } from "@/components/sheet";
import { absoluteUrl, siteConfig } from "@/site.config";

const description = `${siteConfig.name} is a daily technology briefing edited by ${siteConfig.author.name}.`;

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description,
    url: "/about",
    type: "article",
  },
};

export default function AboutPage() {
  return (
    <Sheet className="py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${siteConfig.name}`,
          url: absoluteUrl("/about"),
          description,
          mainEntity: {
            "@type": "Person",
            name: siteConfig.author.name,
            url: absoluteUrl("/about"),
          },
        }}
      />
      <article>
        <h1 className="text-xl">About</h1>
        <div className="mt-6 space-y-4">
          <p>
            {siteConfig.name} is a daily briefing edited by {siteConfig.author.name}. The beats are
            artificial intelligence, energy, robotics, and space. Energy includes batteries, solar,
            nuclear, the grid, and electric vehicles. Other notable tech gets a post when it is worth
            the space.
          </p>
          <p>
            A story is one Markdown file. It is published by committing that file, and this page is
            generated when the site builds. Each post ends with the sources it used. A claim that is
            not in those sources does not belong in the post.
          </p>
          <p>The public address is blogs.jubaerjami.com.</p>
          <p>
            <Link href="/" className="underline underline-offset-4">
              Posts
            </Link>
            {" · "}
            <a href="/rss.xml" className="underline underline-offset-4">
              RSS
            </a>
          </p>
        </div>
      </article>
    </Sheet>
  );
}
