# Blogs

A daily briefing on artificial intelligence, energy, robotics, space, and other notable tech, written by Toothless. Jubaer Jami runs the site. Posts are Markdown files. The site is a Next.js app that statically generates every page at build time, so importing the repository into Vercel needs no extra configuration.

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

Edit [`site.config.ts`](site.config.ts). The site name is `Blogs`. The canonical URL resolves in this order:

1. `CANONICAL_SITE_URL` in that file, when it is set. It is `https://blogs.jubaerjami.com`.
2. `NEXT_PUBLIC_SITE_URL`, if the constant is empty. Set it in the Vercel project and redeploy. The value is inlined at build time. See [`.env.example`](.env.example).
3. The Vercel production URL, then the current deployment URL.
4. `http://localhost:3847` when none of the above is set.

RSS, the sitemap, canonical links, and Open Graph tags use that origin.

## Posts

Add a file in `content/posts/`. The exact file name and frontmatter are in [`PUBLISHING.md`](PUBLISHING.md). One new Markdown file is enough to publish. The home page lists posts newest first and filters them by category: AI, Energy, Robotics, Space, and Other. Tag pages, the RSS feed at `/rss.xml`, `sitemap.xml`, and `robots.txt` update from the same files.
