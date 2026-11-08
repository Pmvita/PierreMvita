# Pierre Mvita Portfolio — Project Detail Pages + Case Studies Design

> Build on 2026-11-05. Extends the existing single-page portfolio.
> Hook: how to make the site look designed, not AI, while adding new
> routes and content models.

## Intent & why

The site is a single page of cards. Recruiters and future clients need to
**skim a product, open a case, and trust the build** — not dig through a
one-page carousel. The ask adds:

1. `/work/[slug]` project detail pages with real architecture diagrams.
2. A real contact form (API route + Resend/Formspree), not mailto-only.
3. A refreshed, strongest-stack `content/projects.ts` (TaskFlow, CloudLedger,
   PermitPilot, taxify, Mvita-HQ) with live links on every project.
4. Per-project OG/Twitter meta, a sitemap, and a "how I built X" case-study
   section.
5. Optional GitHub Actions CI (lint + next build on PR).

All new UI keeps the brand house style: one ground/ink/accent palette,
square-cornered "paper" surfaces, no gradients, no glass, no icons as
decoration, one typeface + one mono.

## Goals, non-goals, anti-goals

- **Goal:** every project has a skimmable detail page + live link; contact
  form actually posts; per-project SEO surfaces; CI gates the branch.
- **Non-goal:** new npm packages except an email client. No new design
  system beyond the existing brand suite.
- **Anti-goal:** mailto-only contact; one-page-only architecture; invented
  live projects; Lighthouse-only claiming without a build/tsc gate.

## Palette / type / composition

- Kept as-is (`globals.css`): one ground `#070705`, ink `#f4f0e6`,
  accent `#d4af5a`, square-cornered paper surfaces, paper-stripe section
  separators, one typeface (Instrument Serif) + one mono (Geist Mono).
- New: per-design `<caption>` rule and a small status/accent mark for the
  "how I built" section. All component classes reference existing tokens.

## Design decisions (the "how")

### 1. Projects content model
`content/projects.ts` is rewritten in place (type preserved, values replaced).
Each project carries:
- `slug` (URL-safe, stable), `index`, `title`, `year`, `kicker`,
- `outcome` (one–two sentence front-line), `stack` (full list),
- `architecture` (ordered diagram nodes),
- `github` (required), `live` (required where the site ships a real URL),
- `featured: boolean` (only the strongest-current-stack entries are
  `featured: true`; old entries marked non-featured so the WorkList still
  shows the legacy set), `added: string` (release date human-readable).
- A `caseStudy` object on each project: `title`, `bullets[]`, `reflection`.
  The case-study text is the user's own emails/descriptions, rewritten in
  the first person consistently.

### 2. Project detail page `/work/[slug]`
- `app/work/[slug]/page.tsx` (server component, dynamic route).
- Loads the project, verifies it exists, else returns a real 404
  (Next.js `notFound()`).
- Renders: head meta (title/description/OG/Twitter), layout with a
  back link and breadcrumb, the above-the-fold summary, the stack list,
  the architecture diagram, then a "How I built X" case-study block and
  an "Open project" links block.
- **Architecture diagram** (the brand spine): square-cornered node blocks
  connected by a connector strip driven by `project.architecture[]`.
  No icons, no gradients, no decorative shapes. Each node renders with the
  project's own label, in order, with a live-collector arrow between nodes.
- States: loading (default SSR), empty (404), a `caseStudy` toggle to
  expand/collapse the "how I built" section, keyboard focus rings.

### 3. Contact form
- `/api/contact/route.ts` POST handler.
  - If `RESEND_API_KEY` is set, send via Resend.
  - Else if `FORMSPREE_API_KEY` is set, POST to Formspree.
  - Else return a plain `200` with `{ok:true}` and log to console (dev
    fallback so the form doesn't 500 on a clean `vercel dev` install).
- `/api/contact/route.ts` validates `{name, email, message}`, coerces
  types, and rate-limits a bare in-memory `Map` with a 60s/10-requests
  limit (dev-sufficient; doesn't claim production-grade).
- `components/contact/Contact.tsx` becomes a form with
  `isSubmitting` / `error` / `success` states, real inputs, `required`
  fields, `aria-describedby` for error text, and a plain `mailto:` backup.
- No third-party UI; client state from `useState` only.

### 4. Per-project SEO + sitemap
- `app/[slug]/opengraph-image.tsx` (new): per-project static OG image —
  colored square with monogram + project title (works with the existing
  `next/og` ImageResponse, no new deps). Named per project.
- `app/sitemap.tsx` (new): auto-generates `sitemap.xml` from
  `site.nav` and `projects`, with `title`, `url` and `lastModified`
  per entry.
- OG/Twitter meta per project: `/work/[slug]/page.tsx` sets
  `generateMetadata` from the project + `site`, and `opengraph-image.tsx`
  is referenced as `images` in `layout.tsx` metadata.
- `app/sitemap.tsx` also exposes a `robots` route (`/robots.txt`) so
  crawlers are told to index.

### 5. "How I built X" case-study block
- Rendered inside each project detail page, not a separate route (keeps
  the site one-second-active for recruiters).
- Contains: the original project lead-in, the real build bullets (the
  user's own), a "what I'd do differently" reflection, and the stack/link
  block. Toggles open/close on click.

### 6. Work list pages
- `/work` lists all `projects` as cards (with the case-study TK).
- `/work/[slug]` is the detail page. Cards link to the detail, not to the
  github repo as the primary CTA (the detail is the product; github is a
  secondary, final CTA).
- Outer links `target="_blank" rel="noreferrer"`.

### 7. CI (optional)
- `.github/workflows/ci.yml`: on `pull_request` → `npm ci`, `npm run lint`,
  `npm run build`. No secrets required. Runs on `ubuntu-latest`, Node 20.

## Verification (gate)
- `npm run build` → exit 0 (the shipped artifact gate).
- `npx tsc --noEmit` → pass.
- `npm audit` → no critical.
- Manual route checks via dev server: `/work`, `/work/logwatch`,
  `/work/[slug]`, `/work/nonexistent`, `/api/contact`, `/sitemap.xml`,
  `/api/contact` with and without env vars, `/robots.txt`.
- Screenshots at 1440/768/390 for the detail page and contact form.

## Files changed / new
| File | Action | Why |
|---|---|---|
| `content/projects.ts` | rewrite | strongest stack, live links, new fields |
| `content/site.ts` | update | nav + live links |
| `app/page.tsx` | edit | work cards → links to detail |
| `app/work/[slug]/page.tsx` | new | detail page + diagram + case study |
| `components/work/ProjectCard.tsx` | rewrite | rich card → link to detail |
| `components/work/WorkList.tsx` | edit | list all projects |
| `components/contact/Contact.tsx` | rewrite | form with states |
| `app/api/contact/route.ts` | new | Resend/Formspree |
| `app/opengraph-image.tsx` | extend | per-slug OG |
| `app/sitemap.tsx` | new | auto sitemap |
| `app/robots.txt` | new | robots |
| `app/layout.tsx` | edit | nav + per-project OG |
| `.github/workflows/ci.yml` | new | optional CI |
