# Session Log

## 2026-07-22 (6) — Fixed .claude/start-dev.sh: was running production build, not dev server
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: Adrian couldn't see the Agentation toolbar locally. Root cause: `.claude/start-dev.sh` ran `next build && next start` (production), and `AgentationToolbar` (`app/components/agentation/AgentationToolbar.tsx`) only renders when `NODE_ENV === "development"`. This also explains the repeated "stale content after edit, had to restart server" issue hit multiple times earlier this session — it wasn't a cache bug, the server was serving a static build that only picked up file changes on a full restart (full rebuild).
- done: `.claude/start-dev.sh` now runs `next dev --turbopack` directly instead of build+start. Verified: Agentation toolbar now mounts (`data-agentation-root`/`data-feedback-toolbar` present, visible bottom-right in a screenshot), no console errors.
- next: Adrian needs to restart whatever process is serving his own `localhost:3000` to pick up the fix (stop + relaunch). Still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2`.

## 2026-07-22 (5) — Hid the case study for publish, shelved case-study work for later
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none. Adrian rejected the milestone case-study redesign ("no me gusta nada") and asked to park it and prepare a publishable version with zero case studies exposed, to revisit case study work later.
- done: `content/case-studies/01-laliga-official-app.mdx` — `caseStudy: available` → `not-ready` (was the only card set to `available`; every other card was already `not-ready`/`false`). Card now links straight to `laliga.com/apps/app-oficial` instead of the internal case study page. Verified: no "Case study" button/text anywhere on the homepage, `/case-study/laliga-official-app` returns 404, no console errors. The `milestones` schema (`lib/content.ts`), the rewritten `app/case-study/[slug]/page.tsx`, and the 3-milestone content in the mdx file are all left in place, unused/unreachable — nothing was deleted, just hidden, so the case-study work is easy to resume later.
- next: case-study redesign is paused — do not resume without Adrian explicitly asking. Still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2`.

