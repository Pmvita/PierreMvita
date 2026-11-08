# Brushed Steel / Blueprint Brand Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the black-and-gold editorial brand with a brushed-steel / blueprint industrial identity — new steel palette + type face (Bodoni Moda / Space Mono / Satoshi), a four-layer interactive 3D scene, and steel-styled components — while keeping the site's content, routes, and structure intact.

**Architecture:** A design-token layer in `globals.css` (`@theme inline` + `:root`) supplies palette, type, and utilities. `app/layout.tsx` loads the three Google Fonts. `components/scene/Scene.tsx` composites four three.js layers (background grid, isometric wireframes, brass particles, atmosphere mesh) behind `.site-content`, with cursor-scroll-scrub interaction and a reduced-motion fallback. The remaining components (`SiteNav`, `Hero`, `ProjectCard`, `WorkList`, `Capabilities`, `Timeline`, `Contact`, `HeroDoc`) are styled purely against the new tokens — structure and content unchanged.

**Tech Stack:** Next.js 16 (app router), Tailwind v4 (`@theme inline`), TypeScript, React 19, three.js 0.167.1, framer-motion, lucide-react.

**Spec:** `docs/superpowers/specs/2026-11-08-brand-overhaul-b-design.md`

---

## Global Constraints

- Fonts via `next/font/google` (Bodoni Moda, Space Mono, Satoshi); self-hosted, `display: swap`.
- No new npm packages (three, framer-motion, lucide-react only).
- `prefers-reduced-motion: reduce` disables all 3D animation (static fallback only).
- 3D: kept under ~600 triangles, `depthWrite: false`, `alpha: true`, transparent clear color, pixel ratio clamped to 1.75.
- Accent is the single high-contrast color; used for text, buttons, and strongest highlights only — never large areas.
- Hairline rules use `line` token; `line-strong` only for heavier rules.
- Components keep their existing class names and structure; only token values change.
- Contrast check: text respects `--color-ink` on `--color-canvas`/`--color-elevated`; `--color-paragraph` on `--color-elevated`.
- Verify: `npm run build` exit 0, `npx tsc --noEmit` pass, `npm audit` no critical.

---

## Review Focus

- **Reduced-motion:** when `prefers-reduced-motion` matches, 3D must not animate and must not leak memory (static fallback rendered, renderer cleaned up).
- **Reduced motion during fast scroll:** scrub input is debounced so the scene can't fight the 60fps renderer.
- **Text contrast at rest and on hover** across every surface (`canvas`, `elevated`).
- **3D performance:** scene must not exceed 60fps on a baseline laptop (probe frame rate before/after).

---

## Task 1: Fonts + global tokens + utilities

**Files:**
- Modify: `app/layout.tsx` (new font instances)
- Replace: `app/globals.css` (palette, type scale, tokens, utilities)

**Interfaces:**
- Font variables: `--font-display` (Bodoni Moda), `--font-mono` (Space Mono), `--font-body` (Satoshi), all via `next/font/google`.
- CSS tokens under `@theme inline` and `:root` — exact values in spec §Type/Palette.
- Reuse: nothing (foundation).

**Steps:**
- [ ] Step 1: Add Google Font imports to `app/layout.tsx` — `Bodoni Moda` (weights 400/500/600/700, italic), `Space Mono` (400/500/600/700), `Satoshi` (400/500/600).
- [ ] Step 2: Replace `app/globals.css` — new palette, type scale, tokens, utilities; the 3D canvas container class `.scene-container` added; the `.paper-stripe` separator simplified to a hairline steel rule.
- [ ] Step 3: Update `app/opengraph-image.tsx` to use the new dark steel ground and brass accent (keep the same layout structure).
- [ ] Step 4: Run `npm run build` → confirm exit 0.

---

## Task 2: 3D scene system (four layered depth)

**Files:**
- Modify: `components/scene/Scene.tsx` (compositor)
- Replace: `components/scene/WebGLBackdrop.tsx` (full scene graph + interaction)

**Interfaces:**
- `Scene.tsx`: `export function Scene()` returns `<WebGLBackdrop scrub={scrub} />`, reads `useScrubContext()`.
- `WebGLBackdrop.tsx`: `export function WebGLBackdrop({ scrub = 0 }: { scrub?: number })` — takes a scrub value 0..1.
- Layer construction order (back → front): (1) background grid plane, (2) isometric brass wireframe model(s), (3) floating brass particles, (4) atmosphere mesh. All added to one `THREE.Scene`.
- Interaction: cursor x/y → model rotation + grid skew; scroll → camera lerp + near-hero grid brightening; scrub → layer opacity/lift lerp.
- Reduced-motion: `window.matchMedia("(prefers-reduced-motion: reduce)")` → skip animation loop, render a static brass-tinted gradient, return cleanup that disposes nothing but avoids leaks.
- Particulate type for interaction values: `scrub: number` (0..1), `cursor: { x: number; y: number }`, `scroll: number` (0..1, page scroll normalized).

