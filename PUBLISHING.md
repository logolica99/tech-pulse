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
| `category` | yes | Exactly `AI`, `Energy`, or `Other`. This drives the home-page filters. |
| `sources` | yes | At least one `{ title, url }`. `url` must be an absolute `http` or `https` URL. |
| `draft` | no | `true` or `false`. Default `false`. Drafts are validated and then omitted from the site, RSS, and sitemap. |

No other frontmatter keys are allowed.

Tag pages are generated from `tags`, at `/tags/<slug>`. The slug is the label lowercased, with spaces and punctuation turned into hyphens. `AI` becomes `/tags/ai`.

Home-page order is publication date, newest first. Same-day posts are ordered by file name, descending.

## Body

Write GitHub-flavored Markdown after the frontmatter. At least 80 characters. Do not repeat the title as an H1; the page renders the title. Start with the story. Use `##` for sections.

The page appends a **Sources** section from `sources`. Do not paste that list again at the bottom of the body unless you are discussing a source in the prose.

Every factual claim in the body must be supported by a source in `sources`. Do not invent numbers, quotes, companies, or URLs. If a figure comes from a company announcement, say so. If you cannot open and verify a source, do not publish the post.

## Checklist

1. Create `content/posts/YYYY-MM-DD-slug.md` only.
2. Fill the frontmatter schema above. Category is `AI`, `Energy`, or `Other`.
3. Write the body in Markdown and cite real sources.
4. Run `npm run build`. It must finish with no post-validation error.
5. Commit that one file (plus nothing else, unless the build required a fix outside it).