## 2026-07-22 (4) — Milestone structure for LALIGA Official App case study
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none (same stale-Next.js-cache pattern as entries above — fixed each time by restarting the dev server, verified via curl before trusting the browser DOM)
- done: added optional `milestones?: Array<{version, title, items, impact?}>` to `CaseStudyDetail` in `lib/content.ts`. `app/case-study/[slug]/page.tsx` now branches: if `milestones` is present, renders one "Approach" section with a per-milestone version tag + title + items + its own scoped impact grid; otherwise falls back to the original flat `approach`/`impact` rendering unchanged (every other case study still uses that path, untouched). Rewrote `content/case-studies/01-laliga-official-app.mdx` into 3 milestones per Adrian: v1.0 "New app, built from zero" (relaunch + rebrand + WSC clips, D7/D21/sessions/clips/rebranding metrics), v1.2 "Onboarding and content reprioritization" (+7%/+13%/+35%), v2.0 "Personalized content and AI Assistant" (per Adrian: treat the AI Assistant as already shipped in this case study, ahead of its real Aug-2026 launch — used only verified PRD scope facts, "10 core entities" / "6 intent types", not invented usage metrics since there's no real usage data yet). Flagged "v2.0" as my own guess for the version label, unconfirmed by Adrian.
- next: still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2`. This milestone structure is opt-in per case study, not applied to Fantasy/AdOS/Pulse/etc. — Adrian said each case study can have its own structure as long as the page UX/UI stays shared, which it does.

## 2026-07-22 (3) — Unified section-label style site-wide + rewrote case-study page
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none (hit the same stale-Next.js-cache issue as before after editing `case-study/[slug]/page.tsx`; fixed by restarting the dev server, confirmed via direct `curl`)
- done: extracted `SECTION_LABEL_TEXT_CLASS` in `app/components/section-label.tsx` (small, muted, `font-medium`, `tracking-[1.4px]`, uppercase — Adrian's ask: identify a new section without visual weight) and reused it in 3 places that were each styled differently before: `SectionLabel` itself (Experience/Writing/Stack, shrunk from a large 1–1.5rem scale down to match), `footer-section.tsx`'s "Find me" (was hardcoded caps text with its own class), and every sub-header in `app/case-study/[slug]/page.tsx` (Problem/Approach/Impact/Tools, previously hand-rolled `text-[12px]` with no responsive scaling). Also rewrote that whole file: 3-step `lg:px-[8.75rem]` padding to match the homepage (previously capped at `md:px-8`), all typography moved from raw px to rem, `rounded-[52px]`/`rounded-[12px]` → `rounded-full`/token radii, and the "Next: X →" / "Talk to me" links now use the shared `ExternalLinkIcon` instead of a literal "→" character. Verified at 375/768/1440px: correct 3-breakpoint values, no horizontal overflow, no console errors.
- next: still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2`. Note for later: `app/articles/[slug]/page.tsx` has the same missing-`lg:`-breakpoint and literal-arrow issues but was out of scope for this pass (Adrian only asked about case study pages).

## 2026-07-22 (2) — AI Champions added to AdOS; case-study page design audit
- model: claude-sonnet-5
- status: in-progress
- issue: none, but two open items pending Adrian before more work: (1) go/no-go on rewriting `app/case-study/[slug]/page.tsx` to match the site's design system, (2) clarification on what "section name as it is in the footer" refers to (searched `footer-section.tsx`, found no Experience/Writing/Stack references there today)
- done: added "AI Champions" (internal LALIGA AI-enablement session) to `content/case-studies/06-ados.mdx` approach + impact. Audited `app/case-study/[slug]/page.tsx` against the homepage's design system: narrower container (`max-w-[760px]` vs `1060px`), missing the `lg:` padding breakpoint, hand-rolled section headers instead of reusing `SectionLabel`, and px-based type/radii throughout instead of rem — reported to Adrian, no code changes made to that file yet.
- next: waiting on Adrian's answers to the two open items above before touching `case-study/[slug]/page.tsx`. Still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2`.

## 2026-07-22 — LALIGA Official App: 3 new metrics from about-ald, tied to their why
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none (dev server on :3000 was occupied by a real `pulse-tagging` project this time, not a stale process — left it alone, ran alunadev via autoPort on :51882 instead; also hit a stale Next.js cache serving old content after an edit, fixed by restarting the dev server)
- done: added `+7% registered user conversion`, `+13% profile completion`, `+35% vertical video consumption` (all verified in `about-ald`, previously missing from the site) to `content/case-studies/01-laliga-official-app.mdx`. Per Adrian's ask that they be "super asociadas al porqué": the causal story lives in 2 new `approach` bullets (onboarding rebuild → +7%/+13%; video hub reprioritized to a feed → +35%), while `impact` tiles stay short/numeric to match the existing visual pattern (tried embedding the causal text directly in `impact.result` first, reverted after DOM check showed it wrapped to 2 lines at 28px unlike every other tile).
- next: still deciding where to place the "AI Champions" achievement (AdOS vs. LALIGA block) — recommended AdOS, awaiting Adrian's confirmation before writing it. Still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2`.

## 2026-07-21 — Full em-dash cleanup, Fantasy logo fix, moved fable-one-shot out
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none
- done: cleaned every remaining em dash in user-facing prose across `content/case-studies/*.mdx` (01, 03, 04, 05, 06, 07, 08, 09) and `content/articles/01-ai-agents-as-execution-layer.mdx` (achievements, approach, impact, problem, pullQuote, article body). Left `period:` date-range fields alone (e.g. "2021 — Now") since that's a CV formatting convention, not prose voice — flagged this boundary to Adrian. Fixed `02-laliga-fantasy.mdx`: added missing `logoFill: true` (the PNG is a full-bleed dark-bg app icon, was rendering with `object-contain` in a gray box without the flag) — verified via DOM that it now uses the `fill` treatment. Reviewed `09-ald-os.mdx`: consistent with other cards, only change needed was the em-dash cleanup. Moved `fable-one-shot/` out of this repo entirely to `/Users/adrianlunadiaz/ald-projects/fable-one-shot` (sibling dir, per Adrian, it's a separate Fable model test, not portfolio content) — updated the now-stale path in `.claude/launch.json`.
- next: still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2`. Adrian is connecting Notion himself; no commit until he gives the go.

## 2026-07-19 (9) — "Case study coming soon" badge: opt-in, not automatic
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none
- done: badge was showing on every card with `caseStudy: not-ready` (5 cards) — Adrian didn't want it by default everywhere. Added `comingSoon?: boolean` to `Project` type in `lib/content.ts`, changed the condition in `app/components/experience-section.tsx` from `caseStudy === "not-ready"` to `project.comingSoon`. No MDX file sets it yet, so it's off on all cards now. Verified live: `.italic` badge query returns empty across `#experience`.
- next: if Adrian wants the badge back on specific cards, add `comingSoon: true` to that card's frontmatter. Still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2`.