**Steps:**
- [ ] Step 1: Rewrite `components/scene/WebGLBackdrop.tsx` — four layer builds, interaction loop, reduced-motion branch, cleanup.
- [ ] Step 2: Simplify `components/scene/Scene.tsx` to compose (`<WebGLBackdrop scrub={scrub} />`).
- [ ] Step 3: Verify the scene renders on `/` and the 3D does not animate under `prefers-reduced-motion` (toggle in DevTools).

---

## Task 3: SiteNav — steel steering

**Files:** `components/nav/SiteNav.tsx`

**Interfaces:** consumes nothing new; uses existing `--color-` tokens.

**Steps:**
- [ ] Step 1: Update `SiteNav.tsx` — replace ink on canvas nav: header uses `bg-canvas/60` with `backdrop-blur-xl`; links use `--color-ink`/`--color-muted`/`--color-ink` on hover via tokens; active link uses `--color-accent`; menu icon uses `--color-ink`; resume link uses brass.
- [ ] Step 2: Verify nav transitions cleanly between hero (scrub 0) and work sections.

---

## Task 4: Hero — type hierarchy + brass buttons

**Files:** `components/hero/Hero.tsx`

**Interfaces:** consumes nothing new; updated type classes only.

**Steps:**
- [ ] Step 1: Update `Hero.tsx` — name line uses mono uppercase + brass; "Mvita" uses display; role/summary use body; buttons use brass background on hover + `transition`; the "View selected work" anchor is brass text; the resume anchor is a hairline-border brass-on-hover button.
- [ ] Step 2: Verify hero reads at 1440 / 768 / 390 with the new type scale.

---

## Task 5: WorkList + ProjectCard — steel surfaces

**Files:** `components/work/ProjectCard.tsx`, `components/work/WorkList.tsx`

**Interfaces:** `ProjectCard` receives `{ project: Project }`; `WorkList` maps `projects` from `@/content/projects`.

**Steps:**
- [ ] Step 1: Update `ProjectCard.tsx` — `doc-paper` → steel surface (`bg-elevated`, hairline `border-line`, inner-shadow at rest), kicker is mono uppercase muted, title is display, "GitHub" is brass text-on-hover, year/index is mono uppercase muted, architecture stack is brass dots, architecture/body is `--color-paragraph`.
- [ ] Step 2: Update `WorkList.tsx` — heading eyebrow mono uppercase muted, title is display; keep 2-column grid.
- [ ] Step 3: Verify the work grid reads at 1440 / 768 / 390.

---

## Task 6: Capabilities — steel lanes + brass code slice

**Files:** `components/skills/Capabilities.tsx`

**Steps:**
- [ ] Step 1: Update `Capabilities.tsx` — card surfaces are `bg-elevated` with hairline border, brass accent for lane item bullets, code slice is `bg-elevated` with brass left border.
- [ ] Step 2: Verify lane cards at 1440 / 768 / 390.

---

## Task 7: Timeline — steel chronology

**Files:** `components/experience/Timeline.tsx`

**Steps:**
- [ ] Step 1: Update `Timeline.tsx` — item connector is `bg-line-strong`, selected dot is brass, period mono uppercase muted, title is display, company/location/summary are `--color-paragraph` + `--color-ink`, "Details" label is brass, dialog surface is `bg-elevated`.
- [ ] Step 2: Verify the timeline and the open-details dialog at 1440 / 768 / 390.

---

## Task 8: Contact — steel form + brass submit

**Files:** `components/contact/Contact.tsx`

**Steps:**
- [ ] Step 1: Update `Contact.tsx` — form card `bg-elevated` with hairline border, labels mono uppercase muted, inputs `bg-elevated` with hairline border + brass focus ring, submit is brass background on hover, success state uses brass check, social links use `--color-paragraph` + brass on hover.
- [ ] Step 2: Verify form submit flow (fill, submit, success state) at 1440 / 768 / 390.

---

## Task 9: HeroDoc + remaining chrome

**Files:** `components/contact/brand/HeroDoc.tsx`

**Steps:**
- [ ] Step 1: Update `HeroDoc.tsx` — each row surface is `bg-elevated` with hairline border, label mono uppercase muted, values use `--color-paragraph` + `--color-ink`.
- [ ] Step 2: Verify all sections render in order on `/` (scene → home → work → capabilities → experience → contact), with the header pinned and scrolling.

---

## Execution handoff

After saving this plan, link it for the human partner to read. The user has already approved the design doc; they will pick an execution approach (native in-session vs subagent-driven). Plan complete and saved to `docs/superpowers/plans/2026-11-08-brand-overhaul-b-plan.md`.
