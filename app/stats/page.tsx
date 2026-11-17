import { timingSafeEqual } from "node:crypto";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Sheet } from "@/components/sheet";
import { readStats, storageConfigured, type Counts } from "@/lib/visits/store";

export const metadata: Metadata = {
  title: "Stats",
  robots: { index: false, follow: false, nocache: true },
};

function keyMatches(given: string | undefined): boolean {
  const expected = process.env.STATS_KEY;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const nf = new Intl.NumberFormat("en-US");
const n = (v: number) => nf.format(v);

function sum(c: Counts) {
  return c.human + c.ai + c.search + c.bot;
}

function Table({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  if (rows.length === 0) return <p className="mt-2 text-muted">Nothing yet.</p>;
  return (
    <table className="mt-2 w-full border-collapse text-sm tabular-nums">
      <thead>
        <tr className="border-b border-line text-left">
          {head.map((h, i) => (
            <th key={h} className={`py-1 font-normal ${i > 0 ? "text-right" : ""}`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={String(r[0])} className="border-b border-line">
            {r.map((cell, i) => (
              <td key={i} className={`py-1 ${i > 0 ? "text-right" : "break-all pr-3"}`}>
                {typeof cell === "number" ? n(cell) : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

async function StatsBody({ searchParams }: { searchParams: Promise<{ key?: string | string[] }> }) {
  const { key } = await searchParams;
  if (!keyMatches(typeof key === "string" ? key : undefined)) notFound();

  if (!storageConfigured()) {
    return <p className="mt-6">Visit counting is installed but no Redis store is connected yet.</p>;
  }

  const stats = await readStats(14);
  if (!stats) return <p className="mt-6">Could not read stats.</p>;
  const t = stats.total;

  return (
    <div className="mt-6 space-y-8">
      <section>
        <h2>All time</h2>
        <Table
          head={["", "Visits"]}
          rows={[
            ["Humans", t.human],
            ["AI bots", t.ai],
            ["Search bots", t.search],
            ["Other bots", t.bot],
            ["Total", sum(t)],
          ]}
        />
      </section>

      <section>
        <h2>Last 14 days</h2>
        <Table
          head={["Day", "Humans", "AI", "Search", "Other"]}
          rows={stats.days.map((d) => [d.day, d.counts.human, d.counts.ai, d.counts.search, d.counts.bot])}
        />
      </section>

      <section>
        <h2>AI bots, all time</h2>
        <Table head={["Bot", "Visits"]} rows={stats.aiTotal} />
      </section>

      <section>
        <h2>AI bots, today</h2>
        <Table head={["Bot", "Visits"]} rows={stats.aiToday} />
      </section>

      <section>
        <h2>Top pages, humans</h2>
        <Table head={["Page", "Visits"]} rows={stats.pagesHuman} />
      </section>

      <section>
        <h2>Top pages, AI bots</h2>
        <Table head={["Page", "Visits"]} rows={stats.pagesAi} />
      </section>

      <section>
        <h2>Search bots</h2>
        <Table head={["Bot", "Visits"]} rows={stats.searchTotal} />
      </section>

      <section>
        <h2>Other bots</h2>
        <Table head={["Bot", "Visits"]} rows={stats.botTotal} />
      </section>

      <p className="text-sm text-muted">
        Server-side counts by user agent, days in Pacific time. Human page views from browsers are also in Vercel Web
        Analytics.
      </p>
    </div>
  );
}

export default function StatsPage({ searchParams }: { searchParams: Promise<{ key?: string | string[] }> }) {
  return (
    <Sheet className="py-8">
      <h1 className="text-xl">Stats</h1>
      <Suspense fallback={<p className="mt-6">Loading…</p>}>
        <StatsBody searchParams={searchParams} />
      </Suspense>
    </Sheet>
  );
}