## 2026-07-19 (8) — Verified description width fix across breakpoints
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none
- done: confirmed `experience-section.tsx:142` width change (entry 7) is responsive at 375/768/1024/1440px via DOM bounding-rect checks on all 9 cards — no overflow at any size. The `max-w-[40rem] lg:max-w-[52rem]` cap only activates once the card itself hits its `max-w-[1060px]` ceiling (~1340px+ viewport); below that the text fills the card naturally, so mobile/tablet were never at risk.
- next: still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2`.

## 2026-07-19 (7) — Experience card description: wider text column
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none (screenshot verification blocked by a stuck LoadingScreen overlay in a backgrounded preview tab, verified via DOM bounding-rect measurements instead)
- done: `app/components/experience-section.tsx:142` description `<p>` max-width changed from flat `max-w-[38rem]` to `max-w-[40rem] lg:max-w-[52rem]`. At 1512px viewport (1060px card), text column now 832px wide with a consistent 146px right margin across all 9 cards, no overflow.
- next: still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2`.

## 2026-07-19 (6) — AdOS description: name "LALIGA Digital Ecosystem inventory"
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none (file had been externally edited "commercial team" → "product team" since my last pass; picked up current text before editing)
- done: `content/case-studies/06-ados.mdx` description now opens with "LALIGA Digital Ecosystem inventory, proposals and sponsor requests..." per Adrian's request, still dash-free.
- next: still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2`.

## 2026-07-19 (5) — Applied final dash-free descriptions to all 6 experience cards
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none
- done: wrote Adrian-approved descriptions to `content/case-studies/01-laliga-official-app.mdx`, `02-laliga-fantasy.mdx`, `05-travelie.mdx`, `06-ados.mdx` (also added `impact` row "Reporting time: 10-15 hours/month saved" and reworded "Workflow replaced" to mention multiple Excels + external forms, per Adrian's real numbers), `07-pulse.mdx`, `09-ald-os.mdx`. All dash-free per new standing style rule (`feedback_writing_style_no_em_dash.md`). Verified live in browser via `#experience` DOM text — all render correctly with intended line breaks.
- next: still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2` — commit grouping decision pending from Adrian. Note: other em dashes remain elsewhere in these files (e.g. `06-ados.mdx` achievements/impact rows) — not touched, out of scope for this pass.

## 2026-07-19 (4) — Description alternatives review (no MDX edits applied yet)
- model: claude-sonnet-5
- status: in-progress
- issue: none from my actions, but `content/case-studies/01-laliga-official-app.mdx`, `02-laliga-fantasy.mdx`, `06-ados.mdx` already differ from HEAD in ways not made by me this session (description/logo/highlight/URL) — flagged to Adrian, not overwriting until confirmed.
- done: presented 3 alternative descriptions each for 6 experience cards (LALIGA App, LALIGA Fantasy, AdOS, ald-os, Pulse, Traveliè), sourced from `/Users/adrianlunadiaz/ald-os/ald-system/products/career-hype` CV + interview-answer-bank (Notion DB unreachable this session, not authenticated). Adrian iterated on wording; added standing constraint: no em dashes in his copy, write like him — rewrote all 6 dash-free and saved memory `feedback_writing_style_no_em_dash.md`.
- next: the 6 finalized descriptions are NOT yet written to the MDX files, waiting on Adrian's go. Once confirmed, apply to `content/case-studies/01,02,05,06,07,09-*.mdx`.

## 2026-07-19 (3) — ald-os experience card + line breaks in descriptions
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none (recovered from a mid-session `git stash` mistake that briefly stashed the whole working tree — `git stash pop` restored everything, verified 19 modified/new files intact)
- done: new `content/case-studies/09-ald-os.mdx` (order 3.5, group independent, between Cuatro Jugadores and Pulse) — copy sourced from `/Users/adrianlunadiaz/ald-os/ald-system` README/skills docs, no invented metrics; icon reuses `logo-ald-monogram.svg`. `app/components/experience-section.tsx` description paragraph now has `whitespace-pre-line` so `\n`/`\n\n` in a project's `description` frontmatter renders as real line breaks — verified on LALIGA Fantasy card then reverted that demo content back to original (feature only, no permanent copy change requested).
- next: still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2` — commit grouping decision still pending from Adrian. Adrian may still edit `09-ald-os.mdx` copy per his own note.
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none
- done: new `docs/how-to-manage-articles.md` — single-file guide (matches style of existing `docs/how-to-edit-content.md`) covering add/edit/delete workflow, full frontmatter field reference (including `draft` and `externalUrl` added earlier this session), drafts behavior, and a cheat sheet.
- next: purely documentation, no code/behavior change. Still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2` — commit grouping decision still pending from Adrian.

## 2026-07-19 — Cursor logo take 2 (real brand mark) + hide draft articles
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none
- done: Adrian flagged the Cursor icon still didn't look official — the navbar mark I'd extracted wasn't it. Downloaded Cursor's official brand kit (`cursor.com/brand` → zip), replaced `public/images/stack/cursor.svg` with `General Logos/Cube/SVG/CUBE_25D.svg` (the real shaded 3D cube, matches Adrian's screenshot of the macOS app icon). No `fill` in `stack-section.tsx` (transparent mark, same treatment as Notion/Codex). Separately: `lib/articles.ts` — `getAllArticles()` and `getArticleBySlug()` now filter out `draft: true` articles entirely (was just a visible "Draft" badge before); removed the now-dead Draft-badge JSX in `writing-section.tsx`, `articles/page.tsx`, `articles/[slug]/page.tsx`. Direct URL to a draft article now 404s (extended scope beyond "hide from listing" — flagged to Adrian, reversible if unwanted).
- next: the site's only article (`content/articles/01-ai-agents-as-execution-layer.mdx`) is `draft: true` so Writing section is currently empty on homepage — expected, flip to `draft: false` to publish. All changes still UNCOMMITTED — commit grouping decision still pending from Adrian.

## 2026-07-18 (4) — Fix Cursor logo to the real brand mark
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none
- done: prior `public/images/stack/cursor.svg` was cursor.com's favicon/PWA tile (rounded-square bg), not their actual navbar mark — Adrian flagged it didn't look official. Replaced it by extracting the exact `<path>` from cursor.com's live DOM (their navbar logo svg), rebuilt as a standalone 480×545 viewBox monochrome SVG. Updated `app/components/stack-section.tsx` — Cursor entry no longer `fill: true` (was wrong treatment for a filled tile; correct treatment is the transparent-mark style used by Notion/Codex). Verified pixel-match against cursor.com's live navbar via screenshot.
- next: still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2` — commit grouping decision still pending from Adrian.

