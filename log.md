# Session Log

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
