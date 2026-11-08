# Pierre Mvita Portfolio — Brushed Steel / Blueprint Brand Overhaul

> Write up: 2026-11-08. Approach chosen: **B (brushed steel / blueprint, industrial)** from the three brainstormed directions.

## Intent & why

The current site (post-`253ebe5` "Redesign portfolio to a designed dark editorial brand (anti-AI)") is a dark navy-black canvas with a warm amber/gold accent, Fraunces + JetBrains Mono + Inter, and a subtle starfield of three.js points. The user sees it as "black and gold" — a generic, crowded look shared by many AI-generated portfolios — and wants a complete rethink: a more creative, unique identity, a changed text font, and genuinely creative 3D elements, while keeping the site a fast, skimmable, one-second-active portfolio for a cloud engineer in Toronto.

Approach B was selected over Approach A (warm paper editorial) and Approach C (neon-noir) because:
- It is **not** black-and-gold; it is deep charcoal/slate with a **brass/copper** accent — a pairing few portfolios use.
- It is **technically on-brand**: infrastructure is industrial/steel/grid, and the isometric wireframe 3D literally reads as "systems" to the right viewer.
- It leaves the warm, approachable content alone (labels, case studies, resume) while the chrome and 3D do the expressive work.

## Goals, non-goals, anti-goals

- **Goal:** a distinctive, non-generic brand suite (palette, type, 3D, component language) that translates cleanly to responsive screens and the `/work/[slug]` pages that will come later.
- **Goal:** the 3D system is a visible but non-intrusive backdrop — parallax, mouse-tracking geometry, depth layers — that rewards interaction without hurting Lighthouse or accessibility.
- **Non-goal:** a complete design system overhaul of components beyond color/type/3D. Layout, spacing, and existing component structure stay as-is.
- **Non-goal:** motion for its own sake; all animation must serve readability and feedback.
- **Anti-goal:** a site that fails `npm run build` or `npx tsc --noEmit`; 3D that breaks on `prefers-reduced-motion`; text that is illegible at any viewport.

## Constraints

- Next.js 16 (app router), Tailwind v4 (`@theme inline` design tokens), TypeScript, React 19, framer-motion for UI, three.js 0.167.1 for the 3D backdrop.
- The monogram "PM" and the brushed-steel mark should remain the brand signature.
- Text must pass a contrast check against whatever ground it sits on.
- `prefers-reduced-motion: reduce` must disable 3D animation (original-scene fallback).
- Fonts come from Google Fonts via `next/font/google` (self-hosted, no layout shift).
- No new npm packages beyond the existing list (three, framer-motion, lucide-react).

## Approaches (decided)

| Approach | Result |
|---|---|
| A — Warm paper / film grain editorial | Rejected: artisanal, doesn't match the cloud-engineer persona, reads as a generic agency look |
| **B — Brushed steel / blueprint, industrial** | **Selected** — copper-on-charcoal, blueprint grid, isometric wireframe 3D |
| C — Neon-noir | Rejected: polarizing, high energy, competes with content hierarchy |

## Type (decided)

One display face + one mono face, chosen for character (not the Fraunces/JetBrains default):

- **Display headline: `"Bodoni Moda"`** (Google Fonts) — high-contrast Didone serif, very editorial but disciplined; 400/500/600/700.
- **Mono: `"Space Mono"`** — wide, technical, reads as "infrastructure"; 400/500/600/700. Used for labels, code snippets, the monogram, and the `mark-mark`.
- **Body: `"Satoshi"`** — clean humanist sans, highly legible at small sizes; 400/500/600. Replaces Inter (the default AI-body) and gives a warmer, more considered look.

Type scale (CSS variables in `globals.css`):
- Display: `clamp(2.5rem, 6vw, 5rem)`
- Supporting: `clamp(1.75rem, 3vw, 2.75rem)`
- Body: `16px`, line-height `1.6`
- Label/eyebrow: `11px`, `0.18em` tracking, uppercase, monospace

## Palette (decided)

One ground, one ink, one accent, plus reserved shades for metal, grid, and depth. All tokens live in `globals.css` under `@theme inline` so Tailwind and the components can use them.

```
--color-canvas:    #0c0c10   /* near-black steel, not pure #070705 */
--color-canvas-2:  #100f14   /* slightly lighter steel for panels */
--color-elevated:  #16141a   /* raised paper / panel surface */
--color-ink:       #e8e2d4   /* warm off-white text */
--color-paragraph: #8a867c   /* secondary/muted */
--color-accent:    #c9a227   /* antique brass — the single accent */
--color-accent-bright:#e8c96a /* brass highlight */
--color-line:      #23201b   /* hairline rules */
--color-line-strong:#332e24  /* heavier rules */
--color-metal:     #b8a88a   /* tarnished brass midtone */
--color-metal-bright:#d4b88a /* polished brass */
--color-steel:     #6b7280   /* blueprint/steel slate */
--color-steel-light:#9aa6b2  /* blueprint lines on panels */
--color-grid-base: #0e0d11   /* blueprint grid seam */
--color-grid-sub:  rgba(232,226,212,0.08)  /* faint grid lines */
```