## 2026-07-18 (3) — Add Cursor to stack orbit
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none
- done: corrected misread of prior request (was CSS-cursor styling, actually meant the Cursor editor). Reverted the `data-hover` addition on `.stack-chip-inner`. Added "Cursor" to `TOOLS` in `app/components/stack-section.tsx`, outer ring, `fill: true` (its favicon ships its own dark bg). Logo fetched from `cursor.com/favicon.svg` → `public/images/stack/cursor.svg`. Outer ring (now 5 icons: Claude Code, Cursor, Figma, Codex, Warp) re-spaced evenly at 72°. Updated orbit `aria-label`. Verified in browser: loads, no console errors, correct fill treatment.
- next: still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2` — commit grouping decision still pending from Adrian.

## 2026-07-18 (2) — Custom cursor on outer stack ring
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none
- done: `app/components/stack-section.tsx` — added `data-hover` to `.stack-chip-inner` for outer-ring tools only (Claude Code, Figma, Codex, Warp), so the custom cursor ring expands on hover. Inner ring (Notion, Granola, Wispr Flow, Raycast) untouched, as requested. Verified via DOM check in browser.
- next: still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2` — commit grouping decision still pending from Adrian.

## 2026-07-18 — Design-review feedback pass #2 (labels, engineer card, articles, footer email)
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none
- done: `experience-section.tsx` — "Selected Work"→"Experience", "Independent builds"→"Side projects". New `content/case-studies/08-project-engineer.mdx` (group: earlier, order 8, no link, `caseStudy: false`) + new asset `public/images/logo-ald-monogram.svg` for its icon. `lib/articles.ts` — added optional `externalUrl` field; `app/articles/[slug]/page.tsx` renders "Read the original publication" link when set. `footer-section.tsx` — email link now `MailIcon` + text (was text + `ExternalLinkIcon`).
- next: still UNCOMMITTED alongside all prior pending changes on `feat/portfolio-v2` — commit grouping decision still pending from Adrian.

