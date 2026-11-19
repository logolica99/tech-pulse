# Publishing a post

Add one Markdown file under `content/posts/`. Do not edit application code. A production deploy (Vercel builds on every push to the default branch) publishes the file.

The build reads every file in that folder and fails if one is invalid. Fix the file named in the error. At least one published post must remain.

## File name

```text
content/posts/YYYY-MM-DD-slug.md
```

- `YYYY-MM-DD` is the publication date and must match frontmatter `date`.
- `slug` is lowercase words separated by hyphens: `a-z`, `0-9`, and single hyphens. No spaces, underscores, or uppercase letters.
- `.mdx` is accepted and rendered as Markdown. Do not put JSX, imports, or exports in the file.
- The public URL is `/posts/` plus the file name without the extension.
  Example: `content/posts/2026-11-16-voltus-battery-network.md` → `/posts/2026-11-16-voltus-battery-network`.

## Frontmatter

Put this block at the top of the file. Quote `title`, `date`, and `summary`.

```yaml
---
title: "Short headline, 8 to 120 characters"
date: "2026-11-16"
published: "2026-11-16T09:05:00-08:00"
summary: "One sentence, 40 to 320 characters, no line break. This is the card text and the meta description."
tags:
  - AI
  - Energy
category: AI
sources:
  - title: "Publication or document title"
    url: "https://example.com/story"
draft: false
---
```

| Field | Required | Rules |
| --- | --- | --- |
| `title` | yes | String, 8–120 characters. |
| `date` | yes | Quoted `YYYY-MM-DD`. Must be a real calendar date and must equal the date in the file name. |
| `summary` | yes | One line, 40–320 characters. |
| `tags` | yes | 1–6 labels. Each label is 2–32 characters and may contain letters, numbers, spaces, `&`, `/`, `+`, and hyphens. |
| `category` | yes | Exactly one allowed section tag: `AI`, `Energy`, `Robotics`, `Space`, `Funding`, or `Other`. |
| `sources` | yes | At least one `{ title, url }`. `url` must be an absolute `http` or `https` URL. |
| `published` | yes for new posts | Quoted ISO date-time of when the post went live, with offset, e.g. `"2026-11-17T13:05:00-08:00"`. Listings sort by this, newest first. Use the current time when you write the post. |
| `draft` | no | `true` or `false`. Default `false`. Drafts are validated and then omitted from the site, RSS, and sitemap. |

No other frontmatter keys are allowed.

Allowed section tags: `AI`, `Energy`, `Robotics`, `Space`, `Funding`, `Other`.

`category` must be one of those six. It is the section shown in the site navigation and at `/tags/<slug>`. `AI` is `/tags/ai`. `Space` is `/tags/space`. `Funding` is `/tags/funding`. Those section pages are published even when no story is filed there yet.

Use category `Funding` when the main news is a company raising money: a funding round, grant, IPO, or other raise. Still include a `Funding` tag and a topic tag (`AI`, `Energy`, `Robotics`, or `Space`). Do not use `Funding` for acquisitions or contracts.

Any other tag still gets a page when a post uses it. The slug is the label lowercased, with spaces and punctuation turned into hyphens.

Every listing (home, category, tag pages, RSS) is ordered by `published`, newest first. Posts without it fall back to the start of their `date`.

## Body

Write GitHub-flavored Markdown after the frontmatter. At least 80 characters. Do not repeat the title as an H1; the page renders the title. Start with the story. Use `##` for sections.

The page appends a **Sources** section from `sources`. Do not paste that list again at the bottom of the body unless you are discussing a source in the prose.

Every factual claim in the body must be supported by a source in `sources`. Do not invent numbers, quotes, companies, or URLs. If a figure comes from a company announcement, say so. If you cannot open and verify a source, do not publish the post.

## Checklist

1. Create `content/posts/YYYY-MM-DD-slug.md` only.
2. Fill the frontmatter schema above. Category is `AI`, `Energy`, `Robotics`, `Space`, `Funding`, or `Other`. Use `Funding` when the main news is a company raising money (a round, grant, IPO, or raise), and keep a `Funding` tag plus a topic tag.
3. Write the body in Markdown and cite real sources.
4. Run `npm run build`. It must finish with no post-validation error.
5. Commit that one file (plus nothing else, unless the build required a fix outside it).
