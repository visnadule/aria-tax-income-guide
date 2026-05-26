# Aria Tax

An educational guide that helps users understand how their income is reported in the US tax system — covering W-2s, 1099s, Schedule C, and more.

## Run & Operate

- `pnpm --filter @workspace/aria-tax run dev` — run the frontend (port assigned by workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS v3 (PostCSS)
- Fonts: Merriweather (serif headings) + Inter (sans-serif body) via Google Fonts
- Icons: lucide-react
- No backend — pure frontend educational app

## Where things live

- `artifacts/aria-tax/` — the main web app
- `artifacts/aria-tax/src/App.tsx` — all views and components (single-file app, ~2800 lines)
- `artifacts/aria-tax/src/index.css` — Tailwind v3 base + custom component styles
- `artifacts/aria-tax/tailwind.config.js` — custom color palette (sage, sand, steel, cream, ink)
- `artifacts/aria-tax/index.html` — Google Fonts links + SEO meta tags

## Architecture decisions

- Single-file component approach in App.tsx — all views (W2, Freelance, Mixed, Investment, 1099 Tree, Schedule C, Comparison) live in one file for simplicity.
- Tailwind v3 with PostCSS (not the v4 Vite plugin) — required because the app was built with v3 custom config/colors.
- No database or API — the app is fully static educational content, no data persistence needed.
- Custom color palette: sage (green tones), sand (warm amber), steel (muted blue), cream (background), ink (text).

## Product

- Entry screen: Users pick their earner type (W-2, Freelance, Mixed, Investment)
- Per-type roadmaps: Visual flow diagrams showing how income travels through the tax system
- Form anatomy viewers: Interactive breakdowns of W-2, 1099-NEC, 1099-K forms
- 1099 Family tree: Visual taxonomy of all 1099 form variants
- Schedule C view: Explanation of the business profit/loss form
- Comparison view: Side-by-side comparison of income types

## User preferences

- App is educational only — "This is an educational guide, not tax advice. No data is collected. Nothing is filed."
- Created by Aria Tax Services PA

## Gotchas

- Do NOT switch to Tailwind v4 / `@tailwindcss/vite` — the custom color palette and animation keyframes require v3 config format.
- vite.config.ts uses `css.postcss.plugins` to load tailwind + autoprefixer (not the vite plugin).
- The `@supabase/supabase-js` package was listed in the original Bolt package.json but is NOT used anywhere in the app — it was not migrated.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
