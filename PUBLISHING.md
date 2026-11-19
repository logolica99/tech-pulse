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

Optional image fields (see [Images](#images)):

```yaml
image: "/images/posts/2026-11-19-slug.jpg"
imageAlt: "What the picture shows, in plain words"
imageCredit: "Rockstar Games"
```

| Field | Required | Rules |
| --- | --- | --- |
| `title` | yes | String, 8–120 characters. |
| `date` | yes | Quoted `YYYY-MM-DD`. Must be a real calendar date and must equal the date in the file name. |
| `summary` | yes | One line, 40–320 characters. |
| `tags` | yes | 1–6 labels. Each label is 2–32 characters and may contain letters, numbers, spaces, `&`, `/`, `+`, and hyphens. |
| `category` | yes | Exactly one allowed section tag: `AI`, `Energy`, `Robotics`, `Space`, `Funding`, `GTA 6`, or `Other`. |
| `sources` | yes | At least one `{ title, url }`. `url` must be an absolute `http` or `https` URL. |
| `published` | yes for new posts | Quoted ISO date-time of when the post went live, with offset, e.g. `"2026-11-17T13:05:00-08:00"`. Listings sort by this, newest first. Use the current time when you write the post. |
| `image` | no | Path to one picture shown under the summary: `/images/posts/<file name>`, lowercase, `.jpg`, `.jpeg`, `.png`, or `.webp`. The file must exist in `public/images/posts/`. |
| `imageAlt` | with `image` | 8–200 characters describing the picture. |
| `imageCredit` | with `image` | 2–80 characters. Rendered as `Image: <credit>`, e.g. `Rockstar Games`. |
| `draft` | no | `true` or `false`. Default `false`. Drafts are validated and then omitted from the site, RSS, and sitemap. |

No other frontmatter keys are allowed.

Allowed section tags: `AI`, `Energy`, `Robotics`, `Space`, `Funding`, `GTA 6`, `Other`.

`category` must be one of those seven. It is the section shown in the site navigation and at `/tags/<slug>`. `AI` is `/tags/ai`. `Space` is `/tags/space`. `Funding` is `/tags/funding`. `GTA 6` is `/tags/gta-6`. Those section pages are published even when no story is filed there yet.

Use category `Funding` when the main news is a company raising money: a funding round, grant, IPO, or other raise. Still include a `Funding` tag and a topic tag (`AI`, `Energy`, `Robotics`, or `Space`). Do not use `Funding` for acquisitions or contracts.

A section page lists every post filed in that `category`, plus any post carrying the matching tag.

## GTA 6 posts

`GTA 6` is a question-and-answer section about Grand Theft Auto VI: the things people search for, such as the release date, platforms, price, story length, mission count, map, characters, trailers, PC and online plans.

- One question per post. The title is the question or a clear answer headline, e.g. `"How many story missions are in GTA 6? About 91, across five chapters"`.
- Use `category: GTA 6` and the tags `GTA 6`, `Rockstar Games`, `Gaming` (add one more topic tag such as `GTA Online` if useful).
- File name: `content/posts/YYYY-MM-DD-gta-6-<question-slug>.md`, e.g. `2026-11-19-gta-6-how-long-to-beat.md`.
- Open with the direct answer in bold (`**Short answer: ...**`), then context in `##` sections.
- End with a `## Official or not?` section that separates what Rockstar, Take-Two, or a platform holder (Sony, Microsoft) said from reports, reviewers' counts, analyst guesses, rumors, or leaks. Label rumors and leaks as such; never present them as fact.
- Never invent facts. Every claim needs a source you opened. Prefer Rockstar Newswire, rockstargames.com, Take-Two releases, and the PlayStation or Xbox store pages, then major outlets.
- No duplicates. Before writing, check `content/posts/` for an existing GTA 6 post on the same question. If the answer changed (for example a new date), write a new post only if the news itself is new, and say what changed.
- Avoid story spoilers beyond chapter names unless the question needs them.

## Images

A post may show one image under its summary, with a plain credit line below it. It is optional; a post without a good image is fine.

1. Download the file into `public/images/posts/`. Do not hotlink.
2. Name it like the post: `public/images/posts/YYYY-MM-DD-slug.jpg`.
3. Resize to at most 1600 px wide and save as a JPEG around quality 80 (aim for under 400 KB).
4. Set `image`, `imageAlt`, and `imageCredit` in the frontmatter.

Only use images you may reasonably reuse with credit: official press or media images from the company in the story. For GTA 6 use official Rockstar screenshots or artwork from rockstargames.com (including `rockstargames.com/VI`) or the Rockstar Newswire, with `imageCredit: "Rockstar Games"`. Do not use images from fan sites, social posts, leaks, stock sites, or anything watermarked.

Any other tag still gets a page when a post uses it. The slug is the label lowercased, with spaces and punctuation turned into hyphens.

Every listing (home, category, tag pages, RSS) is ordered by `published`, newest first. Posts without it fall back to the start of their `date`.

## Body

Write GitHub-flavored Markdown after the frontmatter. At least 80 characters. Do not repeat the title as an H1; the page renders the title. Start with the story. Use `##` for sections.

The page appends a **Sources** section from `sources`. Do not paste that list again at the bottom of the body unless you are discussing a source in the prose.

Every factual claim in the body must be supported by a source in `sources`. Do not invent numbers, quotes, companies, or URLs. If a figure comes from a company announcement, say so. If you cannot open and verify a source, do not publish the post.

## Checklist

1. Create `content/posts/YYYY-MM-DD-slug.md` (plus its image in `public/images/posts/`, if it has one).
2. Fill the frontmatter schema above. Category is `AI`, `Energy`, `Robotics`, `Space`, `Funding`, `GTA 6`, or `Other`. Use `Funding` when the main news is a company raising money (a round, grant, IPO, or raise), and keep a `Funding` tag plus a topic tag.
3. Write the body in Markdown and cite real sources.
4. Run `npm run build`. It must finish with no post-validation error.
5. Commit that file and its image (plus nothing else, unless the build required a fix outside it).
