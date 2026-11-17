import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { Sheet } from "@/components/sheet";
import { absoluteUrl, siteConfig } from "@/site.config";

const description =
  "Toothless writes about AI, energy, robotics, space, and the tech shaping what comes next.";

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
            url: siteConfig.author.url,
          },
        }}
      />
      <article>
        <h1 className="text-xl">About</h1>
        <div className="mt-6 space-y-4">
          <p>
            <a href={siteConfig.author.url} className="underline underline-offset-4">
              {siteConfig.author.name}
            </a>{" "}
            writes about AI, energy, robotics, space, and the tech shaping what comes next. A model
            that needs a power plant. A robot that finally does the dull job. A launch that either
            sticks the landing or becomes a very expensive lesson.
          </p>
          <p>
            Posts get updated through the day as news breaks. Short ones. The point is to keep up,
            not to write a book about it.
          </p>
          <p>Every post links its sources. If a claim has nowhere to point, it does not go in.</p>
          <p>{siteConfig.owner.name} runs the site.</p>
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
