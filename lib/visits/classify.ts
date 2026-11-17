/**
 * Classify a request by user agent into human, AI, search, or other bot.
 * Order matters: the first matching rule wins.
 */

export type VisitKind = "human" | "ai" | "search" | "bot";

export interface Visitor {
  kind: VisitKind;
  /** Bot name for ai/search/bot; null for humans. */
  name: string | null;
}

const AI_BOTS: [string, RegExp][] = [
  ["ChatGPT-User", /ChatGPT-User/i],
  ["OAI-SearchBot", /OAI-SearchBot/i],
  ["GPTBot", /GPTBot/i],
  ["Claude-User", /Claude-User/i],
  ["Claude-SearchBot", /Claude-SearchBot/i],
  ["ClaudeBot", /ClaudeBot/i],
  ["Claude-Web", /Claude-Web/i],
  ["anthropic-ai", /anthropic-ai/i],
  ["Perplexity-User", /Perplexity-User/i],
  ["PerplexityBot", /PerplexityBot/i],
  ["Google-Extended", /Google-Extended/i],
  ["Google-CloudVertexBot", /Google-CloudVertexBot/i],
  ["Gemini-Deep-Research", /Gemini-Deep-Research/i],
  ["Bytespider", /Bytespider/i],
  ["CCBot", /CCBot/i],
  ["Applebot-Extended", /Applebot-Extended/i],
  ["Meta-ExternalAgent", /meta-externalagent/i],
  ["Meta-ExternalFetcher", /meta-externalfetcher/i],
  ["Amazonbot", /Amazonbot/i],
  ["cohere-ai", /cohere-(ai|training-data-crawler)/i],
  ["DuckAssistBot", /DuckAssistBot/i],
  ["MistralAI-User", /MistralAI-User/i],
  ["YouBot", /YouBot/i],
  ["Diffbot", /Diffbot/i],
  ["AI2Bot", /AI2Bot/i],
  ["PetalBot", /PetalBot/i],
  ["Timpibot", /Timpibot/i],
  ["ImagesiftBot", /ImagesiftBot/i],
  ["Omgili", /omgili/i],
  ["xAI", /xAI-?Bot|Grok/i],
  ["DeepSeekBot", /DeepSeek/i],
  ["Kangaroo Bot", /Kangaroo Bot/i],
  ["PhindBot", /PhindBot/i],
  ["Manus", /Manus-User/i],
];

const SEARCH_BOTS: [string, RegExp][] = [
  ["Googlebot", /Googlebot|Google-InspectionTool|GoogleOther|Storebot-Google/i],
  ["Bingbot", /bingbot|BingPreview|msnbot/i],
  ["Applebot", /Applebot/i],
  ["DuckDuckBot", /DuckDuckBot/i],
  ["YandexBot", /YandexBot|YandexMobileBot/i],
  ["Baiduspider", /Baiduspider/i],
  ["Yahoo Slurp", /Slurp/i],
  ["Naver Yeti", /Yeti\//i],
  ["SeznamBot", /SeznamBot/i],
  ["Qwant", /Qwantbot|Qwantify/i],
  ["Brave Search", /Bravebot/i],
  ["Mojeek", /MojeekBot/i],
];

const OTHER_BOTS: [string, RegExp][] = [
  ["Facebook preview", /facebookexternalhit|facebookcatalog/i],
  ["X/Twitter preview", /Twitterbot/i],
  ["LinkedIn preview", /LinkedInBot/i],
  ["Slack preview", /Slackbot|Slack-ImgProxy/i],
  ["Discord preview", /Discordbot/i],
  ["Telegram preview", /TelegramBot/i],
  ["WhatsApp preview", /WhatsApp/i],
  ["Feedly", /Feedly/i],
  ["Inoreader", /Inoreader/i],
  ["NewsBlur", /NewsBlur/i],
  ["Feedbin", /Feedbin/i],
  ["AhrefsBot", /AhrefsBot/i],
  ["SemrushBot", /SemrushBot/i],
  ["MJ12bot", /MJ12bot/i],
  ["DotBot", /DotBot/i],
  ["DataForSeoBot", /DataForSeoBot/i],
  ["Vercel", /vercel-(screenshot|favicon)|Vercelbot/i],
  ["Uptime monitor", /UptimeRobot|Pingdom|StatusCake|Better ?Uptime/i],
  ["curl", /^curl\//i],
  ["wget", /^Wget/i],
  ["Python", /python-requests|python-urllib|aiohttp|httpx/i],
  ["Go", /Go-http-client/i],
  ["Node", /node-fetch|undici|axios|^node$/i],
  ["Headless browser", /HeadlessChrome|PhantomJS|Puppeteer|Playwright/i],
];

const GENERIC_BOT = /bot\b|bot\/|crawler|spider|crawl|fetcher|scraper|preview|monitor|feed|rss|http-?client|java\/|libwww|okhttp/i;

export function classify(userAgent: string | null, signatureAgent?: string | null): Visitor {
  // Agents that browse with a real Chrome UA but sign their requests.
  if (signatureAgent) {
    const sig = signatureAgent.replace(/"/g, "");
    if (/chatgpt\.com/i.test(sig)) return { kind: "ai", name: "ChatGPT Agent" };
    return { kind: "ai", name: `Signed agent (${new URL(sig, "https://x").hostname})` };
  }

  const ua = (userAgent ?? "").trim();
  if (!ua) return { kind: "bot", name: "No user agent" };

  for (const [name, re] of AI_BOTS) if (re.test(ua)) return { kind: "ai", name };
  for (const [name, re] of SEARCH_BOTS) if (re.test(ua)) return { kind: "search", name };
  for (const [name, re] of OTHER_BOTS) if (re.test(ua)) return { kind: "bot", name };
  if (GENERIC_BOT.test(ua)) return { kind: "bot", name: "Other bot" };
  if (!/Mozilla\/|Opera\//.test(ua)) return { kind: "bot", name: "Other bot" };

  return { kind: "human", name: null };
}
