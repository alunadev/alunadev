# How to Add, Edit & Delete Articles

There is no CMS. Articles are plain `.mdx` files — add a file to publish, edit a file to update, delete a file to remove. No code changes needed for any of it.

---

## Where articles live

```
content/articles/
└── 01-ai-agents-as-execution-layer.mdx
```

One file per article. The filename itself doesn't drive anything (no numeric-order requirement like case studies) — articles are sorted by their `date` field, newest first.

Articles appear in two places:
- **Homepage** — `app/components/writing-section.tsx` shows the 3 most recent
- **`/articles`** — `app/articles/page.tsx` lists all of them
- **`/articles/[slug]`** — `app/articles/[slug]/page.tsx` renders the full article

All three read from `lib/articles.ts`, which parses every `.mdx` file's frontmatter.

---

## Frontmatter fields

```yaml
---
slug: my-new-article                    # URL slug — must be unique, no spaces
title: "My New Article Title"           # Article heading
date: "2026-07-19"                      # ISO yyyy-mm-dd — controls sort order
summary: "One or two sentences."        # Shown in cards and under the title
tags: [AI-first, Product Builder]       # Pill labels
readingTime: "5 min"                    # Free text, shown next to the date
draft: true                             # Optional — see "Drafts" below
externalUrl: "https://..."              # Optional — see "Cross-posting" below
---

Article body in Markdown goes here.
```

| Field | Required | Notes |
|---|---|---|
| `slug` | yes | Must be unique across all articles. Used in the URL: `/articles/<slug>` |
| `title` | yes | |
| `date` | yes | `"yyyy-mm-dd"` format, quoted. Determines sort order (newest first) |
| `summary` | yes | Short teaser text |
| `tags` | yes | Array, can be empty `[]` |
| `readingTime` | yes | Free text, e.g. `"6 min"` |
| `draft` | no | `true` = article is completely hidden (see below). Omit or `false` to publish |
| `externalUrl` | no | If set, shows a "Read the original publication →" link on the article page |

The body below the frontmatter is standard Markdown (headings, lists, bold, links, etc.) rendered via `react-markdown` + `remark-gfm`.

---

## Add a new article

1. Create a new file in `content/articles/`, e.g. `content/articles/02-my-new-article.mdx`
2. Fill in the frontmatter (see fields above) — pick a unique `slug`
3. Write the body in Markdown below the frontmatter
4. Save. It appears automatically on the homepage and `/articles` — no code changes, no rebuild step needed in dev (Turbopack picks it up on save)
5. Commit and push so it goes live

## Edit an article

Open the `.mdx` file and change whatever you need — frontmatter fields or body copy. Save. That's it.

## Delete an article

Delete the `.mdx` file. It disappears from the homepage, `/articles`, and its `/articles/[slug]` page 404s immediately — no other cleanup required.

---

## Drafts

Set `draft: true` to keep an article completely out of sight:

- Hidden from the homepage Writing section
- Hidden from `/articles`
- Direct URL to `/articles/<slug>` returns a 404 — it is not reachable even if someone has the link

If drafting leaves **zero** published articles, the homepage Writing section hides itself entirely (no empty section), and `/articles` shows "Articles coming soon."

To publish: remove the `draft` line, or set `draft: false`.

## Cross-posting (`externalUrl`)

If you published the piece elsewhere first (Medium, LinkedIn, Substack…), add:

```yaml
externalUrl: "https://medium.com/@you/your-post"
```

This adds a "Read the original publication →" link near the top of the article page. It doesn't change where the article lives on your site — the full body still renders here too.

---

## Quick cheat sheet

| I want to… | I do… |
|---|---|
| Publish a new article | Add a `.mdx` file to `content/articles/` with the required frontmatter |
| Edit text or metadata | Open the `.mdx` file, edit, save |
| Take an article down temporarily | Set `draft: true` in its frontmatter |
| Publish a draft | Remove `draft: true` (or set it to `false`) |
| Delete an article permanently | Delete its `.mdx` file |
| Link to where it was originally published | Add `externalUrl: "https://..."` to its frontmatter |
| Change article order | Edit the `date` field — sort is always by date, newest first |
