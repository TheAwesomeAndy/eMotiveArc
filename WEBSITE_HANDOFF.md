# EmotiveArc website: founder handoff

Status: **launch-ready preview, not published.** Nothing has been deployed, no domain or
service has been purchased, and no external messages have been sent. Publication needs
founder approval.

Last validated: 2026-10-16.

---

## 1. What was built

A complete marketing site for the $750 founding-client **AI Character Continuity Audit**,
built to turn visitors into qualified audit inquiries (primary goal) and discovery
conversations (secondary).

**Pages**

| Route | Purpose |
| --- | --- |
| `/` | Full sales page: hero, problem, what we evaluate, audit offer, Romance & Intimacy, sample audit, how it works, who we serve, research foundation, FAQ, inquiry form |
| `/contact` | Dedicated inquiry page. `?next=audit` or `?next=discovery` preselects the option |
| `/sample-report` | Captain Ivy Marlow sample, disclosure, PDF downloads |
| `/privacy` | Preliminary website privacy notice (draft for legal review) |
| `/data-handling` | Client data handling, separating current practice from proposed policy (draft) |
| 404 | Branded not-found page |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon.svg`, `/apple-icon` | SEO and icons, all generated at build |

**Brand identity**

- **Mark:** a trajectory runs through an emotionally significant event (warm node) and
  branches. The solid branch carries the consequence forward. The faint dotted branch is
  the consequence a character can lose. It's the product thesis in one glyph.
  Files: `public/brand/emotivearc-mark.svg` (for light backgrounds) and
  `emotivearc-mark-light.svg` (for dark). React version: `src/components/brand/logo.tsx`.
- **Wordmark:** "Emotive*Arc*" set in Newsreader, with *Arc* in italic.
- **Type:** Newsreader (display serif), Inter (body), JetBrains Mono (technical labels).
  All free Google Fonts, self-hosted by Next.js at build time.
- **Color:** paper `#f6f4ef`, ink `#0c1424`, one cool "arc" teal `#256a70` for continuity,
  one warm "signal" `#9c4f22` for emotional events. Tokens live in `src/app/globals.css`.
- **Signature visual:** the hero "continuity trace" diagram, an illustrative (clearly
  labeled) chart showing a character that responds convincingly in the moment, then
  either carries the consequence into a later session or reverts to baseline.

No stock photos, robot heads, neon brains, paid assets or paid image services were used.

**Tech:** Next.js 16.4 (App Router, Cache Components, every route statically prerendered),
React 19, TypeScript, Tailwind CSS 4, Lucide icons. One Server Action handles the form.
No database. Lightweight CSS-only animation that respects `prefers-reduced-motion`.

---

## 2. Content decisions you should know about

I followed the brief's honesty rules strictly. Where I had to write copy you didn't supply,
here's what to review:

1. **Illustrative failure examples** in "The problem" (six "Earlier / Later" cards) and the
   hero diagram are invented to explain the problem. Both are labeled on the page as
   illustrative, not client results.
2. **Sample audit.** The approved Captain Ivy Marlow materials were **not in this
   workspace**, so I wrote no findings, quotes or outcomes. The section shows the required
   disclosure and a list of what *every audit report* covers (taken from your offer, not
   from the PDF). See section 5 to finish it.
3. **Research levels** are described as questions with an "Active research" tag and an
   explicit line that they aren't a validated scientific standard. I didn't know the
   validation status of each level, so none is presented as validated. If any level *is*
   validated, tell me and I'll add precise wording.
4. **Romance & Intimacy** states plainly that mature-content scenarios have been exercised
   with offline fixtures only and aren't experimentally validated against live products.
5. **"Our working practices"** on `/data-handling` lists four commitments that need no
   infrastructure (for example, "we don't ask for API keys through this website"). Please
   confirm you're willing to stand behind each. The 90-day retention, deletion procedure
   and contract terms are listed under "Proposed, not yet in place", with no deletion
   promise.
6. **FAQ answers** are mine. Check especially "Which models or frameworks do you work
   with?" and "Do you need our system prompt?".
7. The phrase **"Founding-client pricing applies to early engagements and may change"**
   is mine. Replace it if you want a specific number of founding slots or an end date.
8. **No testimonials, customers, metrics, partners, certifications, legal entity, address
   or registration numbers** appear anywhere. The footer reads "© 2026 EmotiveArc" with no
   entity suffix.