## 2026-07-07 20:00 — Portfolio V2 polish + DynamicIsland CV affordance
- model: claude-opus-4-8
- status: done (uncommitted changes on branch)
- issue: none
- done: CV button in `app/components/dynamic-island.tsx` (both hero+nav states) now reveals a "CV" label on hover; island grows 368→412px via `has-[[data-cv-btn]:hover]` + grid 0fr→1fr label reveal. Icon/link unchanged. Deleted temp `app/preview-island/page.tsx`. Earlier: Raycast in stack, AppIcon `fill`+`logoFill`, cropped `public/images/logo-travelie-appicon.png`, marks padded to 62%.
- next: these polish changes are UNCOMMITTED (last commit 14c6a98). Commit when Adrian gives the go.
- note: dev = `next build && next start` (no HMR), restart preview to see changes; screenshots blank when tab backgrounded — verify layout via compiled CSS/DOM instead.

## 2026-07-07 20:15 — DynamicIsland CV hover label (finalize)
- model: claude-fable-5
- status: done
- issue: none
- done: `app/components/dynamic-island.tsx` — CV button reveals "CV" on hover, island grows 368→412px (`has-[[data-cv-btn]:hover]` + grid 0fr→1fr). Both hero+nav states. Temp `app/preview-island/page.tsx` deleted.
- next: all V2 polish (island + app-icons + Raycast) UNCOMMITTED on `feat/portfolio-v2` (last commit 14c6a98) — commit on Adrian's go.

## 2026-07-07 20:24 — Experience hover preview: skip when no mockup
- model: claude-fable-5
- status: done
- issue: none
- done: `app/components/experience-section.tsx` showPreview() now early-returns when `!project.mockupSrc` (removed logo fallback). Pulse + Traveliè show no floating preview on hover; mockup'd cards unchanged. Verified via real onMouseEnter handlers.
- next: all V2 polish still UNCOMMITTED on `feat/portfolio-v2` (last commit 14c6a98) — commit on Adrian's go.

## 2026-07-17 — Merge main into portfolio-v2 + 2 console error fixes
- model: claude-sonnet-5
- status: done (uncommitted fixes on branch)
- issue: none
- done: committed prior polish work (`ae72ab0`), merged `origin/main` into `feat/portfolio-v2` (`f117bdb`, resolved `package-lock.json` conflict via `npm install`) — brings in README refinements + Vercel Web Analytics. Branch now 2 commits ahead of origin. Fixed 2 bugs found during browser verification: `img src=""` in `app/components/experience-section.tsx:217` (mockup preview), and hydration mismatch on `<html data-theme>` in `app/layout.tsx` (added `suppressHydrationWarning` to `<html>`, was only on `<body>`).
- next: both fixes are UNCOMMITTED — decide whether to fold into `ae72ab0` or commit separately. Then `git push` when ready (fast-forward, no rebase needed).

## 2026-07-17 (2) — Design-review feedback pass on Experience/Writing/Stack
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none
- done: `app/components/experience-section.tsx` + `writing-section.tsx` — arrow icons now use shared `ExternalLinkIcon` (was unicode "→", inconsistent with footer). `content/case-studies/06-ados.mdx` — added `websiteUrl: https://ados-tau.vercel.app/` (card is now an external link). Group headers (`experience-section.tsx` GROUPS) simplified to year-range only. `stack-section.tsx` — Notion/Codex icons bumped 32px→40px to match other tool marks. `app/articles/page.tsx` + `app/case-study/[slug]/page.tsx` — back links now go to `/#writing` / `/#experience` (hash) instead of `/`, so back-navigation restores scroll position. All verified via DOM/computed-style checks in browser (scrollY lands correctly on hash nav).
- next: still UNCOMMITTED alongside the merge fixes from the entry above — same commit decision pending.

## 2026-07-17 (3) — Auto-computed experience years
- model: claude-sonnet-5
- status: done (uncommitted)
- issue: none
- done: `app/components/hero-section.tsx` — "Experience" fact now computed as `new Date().getFullYear() - CAREER_START_YEAR` (2014) instead of hardcoded "10 years". Verified in browser: shows "12 years" for 2026, no console errors (safe in a Server Component, no hydration risk).
- next: still UNCOMMITTED alongside all other pending changes on `feat/portfolio-v2` — commit decision pending.
