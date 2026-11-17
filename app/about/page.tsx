import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
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
    <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
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
      <p className="font-sans text-xs uppercase tracking-[0.18em] text-copper">About</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
        A daily briefing edited by {siteConfig.author.name}.
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        <p>
          {siteConfig.name} records technology that is changing how we compute and how we power that
          computation. The standing beat is artificial intelligence and energy: batteries, solar,
          nuclear, the grid, and electric vehicles. Other notable tech gets a post when it is worth
          the space.
        </p>
        <p>
          {siteConfig.author.name} edits the site. A story is one Markdown file. It is published by
          committing that file, and the page you are reading is generated when the site builds. Each
          news post ends with the sources it used. A claim that is not in those sources does not
          belong in the post.
        </p>
        <p>
          The public address is configured in one place. It follows the Vercel URL until the custom
          domain <span className="text-ink">blog.jubaerjami.com</span> is attached.
        </p>
        <p>
          Read the <Link href="/" className="text-accent underline underline-offset-4">latest briefing</Link>{" "}
          or subscribe with the <a href="/rss.xml" className="text-accent underline underline-offset-4">RSS feed</a>.
        </p>
      </div>
    </div>
  );
}