---

## 3. Environment variables

All optional. With none set, the site runs as a safe preview. Template: `.env.example`.
Pages are prerendered, so **redeploy after changing any variable.**

| Variable | Scope | Default | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_STAGE` | public | `preview` | `preview` shows the ribbon, sets `noindex`, and robots.txt blocks crawlers. `live` removes all three. Set `live` only after approving publication |
| `NEXT_PUBLIC_SITE_URL` | public | Vercel URL, then `http://localhost:3000` | Canonical URL for metadata, sitemap and OG. Set once the domain is cleared |
| `NEXT_PUBLIC_CONTACT_EMAIL` | public | unset | Shows a mailto link in the footer, contact and privacy pages. **Leave unset until the mailbox exists and is monitored** |
| `NEXT_PUBLIC_DISCOVERY_CALL_URL` | public | unset | Optional booking link (Cal.com, etc.) shown under the form |
| `RESEND_API_KEY` | **server secret** | unset | Email delivery through Resend. Needs all three Resend variables |
| `CONTACT_TO_EMAIL` | server | unset | Where inquiries go. Comma-separated for multiple recipients |
| `CONTACT_FROM_EMAIL` | server | unset | Sender, on a domain verified in Resend, e.g. `EmotiveArc Website <inquiries@emotivearc.com>` |
| `CONTACT_WEBHOOK_URL` | **server secret** | unset | Alternative to Resend: POSTs each inquiry as JSON (Zapier, Make, Slack, Google Sheets via automation) |
| `CONTACT_WEBHOOK_SECRET` | server secret | unset | Sent as the `X-EmotiveArc-Secret` header so the receiver can verify requests |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | public | unset | `plausible` enables Plausible. **Off until you approve a provider** |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | public | unset | Domain registered in Plausible |
| `NEXT_PUBLIC_PLAUSIBLE_SRC` | public | Plausible's script URL | Override for a self-hosted or proxied script |

Server variables never reach the browser. `.env*` files are gitignored, except
`.env.example`, which contains no values.

---

## 4. The inquiry form

**Fields:** preferred next step (audit or discovery), name, work email, company (optional),
product website (optional), description (20 to 2,000 characters). The form asks visitors
not to include API keys, transcripts or system prompts, and warns if the text looks like
it contains an API key.

**Validation:** the same rules run in the browser (instant, accessible errors, focus moves
to the first problem) and on the server (authoritative). See `src/lib/inquiry.ts`.

**Anti-spam:** a hidden honeypot field, a minimum fill time of 3 seconds, and a per-IP
rate limit (5 submissions per 10 minutes). Suspected bots get a fake success and nothing
is delivered. The rate limiter is in-memory, so on serverless hosting it's a speed bump,
not a guarantee. If spam becomes a problem, add Cloudflare Turnstile (free).

**Delivery modes** (chosen automatically from env vars, in this order):

1. **Email (Resend)** when `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`
   are all set. Plain-text email with `Reply-To` set to the visitor, so you can reply
   directly. No confirmation email goes to the visitor, since that would be an external
   communication you haven't approved.
2. **Webhook** when `CONTACT_WEBHOOK_URL` is set.
3. **Preview** (current state) when neither is set. The form shows a "Preview mode"
   banner before submission. After submission it tells the visitor plainly that the
   inquiry **was not sent** and keeps their text in the form. The submission is also
   written to the server log (`[inquiry:preview]`) so test submissions can be checked.
   Nothing is silently discarded.

**If delivery fails** (provider error or timeout), the visitor sees an error, their text
is kept, and the full inquiry is written to the server log (`[inquiry:email]` or
`[inquiry:webhook]`) so it can be recovered.

**Works without JavaScript** through Next.js progressive enhancement (verified, see section 7).

### To switch on email delivery (Resend)

1. Create a Resend account. The free tier covers early volume. **Needs your approval.**
2. Add and verify the sending domain in Resend (DNS records on `emotivearc.com`).
3. Create an API key with "sending access" only.
4. In Vercel → Project → Settings → Environment Variables, add `RESEND_API_KEY`,
   `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` for Production (and Preview if wanted).
5. Redeploy. The preview banner disappears and the ribbon stops mentioning the form.
6. Send a test inquiry and confirm it arrives and that replying reaches the sender.

---

## 5. Finishing the sample audit

Put the approved files in `public/sample/` with **exactly** these names:

