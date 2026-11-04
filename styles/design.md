# Pierre Mvita — Portfolio Redesign

> Art direction for the personal dev site. Goal: replace a generic
> "AI-looking" dark portfolio with a designed, editorial-but-clever dark UI
> that reads as a deliberate brand, not a template.

## Intent & why

The site currently reads as a layout of components generic to AI-generated
portfolios: stacked mono labels, pill badges, gradient "chrome" buttons,
a soft gradient, the same shape on every section. It looks designed but not
like *this person*. The fix is not more ornament — it is stronger decisions:

1. **The idea comes from the subject.** Pierre's brand is "order from
   confusion" — he ships verbatim from diagrams, templates, and IDs.
   Every section should carry that through: architectural, typed, with a
   real diagrammatic spine and a monospace ledger, not abstract blobs.
2. **A house style without ornaments.** Flats, square corners (full-bleed
   square-driver motif), real photography/archival finds, one typeface,
   no gradients, no glass, no shadows on the rest, one accent.
3. **Substance.** Type set larger, one dominant image per screen, full
   content in every section, something the visitor can actually *do*.

## Palette (one ground, one ink, one accent)

- Ground `#070705` (canvas) — kept.
- Elevated `#0e0d0a` — the new "card" surface.
- Ink `#f4f0e6` — running text.
- Muted `#8a8578` — secondary notes.
- Paragraph `#6e6a5f` — smaller captions / intros. Never soft grey.
- **Accent (real ink, not a pink/amber gradient):** amber `#d4af5a`.
  Used only on the action and one other place (the numbered "issue" marker).
- Line `#1b1915` — hairline replaced by a paper-stitch (double-rule).
- No gradients anywhere except a real photograph or a required scrim.

## Type

- **One type family + one mono.** Display: Instrument Serif (kept).
  Mono: Geist Mono (kept). Two faces, no more.
- Scale: one very large display headline (9.5–12rem), one supporting
  sentence (34–38px), body 16px+, captions 13–14px, labels 12px.
- Tracking: display at -0.02em; mono labels at 0.12–0.18em.
- Measure ~55–70 characters. Left-aligned anywhere except at most one
  centred moment (the monogram).
- No eyebrows. No index numbers. No "01 / 2026". Order shown by size,
  position, and words.

## Composition / the house rhythm

- One grid, one pair of equal margins (16–28px), used everywhere.
- Section gap clearly larger than anything inside a section (120–200px).
- Each section has a DIFFERENT composition. None is a card grid.
- Sections stack: hero -> work -> capabilities -> experience -> contact.
- Asymmetric inside the grid; never in the frame.
- The monogram "PM" anchors the top-left, not centre.

## Motif: the square driver (the brand's "paper" sign)

- Every picture and panel is square-cornered, full-bleed where it can be.
- Pages use a "paper stripe" — a full-width navy-ink bar with a slight
  offset — to separate sections, never a hairline.
- Document snippets are real UI fragments (data+code, not grey bars).
- The "issue marker" is a small square chip with the amber accent.

## The live thing (one, on the hero)

A single interactive element that proves the claim and works on a thumb:
a small "live bill / footprint" counter that steps from a sample figure to
a lower target as the user scrolls to the capabilities section, with a
plain text fallback and no script-required content. Built into the hero
and wired to scroll position.

## Sections

### Hero (full-screen, anchored top-left)
- Monogram "PM" as a wordmark (left).
- Huge display type: name, then role, then one supporting sentence.
- One primary action (View selected work) + one ghost (Download resume).
- Subtle, flat; the scene is a dark graded RGB film-loop backdrop
  (drawn in the three.js points, flat, no additive glow).

### Work (full-width, two sub-compositions)
- Section 1: a "spec sheet" for the brand — brand attributes in a
  typed, ledger panel (identity, values, environment). Not a card.
- Section 2: the work list as document cards (square corners, full
  bleed, no gradient). Each card is a tiny "issue paper" with an
  amber number, title, kicker, outcome, architecture strip, and
  stack as a single typed line.
- One dominant image per screen: a real screenshot of a real project's
  own interface (a cropped Next.js dashboard, an AWS console snapshot,
  or a drawn architectural diagram in the brand palette), not a stock
  placeholder.

### Capabilities
- Three lanes, but each lane is a distinct composition, not rows of
  identical cards. Each lane has a title, a lead paragraph, and a
  "how it ships" list plus a small real artefact (a terminal block
  with real sample output, an IAM policy snippet, a docker-compose).
- Certifications as a single typed line (comma separated), not pills.

### Experience
- A real timeline: large dates left, titles/company right, the
  "Details" trigger a drawer. The paper-stripe motif runs down the
  left. Bullets are real indent + amber marker.

### Contact
- A full-width quarter-page, one dominant block: two columns of
  typed links + a primary action. The footer is a designed close:
  the name at full width in italic display.

## States & semantics
- Visible focus rings. Real links/buttons. aria labels. A working skip
  link. The live counter reacts to scroll + keypress. Error/empty states
  for the live thing.

## Imagery
- Never a pictogram of the product. One dominant image per screen using:
  a real screenshot of the project's own interface, a real archival/managed
  picture of its world, or a drawn architectural diagram in the brand
  palette. Credits in the footer.

## Motion
- Entrance: heading, then text, then image, staggered 60–90ms, 16–32px
  rise, opacity. One signature move on the hero. Transform + opacity only.
- prefers-reduced-motion: drop all travel.

## Files to change / new
- `app/globals.css` — full rewrite: tokens, house rules, no banned devices.
- `app/page.tsx` + sections → new component files.
- New components: `components/brand/`, `components/work/ProjectCards.tsx`,
  `components/capabilities/Capabilities.tsx`, `components/experience/Timeline.tsx`,
  `components/contact/Contact.tsx`, `components/experience/DetailsDrawer.tsx`.
- `styles/design.md` — this file, copied into the repo.
- Content: polish `content/site.ts`, `content/projects.ts`, `content/skills.ts`,
  `content/experience.ts` (real, non-inflated figures).
- `README.md` — update to current stack, remove stale claims.
- `public/` — replace obvious placeholders (next.svg) with a real favicon/DNA
  asset; keep only what is used.
- `.gitignore` — add `.taste-skill`, `assets/`, local screenshots.

## Verification (must pass, measured)
- `npm run build` exits 0 (this is the shipped artifact gate).
- ESLint/typecheck clean (tsc with `noUncheckedIndexedAccess` off; ESLint
  flat-config path to be fixed for Next 16 by the maintainer).
- `inspect.mjs`-style pass on 1440/768/390: 0 failures, no empty screens,
  title on first screen, heading on every section.
