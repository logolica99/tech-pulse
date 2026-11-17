/**
 * Visit counters stored in Upstash Redis (free tier, via its REST API).
 *
 * Reads either the Vercel Marketplace variable names (KV_REST_API_URL /
 * KV_REST_API_TOKEN) or Upstash's own (UPSTASH_REDIS_REST_URL / _TOKEN).
 * Without them every function here is a safe no-op.
 *
 * Keys (days are in America/Los_Angeles):
 *   v:total, v:<day>          hash  kind -> count  (human, ai, search, bot)
 *   n:<kind>:total, n:<kind>:<day>  hash  bot name -> count
 *   p:<kind>                  zset  path -> count
 */

import type { Visitor } from "./classify";

const DAY_TTL_SECONDS = 60 * 60 * 24 * 400;

function redisEnv(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/+$/, ""), token };
}

export function storageConfigured(): boolean {
  return redisEnv() !== null;
}

type Command = (string | number)[];

async function pipeline(commands: Command[]): Promise<unknown[] | null> {
  const env = redisEnv();
  if (!env || commands.length === 0) return null;
  const res = await fetch(`${env.url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  const data = (await res.json()) as { result?: unknown; error?: string }[];
  return data.map((d) => d.result ?? null);
}

export function dayKey(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export async function recordVisit(visitor: Visitor, path: string): Promise<void> {
  if (!redisEnv()) return;
  const day = dayKey();
  const cmds: Command[] = [
    ["HINCRBY", "v:total", visitor.kind, 1],
    ["HINCRBY", `v:${day}`, visitor.kind, 1],
    ["EXPIRE", `v:${day}`, DAY_TTL_SECONDS],
    ["ZINCRBY", `p:${visitor.kind}`, 1, path],
  ];
  if (visitor.name) {
    cmds.push(
      ["HINCRBY", `n:${visitor.kind}:total`, visitor.name, 1],
      ["HINCRBY", `n:${visitor.kind}:${day}`, visitor.name, 1],
      ["EXPIRE", `n:${visitor.kind}:${day}`, DAY_TTL_SECONDS],
    );
  }
  await pipeline(cmds);
}

export type Counts = Record<"human" | "ai" | "search" | "bot", number>;

function toCounts(raw: unknown): Counts {
  const out: Counts = { human: 0, ai: 0, search: 0, bot: 0 };
  const map = toMap(raw);
  for (const k of Object.keys(out) as (keyof Counts)[]) out[k] = map[k] ?? 0;
  return out;
}

function toMap(raw: unknown): Record<string, number> {
  const out: Record<string, number> = {};
  if (Array.isArray(raw)) {
    for (let i = 0; i + 1 < raw.length; i += 2) out[String(raw[i])] = Number(raw[i + 1]);
  }
  return out;
}

function sorted(map: Record<string, number>, limit = 15): [string, number][] {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

export interface Stats {
  total: Counts;
  days: { day: string; counts: Counts }[];
  aiTotal: [string, number][];
  aiToday: [string, number][];
  searchTotal: [string, number][];
  botTotal: [string, number][];
  pagesHuman: [string, number][];
  pagesAi: [string, number][];
}

export async function readStats(dayCount = 14): Promise<Stats | null> {
  if (!redisEnv()) return null;
  const now = Date.now();
  const days = Array.from({ length: dayCount }, (_, i) => dayKey(new Date(now - i * 86_400_000)));
  const uniqueDays = [...new Set(days)];
  const today = uniqueDays[0];

  const cmds: Command[] = [
    ["HGETALL", "v:total"],
    ["HGETALL", "n:ai:total"],
    ["HGETALL", `n:ai:${today}`],
    ["HGETALL", "n:search:total"],
    ["HGETALL", "n:bot:total"],
    ["ZREVRANGE", "p:human", 0, 14, "WITHSCORES"],
    ["ZREVRANGE", "p:ai", 0, 14, "WITHSCORES"],
    ...uniqueDays.map((d) => ["HGETALL", `v:${d}`]),
  ];
  const r = await pipeline(cmds);
  if (!r) return null;

  const zset = (raw: unknown) => Object.entries(toMap(raw)) as [string, number][];

  return {
    total: toCounts(r[0]),
    aiTotal: sorted(toMap(r[1])),
    aiToday: sorted(toMap(r[2])),
    searchTotal: sorted(toMap(r[3])),
    botTotal: sorted(toMap(r[4])),
    pagesHuman: zset(r[5]),
    pagesAi: zset(r[6]),
    days: uniqueDays.map((day, i) => ({ day, counts: toCounts(r[7 + i]) })),
  };
}
