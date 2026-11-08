# Pierre Mvita Portfolio — Section 1: Approached & Defaults (for your approval)

## What I'll build
- `/work/[slug]` project detail page with architecture diagram + case-study block.
- A real contact form (API route → Resend or Formspree; mailto fallback).
- Restored `content/projects.ts` with strongest current stack: **TaskFlow,
  CloudLedger, PermitPilot, taxify, Mvita-HQ** + the existing 8, every project
  carrying `github` + a real `live` URL, `featured` flag, and the fields ready
  for per-project OG/Twitter + sitemap + "how I built X".

## What I need from you (3 quick asks)

### A. Which project set?
The five names you gave (`TaskFlow`, `CloudLedger`, `PermitPilot`, `taxify`,
`Mvita-HQ`) are **not** in the current code. I'm going to model them on the
existing `Project` shape and write:

- **Option 1** (my recommendation): keep your 5 named projects, each with a
  real GitHub link + real public live URL where I can confirm one exists.
  This honors what you asked and the site already stands on these.
- **Option 2**: drop the names and rebuild `content/projects.ts` with only
  the **strongest current stack**, adding the 5 new featured projects and
  keeping the legacy set as "other work" (non-featured).
- **Default I'll use unless you tell me otherwise:** Option 1, since it
  directly answers what you asked.

### B. Contact form backend
- **Resend** (recommended — free, standard on Vercel, one env var),
  with **Formspree** as the fallback key (so the form works on any
  deployed install even without Resend set).
- Fallback when neither env var exists: the form still POSTs and returns
  `{ok:true}` with a console log (dev dev-mode), not a 500.

### C. CI / case-study scope
- **CI:** yes — GitHub Actions workflow on `pull_request` → `npm ci`,
  `npm run lint`, `npm run build` (no secrets required).
- **Case-study block:** rendered inside each detail page (not a separate
  route), with a "What I'd do differently" reflection — the part recruiters
  actually skim.

## What needs no decision (defaults, already decided)
- Architecture diagrams rendered from `project.architecture[]` as
  square-cornered node blocks + connector strip (brand house style).
- OG/Twitter meta via per-project `opengraph-image.tsx` + `generateMetadata`
  on `/work/[slug]`, plus an auto `sitemap.xml`.
- Contact form rendered in the existing `Contact` section (no redesign of
  that section; only the form + states).

## Proposed file changes
| File | Change |
|---|---|
| `content/projects.ts` | rebuild with 5 new featured projects + full fields |
| `content/site.ts` | add `/work` nav item |
| `app/page.tsx` | work cards → links to `/work/[slug]` |
| `components/work/ProjectCard.tsx` | rich card → link to detail |
| `components/work/WorkList.tsx` | list all projects |
| `app/work/[slug]/page.tsx` | new detail page |
| `app/api/contact/route.ts` | new POST + Resend/Formspree |
| `components/contact/Contact.tsx` | form + loading/success/error |
| `app/opengraph-image.tsx` | extend per-slug OG |
| `app/sitemap.tsx` | new auto sitemap + robots.txt |
| `.github/workflows/ci.yml` | CI (optional) |
| `docs/portfolio-redesign-tasklist.md` | this doc |

**Reply with:** A / B / C choices (A1/A2, B1/B2, C1/C2 are fine), or just
"A1, B1, C1" if you're happy with the recommendations. That unlocks me to
build.