| File | Contents |
| --- | --- |
| `public/sample/emotivearc-sample-audit-captain-ivy-marlow.pdf` | The longer sample report |
| `public/sample/emotivearc-audit-overview.pdf` | The two-page prospect sheet |

The download buttons switch on automatically at the next build (verified with test files).
Until then, preview builds show dashed "Placeholder" boxes naming the missing file, and
live builds hide them and show "The full sample report is available on request".

Optional: to show a short excerpt on the page, fill in `excerpt` in
`src/content/sample-audit.ts` with approved wording (setup, a short earlier and later
exchange, the finding). Copy it from the approved report. Don't paraphrase.

**Before committing the PDFs,** check they contain no client data, private datasets,
API keys, internal MotiveLab material or unreleased model details. Everything in
`public/` can be downloaded by anyone.

The disclosure shown with the sample reads: *"This demonstration ran against a real
language model. Its findings were reviewed by an AI assistant, not by an independent
human reviewer. Paid audits include human expert review."* Edit it in
`src/content/sample-audit.ts` if needed.

---

## 6. Running and deploying

### Local preview

```bash
npm install
npm run dev                    # http://localhost:3000, hot reload
# or, for the production build:
npm run build && npm start     # http://localhost:3000
```

Requires Node.js 20.9 or newer (tested on Node 22.22).

### Deploying to Vercel (needs founder approval)

1. Import `TheAwesomeAndy/eMotiveArc` in Vercel. Framework preset: **Next.js**. Root
   directory: repository root. No build settings need changing (`npm run build`).
2. Leave `NEXT_PUBLIC_SITE_STAGE` unset at first. Every deployment then has the preview
   ribbon and `noindex`, so a Vercel preview URL is safe to share for review.
3. The Hobby (free) plan works technically, but Vercel's terms limit Hobby to
   non-commercial use. For a commercial launch, plan on **Vercel Pro** (paid). That's a
   purchase decision for you.
4. When ready to launch: attach the domain, set `NEXT_PUBLIC_SITE_URL`,
   `NEXT_PUBLIC_SITE_STAGE=live`, the delivery variables and (optionally)
   `NEXT_PUBLIC_CONTACT_EMAIL`, then redeploy.
5. After launch, submit `https://<domain>/sitemap.xml` in Google Search Console.

Any static-capable Node host works too (Netlify, Cloudflare, a VPS running `npm start`).
The site doesn't depend on Vercel-specific APIs.

---

## 7. Validation results

All results below are from 2026-10-16 in the build container (Linux, Node 22.22.0,
Chromium 141 headless).

| Check | Result |
| --- | --- |
| `npm run lint` (ESLint, Next core-web-vitals + TypeScript rules) | Pass, 0 errors, 0 warnings |
| `npm run typecheck` (`tsc --noEmit`, strict) | Pass |
| `npm test` (7 unit tests for validation, normalization, free-mail and secret detection) | 7 / 7 pass |
| `npm run build` | Pass. All 11 routes statically prerendered, including the OG image |
| `npm run test:e2e` (browser smoke test) | **94 / 94 checks pass** |
| `npm audit --omit=dev` (shipped dependencies) | 0 vulnerabilities |

**What the e2e suite covers** (`tests/e2e/smoke.mjs`):

- Every page at 1440×900 and 390×844: HTTP 200, exactly one `h1`, title and meta
  description present, no horizontal overflow, no console or page errors.
- **axe-core accessibility scan** on every page: 0 serious or critical violations. The
  first run found 19 color-contrast failures, all fixed by darkening the `faint`, `arc`
  and `signal` tokens and the dim text on dark sections. Every text element axe checks now meets WCAG AA (4.5:1). Small labels inside the hero SVG diagram were raised in size and opacity but sit outside axe's checks.
- Every internal link and in-page anchor on the homepage resolves.
- `robots.txt`, `sitemap.xml`, OG image and icons are served.
- Mobile menu opens and closes on Escape.
- Form: empty submit shows errors and focuses the first field, invalid email rejected,
  `?next=discovery` preselects, preview-mode submission shows the "not sent" notice and
  keeps the text, honeypot submission is silently dropped.

**Checked manually** (scripts in the session scratchpad, not committed):

- **Live-stage build** (`NEXT_PUBLIC_SITE_STAGE=live`): ribbon gone, `index, follow`
  meta, robots.txt allows crawling and lists the sitemap, placeholders hidden, preview
  form banner gone once delivery is configured.