Rules:
- Accent is only used for text, buttons, and the strongest highlights — never to paint large areas.
- The ground is never pure black; it reads as deep steel.
- Hairline rules use `line` not `line-strong`; borders stay hairline.

## 3D system (decided)

Replace the single starfield with **four layered depth layers** under one `Scene` provider, all three.js 0.167.1, rendered to a fixed-fullcanvas behind `.site-content`.

1. **Background grid plane** — a large, very low-opacity isometric/hexagonal grid that fades in near the hero. Gives the "blueprint" reference.
2. **Isometric wireframe models** — one or two low-poly ISO objects (an isometric cube/box, or a torus-knot) in brass, gently rotating, sized so they sit "in front of" the grid but behind content.
3. **Floating brass particles** — a small field of lit points with a subtle trailing/lerped motion, slower and sparser than the old starfield.
4. **Mesh surface layer** — a faint, semi-transparent iso-mesh "cloud" (a large soft shape, low poly) that adds atmosphere.

Interaction:
- **Cursor x/y** → rotates the iso models and skews the grid slightly (point-following).
- **Scroll** → camera/layer lift; near the hero the grid "turns on" (brightens) and the material lifts toward the viewer.
- **Scrub** (hero in-place scroll) → drives layer opacity/lift, so the scene "breathes" as the user scrubs.
- All motion is lerped to 60fps and all rotations are clamped.
- `prefers-reduced-motion: reduce` → skip the whole 3D; render a static brass-colored gradient instead.

Constraints: wire count kept low for 60fps (< 600 triangles total in the scene), point size small, `depthWrite: false`, `powerPreference: high-performance`, `alpha: true` canvas, clear color transparent.

## Component language (decided)

The content components keep their existing structure and class names. The changes are styling only:

- **Surfaces:** corners stay square (not rounded), but the `border` becomes a hairline steel line; elevated panels use `bg-elevated` (slightly lighter steel), not glass, and never a backdrop blur that fights the 3D. A very subtle inner-shadow (via `box-shadow: 0 1px 0 rgba(0,0,0,0.45) inset`) gives "printed steel" depth at rest.
- **Separators:** replace the "paper stripe" with a hairline steel rule + a thin brass hairline. The edge of the page gets a 1px `line-strong` top rule.
- **Typography hierarchy:** eyebrow (mono, uppercase, brass), display heading (Bodoni Moda), body (Satoshi).
- **Buttons/links:** brass background on hover; active state is a deeper shade + slight scale; focus-visible rings in brass.
- **Mark:** the "PM" monogram becomes a brushed-steel mark: `1px` brass top-left border, brass fill, mono text.
- **Kicker/labels:** mono, uppercase, `color-muted` (steel).
- **Code snippets:** `bg-elevated`, mono, `color-paragraph`, thin brass left border.

## Files changed / new

All changes go through `globals.css`, `next.config.ts` (if needed), and the component files.

| File | Change | Why |
|---|---|---|
| `app/globals.css` | **replace** | Palette, type, tokens, utilities, 3D container |
| `app/layout.tsx` | edit | New fonts (Bodoni Moda, Space Mono, Satoshi) |
| `components/scene/Scene.tsx` | rewrite | Four-layer 3D system |
| `components/scene/WebGLBackdrop.tsx` | rewrite | Full scene graph + interaction + reduced-motion |
| `components/nav/SiteNav.tsx` | edit | Steel type tokens, brass focus, square rule |
| `components/hero/Hero.tsx` | edit | Updated type hierarchy, brass buttons |
| `components/work/ProjectCard.tsx` | edit | Steel surfaces, brass accents |
| `components/work/WorkList.tsx` | edit | Steel headings |
| `components/skills/Capabilities.tsx` | edit | Steel surfaces, brass code slice |
| `components/experience/Timeline.tsx` | edit | Steel timeline, brass dots |
| `components/contact/Contact.tsx` | edit | Steel form, brass submit, square controls |
| `components/contact/brand/HeroDoc.tsx` | edit | Steel surfaces |
| `lib/cn.ts` | no change | Utility stays |
| `components/layout/ScrubProvider.tsx` | no change | No behaviour change |

No new npm packages. Google Fonts added: Bodoni Moda, Space Mono, Satoshi.

## Verification (gate)

- `npm run build` → exit 0
- `npx tsc --noEmit` → pass
- `npm audit` → no critical
- Manual: dev server, key viewports (1440 / 768 / 390), `prefers-reduced-motion` toggle in DevTools, page with JS off (canvas should be a static fallback)
- Visual: hero, work grid, capabilities, timeline, contact form, nav at rest and on hover

## What's left to the builder

Everything above is decided. The builder may make the small choices that don't change the look: exact cube size, particle count, which iso object shape reads best, stroke widths. Nothing here requires asking the user.
