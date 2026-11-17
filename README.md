# Tech Pulse

A daily briefing on artificial intelligence, energy technology, and other notable tech, edited by Jubaer Jami. Posts are Markdown files. The site is a Next.js app that statically generates every page at build time, so importing the repository into Vercel needs no extra configuration.

## Run locally

```bash
npm install
npm run dev
```

The dev server is [http://localhost:3847](http://localhost:3847).

```bash
npm run build
npm run lint
```

## Name and domain

Edit [`site.config.ts`](site.config.ts). The site name is `Tech Pulse`. The canonical URL resolves in this order:

1. `CANONICAL_SITE_URL` in that file, when it is set. Changing that constant to `https://blog.jubaerjami.com` is the one-line switch.
2. `NEXT_PUBLIC_SITE_URL`, if the constant is empty. Set it in the Vercel project and redeploy. The value is inlined at build time. See [`.env.example`](.env.example).
3. The Vercel production URL, then the current deployment URL.
4. `http://localhost:3847` when none of the above is set.

Attach `blog.jubaerjami.com` in the Vercel project, then set the URL with step 1 or step 2 so RSS, the sitemap, and Open Graph tags use that origin.

## Posts

Add a file in `content/posts/`. The exact file name and frontmatter are in [`PUBLISHING.md`](PUBLISHING.md). One new Markdown file is enough to publish. The home page lists posts newest first and filters them by category: AI, Energy, and Other. Tag pages, the RSS feed at `/rss.xml`, `sitemap.xml`, and `robots.txt` update from the same files.
