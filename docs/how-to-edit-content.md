# Portfolio Content Guide

Everything you need to edit any text, image, or data in the portfolio — in one place.

Each section below has two parts:
- **How to edit** — which file to open and what to change
- **Current content** — the live values right now, so you always have a reference

---

## Table of contents

1. [Hero section](#1-hero-section)
2. [Dynamic Island](#2-dynamic-island)
3. [Footer section](#3-footer-section)
4. [Experience cards (project list)](#4-experience-cards-project-list)
5. [Case study detail pages](#5-case-study-detail-pages)
6. [Assets — images, CV, signature](#6-assets--images-cv-signature)
7. [Quick cheat sheet](#7-quick-cheat-sheet)

---

## 1. Hero section

**File:** `app/components/hero-section.tsx`

This is the landing block: photo, name, bio, location, social icons, current role, and expertise pills.

### Name

```tsx
<h1 ...>
  Adrián
  <br />
  Luna Díaz
</h1>
```

**Current:** `Adrián Luna Díaz`

---

### Bio paragraph

```tsx
<p ...>
  Industrial Engineer turned into Product Manager with 10 years of
  experience creating, launching, and scaling digital products.
</p>
```

**Current:** `Industrial Engineer turned into Product Manager with 10 years of experience creating, launching, and scaling digital products.`

---

### Location

```tsx
<span ...>Madrid, Spain</span>
```

**Current:** `Madrid, Spain`

---

### Social links (hero)

Each link is an `<a>` tag in the contact row. Edit `href` for the URL.

| Icon | Current URL |
|------|-------------|
| Email | `mailto:lunadiazadrian@gmail.com` |
| LinkedIn | `https://linkedin.com/in/adrian-luna-diaz` |
| GitHub | `https://github.com/alunadev` |
| X / Twitter | `https://x.com/adrianlunadiaz` |

---

### Current role card

```tsx
<span ...>Senior Product Manager</span>
<span ...>@ LALIGA</span>
```

The description paragraph below it:
```tsx
<p ...>
  Leading the Official Products portfolio at LALIGA as Senior
  Product Manager, where I shape the product vision, align key
  stakeholders, and prioritize initiatives that enhance the
  experience of millions of fans.
</p>
```

**Current role:** `Senior Product Manager @ LALIGA`
**Current description:** `Leading the Official Products portfolio at LALIGA as Senior Product Manager, where I shape the product vision, align key stakeholders, and prioritize initiatives that enhance the experience of millions of fans.`

The LALIGA logo is set via `<img src="/images/logo-laliga.png" />`.

---

### Expertise pills

Edit the `EXPERTISE_PILLS` array near the top of the file:

```tsx
const EXPERTISE_PILLS = [
  "Product Strategy",
  "AI-First",
  "UX/UI",
  "Monetization",
  "Customer Obsession",
  "Data-driven",
  "SAAS",
  "Product taste",
];
```

**Current pills:** Product Strategy · AI-First · UX/UI · Monetization · Customer Obsession · Data-driven · SAAS · Product taste

To add a pill: append a new string to the array.
To remove a pill: delete its line.
To reorder: rearrange the lines.

---

### Profile photo

```tsx
<img src="/images/Foto-adri-santan.jpg" alt="Adrián Luna Díaz" />
```

**Current file:** `public/images/Foto-adri-santan.jpg`

To change: drop the new photo into `public/images/`, update the `src` path.

---

## 2. Dynamic Island

**File:** `app/components/dynamic-island.tsx`

The floating pill at the bottom of the hero (scroll cue + CV download), which morphs into the nav bar at the top when you scroll past the hero.

### CV download link

Both variants (hero and nav) have a CV download button. Both point to the same file:

```tsx
<a href="/cv/adrian-luna-diaz.pdf" download>
```

**Current file:** `public/cv/adrian-luna-diaz.pdf`

To update the CV: replace the PDF at that path (keep the same filename), or change the `href` in both `<a>` tags if you rename the file.

> There are **two** CV download links in this file — one in the hero variant, one in the nav variant. Update both.

### Email link (nav variant)

```tsx
<a href="mailto:lunadiazadrian@gmail.com">
```

**Current:** `lunadiazadrian@gmail.com`

### Avatar photo (nav variant)

```tsx
<img src="/images/Foto-adri-santan.jpg" alt="Adrián Luna Díaz" />
```

Same file as the hero photo. Updating `public/images/Foto-adri-santan.jpg` updates both.

---

## 3. Footer section

**File:** `app/components/footer-section.tsx` — for layout and email/location text.
**File:** `lib/portfolio-data.ts` — for the social card links.

### Email and location (left column)

```tsx
<p ...>lunadiazadrian@gmail.com</p>
<p ...>Based in Madrid, Spain</p>
```

**Current email:** `lunadiazadrian@gmail.com`
**Current location:** `Based in Madrid, Spain`

### Signature image

```tsx
<img src="/images/firma-adri.JPG" alt="Adrián Luna Díaz signature" />
```

**Current file:** `public/images/firma-adri.JPG`

To update: replace the file at that path or change `src`.

### Social cards

Edit `lib/portfolio-data.ts`:

```ts
export const socialLinks: SocialLink[] = [
  {
    platform: "X",
    handle: "@adrianlunadiaz",
    url: "https://x.com/adrianlunadiaz",
    iconType: "x",
  },
  {
    platform: "LinkedIn",
    handle: "Adrián Luna Díaz",
    url: "https://linkedin.com/in/adrian-luna-diaz",
    iconType: "linkedin",
  },
  {
    platform: "GitHub",
    handle: "alunadev",
    url: "https://github.com/alunadev",
    iconType: "github",
  },
];
```

**Current social handles:**

| Platform | Handle | URL |
|----------|--------|-----|
| X | @adrianlunadiaz | x.com/adrianlunadiaz |
| LinkedIn | Adrián Luna Díaz | linkedin.com/in/adrian-luna-diaz |
| GitHub | alunadev | github.com/alunadev |

The `iconType` field must be one of `"x"`, `"linkedin"`, or `"github"` — these map to the SVG icons in `app/components/icons.tsx`.

---

## 4. Experience cards (project list)

**Files:** `content/case-studies/*.mdx` — one file per project.

The numeric prefix (`01-`, `02-`, etc.) controls the display order on the homepage. To reorder: rename the files and update the `order` field in frontmatter to match.

### Card frontmatter fields

```yaml
---
slug: laliga-official-app        # URL slug — must be unique, no spaces
order: 1                         # Display order (matches filename prefix)
period: "2021 — Now"             # Timeline shown on the card
company: LALIGA Official App     # Card heading
role: Senior Product Manager     # Role subtitle
logoSrc: /images/logo-laliga.png # Company logo (from public/images/)
mockupSrc: /images/mockups/mockup-1-home-duo.PNG  # Mockup image (leave "" for none)
mockupBg: "#F6F6F6"              # Card background color (hex)
description: "Your copy here"    # Short paragraph on the card
achievements:
  - "D7 retention +20%"          # Impact bullets (one per line)
  - "Sessions per user +70%"
website: laliga.com              # External link label
websiteUrl: https://laliga.com   # External link URL
caseStudy: available             # Button state — see below
---
```

### Case study button states

| Value | What appears |
|-------|-------------|
| `available` | Blue "Case Study" button → links to `/case-study/[slug]` |
| `not-ready` | Dimmed button + "Coming soon" tooltip on hover |
| `false` | No case study button; website link takes the full row |

### Current projects

#### 01 — LALIGA Official App
| Field | Value |
|-------|-------|
| slug | `laliga-official-app` |
| period | `2021 — Now` |
| company | `LALIGA Official App` |
| role | `Senior Product Manager` |
| logoSrc | `/images/logo-laliga.png` |
| mockupSrc | `/images/mockups/mockup-1-home-duo.PNG` |
| mockupBg | `#F6F6F6` |
| description | `Led the full redesign of LALIGA's official app, introducing a personalization architecture and AI-generated content at scale.` |
| achievements | `D7 retention +20%, D21 retention +14%` · `Sessions per user +70%` · `260,000+ AI-generated clips per season` |
| website | `laliga.com` |
| caseStudy | `available` |

#### 02 — LALIGA Fantasy
| Field | Value |
|-------|-------|
| slug | `laliga-fantasy` |
| period | `2022 — 2023` |
| company | `LALIGA Fantasy` |
| role | `Senior Product Manager` |
| logoSrc | `/images/logo-laliga.png` |
| mockupSrc | `/images/mockups/ftsy-mockup-leagues-team.png` |
| mockupBg | `#143d69` |
| description | `Designed and launched LALIGA Fantasy's monetization model from zero: a PLG-based freemium tier with premium features that grew revenue by 325% over two seasons.` |
| achievements | `Premium revenue +325% over two seasons` · `ARPU doubled year-over-year` · `Premium purchases from contextual flows equal to 22% of total Fantasy revenue` |
| website | `laliga.com` |
| caseStudy | `not-ready` |

#### 03 — Cuatro Jugadores de Padel
| Field | Value |
|-------|-------|
| slug | `cuatro-jugadores` |
| period | `2021 — Now` |
| company | `Cuatro Jugadores de Padel` |
| role | `Creator & Writer` |
| logoSrc | `/images/logo-cuatrojugadores-appIcon.png` |
| mockupSrc | *(none)* |
| mockupBg | `#f0fdf4` |
| description | `A padel newsletter with 44 published editions, currently paused, with a weekly return planned.` |
| achievements | `44 editions published` · `Four actionable tips per edition` · `Validated archive content now republished on X` |
| website | `cuatrojugadoresdepadel.com` |
| caseStudy | `false` |

#### 04 — Urbiotica
| Field | Value |
|-------|-------|
| slug | `urbiotica` |
| period | `2021` |
| company | `Urbiotica` |
| role | `Product Manager — First PM hire` |
| logoSrc | `/images/logo-urbiotica.png` |
| mockupSrc | `/images/mockups/urbiotica-website-mockup.png` |
| mockupBg | `#f0f9ff` |
| description | `Urbiotica's Smart Parking SaaS platform (B2B) and two mobile apps (B2C).` |
| achievements | `Optimized the IoT sensor onboarding flow based on fieldwork discovery, reducing installation time by 14%` · `Product ops built from scratch` |
| website | `urbiotica.com` |
| caseStudy | `false` |

#### 05 — Traveliè
| Field | Value |
|-------|-------|
| slug | `travelie` |
| period | `2020 — Stand by side project` |
| company | `Traveliè` |
| role | `Co-Founder & CPO` |
| logoSrc | `/images/logo-travelie.png` |
| mockupSrc | *(none)* |
| mockupBg | `#fdf4ff` |
| description | `Built Traveliè as co-founder to connect travelers with non-biased local hidden gems. The process of validating it from scratch (research, discovery, MVP, UX design) led directly to my PM career.` |
| achievements | `Core problem validated with research (86% / 68% insight)` · `Functional prototype shipped aligned with MVP scope` · `The team had the opportunity to pitch the product to investors` |
| website | *(none)* |
| caseStudy | `not-ready` |

### Adding a new project

1. Duplicate any existing `.mdx` file
2. Rename it with the next number prefix: `06-new-project.mdx`
3. Set `order: 6` in frontmatter (must match the filename prefix)
4. Set a unique `slug: new-project`
5. Fill in all card fields
6. Set `caseStudy: false` or `not-ready` to start

The project appears automatically on the homepage — no code changes needed.

---

## 5. Case study detail pages

**Files:** `content/case-studies/*.mdx` — same files as the cards, extra fields below the card fields.

Only needed when `caseStudy: available`. These fields power the `/case-study/[slug]` page.

```yaml
title: "LALIGA Official App"
tags: [Consumer App, AI, Retention, Rebranding]
pullQuote: "The pull quote shown as the hero text on the detail page."
problem: "The problem statement paragraph."
approach:
  - "First thing you did"
  - "Second thing you did"
impact:
  - metric: "D7 retention"
    result: "+20%"
  - metric: "Sessions per user"
    result: "+70%"
tools: [Amplitude, Jira, Figma]
```

### Detail fields reference

| Field | What it does |
|-------|-------------|
| `title` | Page title on the case study detail page |
| `tags` | Pill labels near the top |
| `pullQuote` | Large hero quote (optional) |
| `problem` | Problem statement paragraph |
| `approach` | List of approach bullets |
| `impact` | List of `{ metric, result }` pairs |
| `tools` | Tools/methods list |

### To publish a case study

Change `caseStudy: not-ready` → `caseStudy: available`. The page auto-generates from the detail fields.

### Current case study content

#### LALIGA Official App (`caseStudy: available`)

**Tags:** Consumer App · AI · Retention · Rebranding

**Problem:** The LALIGA app had fragmented UX and generic, non-personalized content. Fan engagement peaked only on matchdays and dropped sharply — D7 retention was low and content consumption was passive. Fans had no reason to return between games.

**Approach:**
- Discovery: user research + Amplitude funnel analysis to identify post-matchday drop-off points
- Full UX redesign with a personalization architecture at its core
- AI integration: WSC Sports API → automated personalized highlight clips in a stories/moments format
- Led digital ecosystem rebranding (App + Web + Fantasy) for full brand coherence
- Coordinated 2 dev squads (18 engineers) + 3 designers
- Led MILIGA loyalty area and LALIGA Live web-app (India & MENA pilot markets)

**Impact:** D7 +20% · D21 +14% · Sessions/user +70% · 260,000+ AI clips/season · Rebranding: App · Web · Fantasy

**Tools:** Amplitude · Jira · Figma · PowerBI · WSC Sports · Google Analytics · Optimizely · Mixpanel

---

#### LALIGA Fantasy (`caseStudy: not-ready`)

**Tags:** Monetization · PLG · Growth · Freemium

**Problem:** LALIGA Fantasy had no sustainable monetization model. The product was entirely free, with no pricing strategy, no premium tier, and no conversion funnel.

**Approach:**
- Designed PLG-based freemium model: free core gameplay + premium features + monthly subscription
- Defined pricing, packaging, and positioning from scratch
- Built contextualized conversion flows triggered at key engagement moments within the app
- Ran iterative A/B tests on paywall copy, pricing tiers, and placement (Optimizely)
- Collaborated with Design, Dev, Growth, and Marketing teams on end-to-end implementation

**Impact:** Premium revenue +325% over two seasons · ARPU doubled YoY · Premium purchases from contextual flows equal to 22% of total Fantasy revenue

**Tools:** Optimizely · Amplitude · Figma · Jira · Google Optimize

---

#### Traveliè (`caseStudy: not-ready`)

**Tags:** 0-to-1 · Consumer App · Discovery · Startup

**Pull quote:** "Building Traveliè is how I became a Product Manager. As a traveler, I was frustrated missing the hidden gems only locals know. That frustration became a product. And the process of validating it from scratch — research, discovery, MVP, UX design — showed me where I truly wanted to be."

**Problem:** 86% of travelers feel they miss interesting places on trips. 68% feel they've missed nearby spots they would have loved. Travel apps surface popular, overrated destinations — not the places that make a trip unforgettable.

**Approach:**
- Market validation: surveys + qualitative interviews to size and confirm the problem
- Product strategy and roadmap from zero to functional prototype
- Full UX/UI design in Figma — no dedicated designer on the team
- Business model, SWOT analysis, competitive positioning map
- Social channel testing: SEMrush + Google Search Console

**Impact:** Core problem validated (86%/68% insight) · Prototype shipped aligned with MVP scope · Led directly to formal PM transition

**Tools:** Figma · Jira · Notion · SEMrush · Google Search Console

---

## 6. Assets — images, CV, signature

All static assets are served from the `public/` directory. The path in your code always starts from `public/` — so `public/images/logo-laliga.png` is referenced as `/images/logo-laliga.png`.

> **Important (Next.js rule):** After adding any new file to `public/`, you must commit and push it to git. Files not committed won't appear in production, even if they work locally.

### Current assets

```
public/
├── cv/
│   └── adrian-luna-diaz.pdf          # CV download (linked from Dynamic Island)
└── images/
    ├── Foto-adri-santan.jpg          # Profile photo (hero + dynamic island nav)
    ├── firma-adri.JPG                # Handwritten signature (footer)
    ├── logo-laliga.png               # LALIGA logo (used by 2 projects)
    ├── logo-cuatrojugadores-appIcon.png
    ├── logo-urbiotica.png
    ├── logo-travelie.png
    └── mockups/
        ├── mockup-1-home-duo.PNG     # LALIGA Official App card
        ├── ftsy-mockup-leagues-team.png  # LALIGA Fantasy card
        └── urbiotica-website-mockup.png  # Urbiotica card
```

### How to update the CV

1. Export your updated CV as PDF
2. Replace `public/cv/adrian-luna-diaz.pdf` with the new file (keep the same filename)
3. Commit and push — Vercel will redeploy automatically

### How to update the profile photo

1. Drop the new photo into `public/images/`
2. Update the `src` in:
   - `app/components/hero-section.tsx`
   - `app/components/dynamic-island.tsx` (nav variant)
3. Commit and push

### How to add a new logo or mockup

1. Drop the file into `public/images/` (logos) or `public/images/mockups/` (mockups)
2. Reference it in the MDX frontmatter: `logoSrc: /images/logo-name.png`
3. Commit and push

---

## 7. Quick cheat sheet

| I want to… | I edit… |
|------------|---------|
| Change my name or bio | `app/components/hero-section.tsx` |
| Change my current role or company | `app/components/hero-section.tsx` |
| Add or remove an expertise pill | `EXPERTISE_PILLS` array in `hero-section.tsx` |
| Update my profile photo | Replace `public/images/Foto-adri-santan.jpg`, commit |
| Update my CV | Replace `public/cv/adrian-luna-diaz.pdf`, commit |
| Change the CV download link path | Both `<a href>` tags in `dynamic-island.tsx` |
| Update footer social handles or URLs | `lib/portfolio-data.ts` |
| Update footer email or location | `app/components/footer-section.tsx` |
| Update the signature image | Replace `public/images/firma-adri.JPG`, commit |
| Change a project card (copy, color, mockup) | The project's `.mdx` file in `content/case-studies/` |
| Reorder cards on the homepage | Rename `.mdx` files (swap number prefixes) + update `order` field |
| Publish a case study | Change `caseStudy: not-ready` → `caseStudy: available` in the `.mdx` file |
| Edit case study detail content | Update `problem`, `approach`, `impact`, `tools` in the `.mdx` file |
| Add a new project | Duplicate a `.mdx` file, rename with next number, fill all fields |
| Add a new logo or mockup image | Drop in `public/images/`, reference in `.mdx` frontmatter, commit |

