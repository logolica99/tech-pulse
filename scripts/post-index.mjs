#!/usr/bin/env node
/**
 * Compact post index for duplicate checks during publishing.
 *
 *   node scripts/post-index.mjs                 # regenerate content/post-index.tsv
 *   node scripts/post-index.mjs recent [--days 21]
 *   node scripts/post-index.mjs check --title "..." --urls "u1,u2" [--entities "A,B"] [--days 21]
 *
 * The site build does not use this file. Regenerate and commit it after adding posts.
 * Never hook this to prebuild: a script failure must not break production deploys.
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const matter = require("gray-matter");

process.stdout.on("error", (error) => {
  if (error.code === "EPIPE") process.exit(0);
  throw error;
});

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const INDEX_PATH = path.join(ROOT, "content", "post-index.tsv");
const FILE_NAME = /^(\d{4}-\d{2}-\d{2})-(.+)\.(md|mdx)$/;
const DEFAULT_DAYS = 21;
const MAX_ENTITIES = 8;

const GENERIC_ENTITIES = new Set(
  [
    "ai",
    "energy",
    "robotics",
    "space",
    "funding",
    "other",
    "gta 6",
    "gta6",
    "gta",
    "gaming",
    "markets",
    "news",
    "tech",
    "technology",
    "policy",
    "research",
    "science",
    "climate",
    "ipo",
    "grant",
    "grants",
    "update",
    "analysis",
    "explainer",
    "opinion",
    "world",
    "official",
    "report",
    "reports",
    "article",
    "us",
    "usa",
    "u s",
    "uk",
    "eu",
    "mw",
    "gw",
    "kw",
    "kwh",
    "mwh",
    "gwh",
    "guides",
    "guide",
    "fact check",
    "how to",
    "chips",
    "hardware",
    "memory",
    "security",
    "privacy",
    "education",
    "music",
    "sales",
    "startups",
    "retail",
    "defense",
    "manufacturing",
    "compute",
    "open source",
    "open models",
    "benchmarks",
    "mathematics",
    "cybersecurity",
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
    "jan",
    "feb",
    "mar",
    "apr",
    "jun",
    "jul",
    "aug",
    "sep",
    "sept",
    "oct",
    "nov",
    "dec",
  ].map((s) => normalizeEntity(s)),
);

const QUESTION_WORDS = new Set(
  [
    "how",
    "do",
    "does",
    "did",
    "can",
    "could",
    "should",
    "would",
    "will",
    "what",
    "when",
    "where",
    "why",
    "who",
    "which",
    "is",
    "are",
    "was",
    "were",
    "has",
    "have",
    "had",
    "if",
  ].map((s) => s.toLowerCase()),
);

const WEAK_WORDS = new Set(
  [
    "no",
    "yes",
    "not",
    "maybe",
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "nor",
    "square",
    "triangle",
    "circle",
    "cross",
    "capsule",
  ].map((s) => s.toLowerCase()),
);

const STOPWORDS = new Set(
  `
    a an the and or but in on at to for of with by from as is are was were be been being
    its it it's than then that this these those their they them his her our your you we i
    after before about into over under up down out off so if not no yes how what when where
    why who which do does did doing can could will would should may might vs versus via per
    amid says said just more also still once than while during against without within
    new old first second latest today yesterday
  `
    .trim()
    .split(/\s+/)
    .map((w) => w.replace(/'/g, "")),
);

const CONNECTORS = new Set(["of", "the", "and", "de", "la", "da", "von", "van", "del", "di", "du", "for"]);

function usage(exitCode = 1) {
  const msg = `Usage:
  node scripts/post-index.mjs [generate]
  node scripts/post-index.mjs recent [--days 21]
  node scripts/post-index.mjs check --title "..." [--urls "u1,u2"] [--entities "A,B"] [--days 21]
`;
  if (exitCode === 0) process.stdout.write(msg);
  else process.stderr.write(msg);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  if (args.includes("-h") || args.includes("--help")) usage(0);

  let command = "generate";
  if (args[0] && !args[0].startsWith("-")) {
    command = args.shift();
  }

  const flags = { days: DEFAULT_DAYS, title: "", urls: "", entities: "" };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];
    if (arg === "--days" && next) {
      const days = Number(next);
      if (!Number.isInteger(days) || days < 0) {
        process.stderr.write(`Invalid --days value: ${next}\n`);
        process.exit(1);
      }
      flags.days = days;
      i++;
    } else if (arg === "--title" && next != null) {
      flags.title = next;
      i++;
    } else if (arg === "--urls" && next != null) {
      flags.urls = next;
      i++;
    } else if (arg === "--entities" && next != null) {
      flags.entities = next;
      i++;
    } else if (arg.startsWith("--title=")) {
      flags.title = arg.slice("--title=".length);
    } else if (arg.startsWith("--urls=")) {
      flags.urls = arg.slice("--urls=".length);
    } else if (arg.startsWith("--entities=")) {
      flags.entities = arg.slice("--entities=".length);
    } else if (arg.startsWith("--days=")) {
      const days = Number(arg.slice("--days=".length));
      if (!Number.isInteger(days) || days < 0) {
        process.stderr.write(`Invalid --days value: ${arg}\n`);
        process.exit(1);
      }
      flags.days = days;
    } else {
      process.stderr.write(`Unknown argument: ${arg}\n`);
      usage(1);
    }
  }

  return { command, flags };
}

function cutoffDate(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function sanitizeCell(value) {
  return String(value ?? "")
    .replace(/[\t\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeUrl(raw) {
  if (!raw || typeof raw !== "string") return null;
  try {
    const url = new URL(raw.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    let pathname = url.pathname || "";
    try {
      pathname = decodeURIComponent(pathname);
    } catch {
      // keep raw path if it is not decodable
    }
    pathname = pathname.toLowerCase().replace(/\/+$/, "");
    return host + pathname;
  } catch {
    return null;
  }
}

function splitList(value) {
  if (!value) return [];
  return value
    .split(/[,\n]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function normalizeEntity(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['\u2019]s\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function entityKey(value) {
  return normalizeEntity(value).replace(/\s+/g, "");
}

function isGenericEntity(value) {
  const normalized = normalizeEntity(value);
  const compact = entityKey(value);
  return !normalized || GENERIC_ENTITIES.has(normalized) || GENERIC_ENTITIES.has(compact);
}

function wordKey(token) {
  return stripPossessive(token)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function isCapitalizedToken(token) {
  if (!token) return false;
  if (/^[\d$]/.test(token)) return false;
  return /^\p{Lu}/u.test(token);
}

function isAcronym(token) {
  const t = stripPossessive(token);
  return /^(?:[A-Z]{2,6}[+]?|[A-Z]{1,6}-[A-Z0-9]{1,10}(?:-[A-Z0-9]{1,10})*)$/.test(t);
}

function isControllerCode(token) {
  return /^(?:[A-Z]\d|[A-Z]|L1|L2|L3|R1|R2|R3)$/.test(stripPossessive(token));
}

function isWeakToken(token) {
  const key = wordKey(token);
  return !key || QUESTION_WORDS.has(key) || WEAK_WORDS.has(key);
}

function stripPossessive(token) {
  return token.replace(/['\u2019]s$/u, "");
}

function wasPossessive(token) {
  return /['\u2019]s$/u.test(token);
}

function expandHyphen(token) {
  if (!token.includes("-")) return [token];
  const parts = token.split("-");
  const named = (part) => isCapitalizedToken(part) || /^\d+[A-Za-z]?$/.test(part);
  if (parts.every(named)) return [token];
  return parts.filter(Boolean);
}

function tokenizeTitle(title) {
  const raw = String(title ?? "")
    .replace(/[“”"();[\]{}]/g, " ")
    .replace(/([?!])/g, " $1 ")
    .replace(/[:]/g, " : ")
    .replace(/[,]/g, " ");
  const words = [];
  let sentenceInitial = true;
  for (const token of raw.split(/\s+/).filter(Boolean)) {
    if (token === "?" || token === "!" || token === ":") {
      sentenceInitial = true;
      continue;
    }
    for (const part of expandHyphen(token)) {
      words.push({ token: part, sentenceInitial });
      sentenceInitial = false;
    }
    if (wasPossessive(token) || /['\u2019]s$/u.test(token)) {
      // A possessive breaks a multi-word name: "Alpöge's Claude".
      words[words.length - 1].breakAfter = true;
    }
  }
  return words;
}

function canAttachVersion(entityParts, next) {
  const last = entityParts[entityParts.length - 1] || "";
  if (/^Series$/i.test(last) && /^[A-F]$/.test(next)) return true;
  if (!/^\d{1,2}[A-Za-z]?$/.test(next) && !/^v\d+[A-Za-z]?$/i.test(next)) return false;
  return isAcronym(last) || /[0-9]/.test(last) || /^(GTA|PS|Xbox|Gemma|FSD)$/i.test(last);
}

function isAfterQuestion(words, index) {
  // sentenceInitial true after ?/!/: is stricter than the title start.
  return words[index].sentenceInitial && index > 0;
}

function entitiesFromTitle(title) {
  const words = tokenizeTitle(title);
  const found = [];
  for (let i = 0; i < words.length; i++) {
    const { token: raw, sentenceInitial } = words[i];
    if (!isCapitalizedToken(raw) || isControllerCode(raw) || isWeakToken(raw)) continue;
    if (sentenceInitial && isAfterQuestion(words, i) && !isAcronym(raw) && i + 1 < words.length && !isCapitalizedToken(words[i + 1].token)) {
      continue;
    }
    const parts = [stripPossessive(raw)];
    let j = i + 1;
    let stop = Boolean(words[i].breakAfter);
    // A short acronym may take one following title-case word ("PS Plus")
    // but should not swallow a later name after punctuation ("WSJ: Alice Huang").
    let acronymTookWord = false;
    while (j < words.length && !stop) {
      if (words[j].sentenceInitial) break;
      const next = words[j].token;
      const lower = next.toLowerCase().replace(/[^a-z]/g, "");
      if (CONNECTORS.has(lower) && j + 1 < words.length && isCapitalizedToken(words[j + 1].token) && !isWeakToken(words[j + 1].token) && !isControllerCode(words[j + 1].token)) {
        parts.push(next);
        parts.push(stripPossessive(words[j + 1].token));
        stop = Boolean(words[j + 1].breakAfter);
        j += 2;
        continue;
      }
      if (isCapitalizedToken(next) && !isControllerCode(next) && !isWeakToken(next)) {
        if (isAcronym(raw) && !isAcronym(next)) {
          if (acronymTookWord) break;
          parts.push(stripPossessive(next));
          acronymTookWord = true;
          stop = Boolean(words[j].breakAfter);
          j += 1;
          break;
        }
        if (isAcronym(next) && !isAcronym(raw) && parts.length <= 2) {
          parts.push(stripPossessive(next));
          stop = Boolean(words[j].breakAfter);
          j += 1;
          break;
        }
        if (isAcronym(raw) || isAcronym(next)) break;
        parts.push(stripPossessive(next));
        stop = Boolean(words[j].breakAfter);
        j += 1;
        continue;
      }
      if (canAttachVersion(parts, next)) {
        parts.push(next);
        j += 1;
      }
      break;
    }
    const entity = parts.join(" ").replace(/\s+/g, " ").trim();
    if (entity && !isGenericEntity(entity)) found.push(entity);
    i = Math.max(i, j - 1);
  }
  return found;
}

function entitiesFromTags(tags) {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
    .filter((tag) => tag && !isGenericEntity(tag));
}

function collectEntities(tags, title) {
  const seen = new Set();
  const result = [];
  for (const entity of [...entitiesFromTags(tags), ...entitiesFromTitle(title)]) {
    const key = entityKey(entity);
    // Keep short acronyms like UN; drop leftover 2-letter noise such as VI.
    if (!key || seen.has(key) || isGenericEntity(entity)) continue;
    if (key.length < 3 && key !== "un") continue;
    seen.add(key);
    result.push(entity);
    if (result.length >= MAX_ENTITIES) break;
  }
  return result;
}

function titleTokens(title) {
  return new Set(
    String(title ?? "")
      .toLowerCase()
      .replace(/\$/g, "")
      .split(/[^a-z0-9.]+/)
      .map((token) => token.replace(/^\.+|\.+$/g, ""))
      .filter((token) => token && token.length > 1 && !STOPWORDS.has(token.replace(/'/g, ""))),
  );
}

function titleOverlap(a, b) {
  const left = titleTokens(a);
  const right = titleTokens(b);
  if (left.size === 0 || right.size === 0) {
    return { intersection: 0, jaccard: 0, coverage: 0, strong: false };
  }
  let intersection = 0;
  for (const token of left) {
    if (right.has(token)) intersection++;
  }
  const union = left.size + right.size - intersection;
  const jaccard = union === 0 ? 0 : intersection / union;
  const coverage = intersection / Math.min(left.size, right.size);
  const strong =
    (intersection >= 4 && (jaccard >= 0.4 || coverage >= 0.6)) ||
    (intersection >= 3 && jaccard >= 0.5);
  return { intersection, jaccard, coverage, strong };
}

function keysMatch(a, b) {
  if (!a || !b) return false;
  if (a === b) return a.length >= 3;
  const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a];
  return shorter.length >= 4 && longer.startsWith(shorter);
}

function entitiesOverlap(candidate, postEntities) {
  const candidateKeys = candidate.map(entityKey).filter(Boolean);
  const postKeys = postEntities.map(entityKey).filter(Boolean);
  const shared = [];
  for (const key of candidateKeys) {
    const match = postKeys.find((postKey) => keysMatch(key, postKey));
    if (match && !shared.includes(key)) shared.push(key);
  }
  return shared;
}

function sourcesFromData(data) {
  if (!Array.isArray(data?.sources)) return [];
  return data.sources
    .map((source) => (source && typeof source.url === "string" ? normalizeUrl(source.url) : null))
    .filter(Boolean);
}

function readPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter((name) => FILE_NAME.test(name));
  const posts = [];
  for (const file of files) {
    const match = FILE_NAME.exec(file);
    const fileDate = match[1];
    const slug = match[2];
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    let data = {};
    try {
      data = matter(raw).data ?? {};
    } catch (error) {
      process.stderr.write(`Skipping ${file}: ${error.message}\n`);
      continue;
    }
    const title = typeof data.title === "string" ? data.title : "";
    const date = typeof data.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data.date) ? data.date : fileDate;
    const category = typeof data.category === "string" ? data.category : "";
    posts.push({
      date,
      slug,
      category,
      title,
      entities: collectEntities(data.tags, title),
      urls: sourcesFromData(data),
    });
  }
  posts.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
  });
  return posts;
}

function toLine(post) {
  return [
    sanitizeCell(post.date),
    sanitizeCell(post.slug),
    sanitizeCell(post.category),
    sanitizeCell(post.title),
    post.entities.map(sanitizeCell).filter(Boolean).join("|"),
    post.urls.join(" "),
  ].join("\t");
}

function parseLine(line) {
  if (!line || line.startsWith("#")) return null;
  const [date, slug, category, title, entities, urls] = line.split("\t");
  if (!date || !slug) return null;
  return {
    date,
    slug,
    category: category ?? "",
    title: title ?? "",
    entities: entities ? entities.split("|").filter(Boolean) : [],
    urls: urls ? urls.split(/\s+/).filter(Boolean) : [],
    line,
  };
}

function generateIndex() {
  const posts = readPosts();
  const header = "# date\tslug\tcategory\ttitle\tentities\turls";
  const body = posts.map(toLine).join("\n");
  const output = `${header}\n${body}\n`;
  fs.mkdirSync(path.dirname(INDEX_PATH), { recursive: true });
  fs.writeFileSync(INDEX_PATH, output, "utf8");
  const bytes = Buffer.byteLength(output);
  process.stdout.write(
    `Wrote ${posts.length} posts to ${path.relative(ROOT, INDEX_PATH)} (${bytes} bytes)\n`,
  );
}

function loadIndex() {
  if (!fs.existsSync(INDEX_PATH)) {
    process.stderr.write(
      `Missing ${path.relative(ROOT, INDEX_PATH)}. Run: npm run index\n`,
    );
    process.exit(1);
  }
  const text = fs.readFileSync(INDEX_PATH, "utf8");
  return text
    .split(/\n/)
    .map((line) => parseLine(line.trimEnd()))
    .filter(Boolean);
}

function recentCommand(days) {
  const cutoff = cutoffDate(days);
  const rows = loadIndex().filter((post) => post.date >= cutoff);
  if (rows.length === 0) return;
  for (const post of rows) {
    process.stdout.write(`${post.line}\n`);
  }
}

function checkCommand(flags) {
  if (!flags.title && !flags.urls && !flags.entities) {
    process.stderr.write("check requires --title, --urls, and/or --entities\n");
    usage(1);
  }

  const candidateTitle = flags.title;
  const candidateUrls = new Set(splitList(flags.urls).map(normalizeUrl).filter(Boolean));
  const candidateEntities = [
    ...splitList(flags.entities),
    ...entitiesFromTitle(candidateTitle),
  ];
  const cutoff = cutoffDate(flags.days);
  const posts = loadIndex();

  const duplicates = [];
  const possibles = [];

  for (const post of posts) {
    const urlHits = post.urls.filter((url) => candidateUrls.has(url));
    if (urlHits.length > 0) {
      duplicates.push({ post, reasons: urlHits.map((url) => `url:${url}`) });
      continue;
    }

    if (post.date < cutoff) continue;

    const reasons = [];
    const overlap = titleOverlap(candidateTitle, post.title);
    if (candidateTitle && overlap.strong) {
      reasons.push(
        `title:${overlap.intersection}tok/${Math.round(overlap.jaccard * 100)}j/${Math.round(overlap.coverage * 100)}c`,
      );
    }
    const shared = entitiesOverlap(candidateEntities, post.entities);
    if (shared.length > 0) {
      reasons.push(`entities:${shared.join("|")}`);
    }
    if (reasons.length > 0) possibles.push({ post, reasons });
  }

  if (duplicates.length === 0 && possibles.length === 0) {
    process.stdout.write("OK\n");
    return;
  }

  for (const hit of duplicates) {
    process.stdout.write(`DUPLICATE\t${hit.reasons.join(",")}\t${hit.post.line}\n`);
  }
  for (const hit of possibles) {
    process.stdout.write(`POSSIBLE\t${hit.reasons.join(",")}\t${hit.post.line}\n`);
  }
}

const { command, flags } = parseArgs(process.argv);

if (command === "generate" || command === "index") {
  generateIndex();
} else if (command === "recent") {
  recentCommand(flags.days);
} else if (command === "check") {
  checkCommand(flags);
} else {
  process.stderr.write(`Unknown command: ${command}\n`);
  usage(1);
}
