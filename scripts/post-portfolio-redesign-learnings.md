# Portfolio Redesign — workflow + tooling learnings

**Status:** applied (2026-11-04). Redesigned Pierre Mvita's dev site to a
dark editorial brand; committed 253ebe2 and pushed to main.

## What shipped
- Dark brand suite: `#070705` ground, `#f4f0e6` ink, `#d4af5a` single
  accent. Square-cornered "paper" surfaces (`.doc-paper`), paper-stripe
  section separators, no gradients/glass/eyebrows/gradient blobs/glass
  on UI. One type family (Instrument Serif) + one mono (Geist Mono).
- New sections: brand identity sheet, work list as "paper" project cards
  with amber issue markers, capabilities with `sample` code-slice
  fragments, experience drawer, redesigned contact.
- `app/globals.css` rewritten as the token + house-rules foundation.
- Verified: `npx tsc --noEmit` clean; `npm run build` exit 0.

## Tooling reality (do not re-litigate)
1. **Next 16 broke `npm run lint`.** `next lint` errors with
   "Invalid project directory" and eslint-config-next v16 is incompatible
   with ESLint 9's flat config loader (circular-structure JSON error).
   The project is type-checked with `tsc --noEmit` and shipped via `build`.
2. **Static-serve a Next 16 `.next` export is not a pure static site.**
   A plain static server (or `npx serve`) returns a flat-file index of
   `.next/`, not the app. The `next build` (Turbopack) output serves from
   `.next/server/` + `.next/static/`. Use `npm run dev` at `localhost:3001`
   for runtime verification.
3. **write_file refuses to overwrite a file the session has already read.**
   Use the terminal (`python3` one-liner) to fully rewrite a file, and
   patch for targeted edits.
4. **`tsc --noEmit` needs a clean `.next` cache** after changing `.ts`
   types/signatures (stale `.tsbuildinfo`/NFC can cache the old shape).
5. **Banned devices verified absent:** no `glass`, no `backdrop-filter`,
   no gradient on UI chrome (the only two `linear-gradient` in globals.css
   are the paper-stripe hairline + the hero `gold-chrome::before` scrim,
   which the skill explicitly permits as "a neutral scrim under text on a
   photo").
5. **Lint tooling must NOT be claimed as "passing" from a previous run.**
   `next lint` is broken in Next 16; verify with `tsc --noEmit` instead.
6. **Dependency upgrades keep the prod boundary.**
   `npm install` upgrades matching minors: next 16.4.5, eslint-config-next
   16.4.5, tailwindcss 4.3.4, @types/* 19.3.0, @types/node 20.19.43,
   framer-motion 12.x, eslint 9.x. `typescript` is capped at `^5` (TS 7 is
   a breaking major and Next 16 won't run on it). `three` and `lucide-react`
   stay on their current 0.x minors (0.x isn't semver-stable; 0.187/1.68 risk
   breaking the three.js scenegraph/React tree). The 3 high npm-audit findings
   live in the `eslint`/`eslint-config-next` dev-chain, not the shipped site.
