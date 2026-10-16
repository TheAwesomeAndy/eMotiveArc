# EmotiveArc website

Public marketing website for **EmotiveArc** (AI Behavioral Intelligence) and its first
offer, the $750 founding-client **AI Character Continuity Audit**.

This repository holds the public website only. MotiveLab research code, experiments,
datasets, evaluation infrastructure and client material belong in a separate private
repository and must never be committed here (see `.gitignore`).

**Founder handoff, launch checklist and test results:** [`WEBSITE_HANDOFF.md`](./WEBSITE_HANDOFF.md)

## Stack

Next.js 16 (App Router, static prerendering) · TypeScript · Tailwind CSS 4 · Lucide icons.
No database and no backend beyond one Server Action for the inquiry form. Built for Vercel.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional; defaults run the site in preview mode
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Unit tests for validation, credential rejection and inquiry handling (Node test runner + tsx) |
| `npm run test:e2e` | Browser smoke test against a running server (see handoff doc) |
| `npm run check` | lint + typecheck + unit tests + build |

## Where things live

```
src/app/            routes, metadata, sitemap, robots, OG image, Server Action
src/components/     header, footer, form, diagrams, homepage sections
src/content/        offer copy and sample-audit config (edit text here)
src/lib/            env config, validation, lead delivery, rate limiting
public/brand/       SVG brand mark (dark and light)
public/sample/      drop the approved sample PDFs here
tests/              unit tests and e2e smoke test
```