- **PDF activation:** with test PDFs in `public/sample/`, both download buttons render
  and the files serve as `application/pdf` with HTTP 200. Test files were then deleted.
- **Webhook delivery** against a local mock receiver: payload and `X-EmotiveArc-Secret`
  header arrive. With the receiver returning HTTP 500, the visitor sees the error, keeps
  their text, and the full inquiry appears in the server log.
- **No-JavaScript submission:** a plain HTML form POST is processed by the Server
  Action, delivered, and the "Inquiry received" panel renders.
- **Visual review** of full-page desktop and mobile screenshots. Fixes made along the
  way: mobile header button overflow, hero diagram labels too small on phones and
  overlapping lines, OG image curve crossing text, button text wrapping, diagram
  branches hidden under reduced motion.

**Not tested:** real email delivery through Resend (needs an account and a verified
domain), Safari and Firefox (only Chromium was available), real screen readers (only
automated axe checks plus semantic review), and Lighthouse scores on real hosting.

### Re-running the tests

```bash
npm run check                                   # lint, types, unit tests, build
npm start &                                     # serve the production build
npx playwright install chromium                 # once, if you have no Chromium
BASE_URL=http://localhost:3000 npm run test:e2e
# or point at an existing browser:
CHROMIUM_PATH="/path/to/chrome" BASE_URL=http://localhost:3000 npm run test:e2e
```

---

## 8. Known issues and limitations

- **Dev-only advisories:** `npm audit` reports 5 high-severity advisories in `braces`, a
  transitive dependency of the lint toolchain. It isn't shipped to visitors. The suggested
  `npm audit fix --force` would downgrade Next.js tooling, so I left it.
- **Rate limiting is per server instance** (in-memory). Fine at launch volume, not a hard
  guarantee.
- **The privacy and data-handling pages are drafts**, labeled as such on the page. They
  need legal review and the provider names (hosting, email) once chosen.
- **No Content-Security-Policy header yet.** Basic security headers are set (`nosniff`,
  `DENY` framing, referrer policy, HSTS, permissions policy). A strict CSP needs nonce
  handling and is worth adding once analytics and booking choices are final.
- **The OG image is generic** for all pages. Per-page images can be added later.
- **No preview URL exists yet**, because deploying needs your approval and a Vercel account.
- `AGENTS.md` is written by Next.js for AI coding tools. It's harmless and can stay.

---

## 9. What the founder needs to provide or decide

**Assets**

- [ ] The two approved sample PDFs (section 5).
- [ ] Optional: an approved short excerpt from the sample report.
- [ ] Confirmation of the research-level wording, or the actual validation status of
      each level.

**Decisions**

- [ ] Approve the copy, especially the items in section 2.
- [ ] Final brand clearance for "EmotiveArc" (legal and trademark).
- [ ] Whether to cap founding-client pricing (number of slots or end date).
- [ ] Analytics: none, Plausible (cookieless, paid), or another provider.
- [ ] A booking link for discovery calls, if wanted.

**Accounts and purchases (needs your approval, nothing has been bought)**

- [ ] Domain `emotivearc.com`: availability, clearance and purchase.
- [ ] Mailbox `hello@emotivearc.com`, set up and monitored before the address appears.
- [ ] Hosting: a Vercel account (Pro for commercial use) or another host.
- [ ] Inquiry delivery: a Resend account with a verified domain, or a webhook destination.
- [ ] Legal review of `/privacy` and `/data-handling`, plus legal entity details to add.

**Before going live**

- [ ] Set `NEXT_PUBLIC_SITE_STAGE=live` and `NEXT_PUBLIC_SITE_URL`, then redeploy.
- [ ] Send a real test inquiry end to end.
- [ ] Re-run `npm run test:e2e` against the live URL.

---

## 10. Repository hygiene

- `.gitignore` blocks `.env*` (except `.env.example`), build output, and research or
  client paths: `/motivelab`, `/research`, `/private`, `/datasets`, `/experiments`,
  `/evaluations`, `/clients`, `/client-data`, `/transcripts`, plus `*.jsonl`,
  `*.parquet`, `*.sqlite`, `*.db`.
- No credentials, client information, research datasets or MotiveLab materials are in
  this repository.
- Keep MotiveLab in its own private repository. This one is public-facing by design.
