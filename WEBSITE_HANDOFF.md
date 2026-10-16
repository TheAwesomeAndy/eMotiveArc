# EmotiveArc website: engineering handoff

This file is the source of truth for reviewing the EmotiveArc public website. Everything
needed to verify the claims below is in this repository. Nothing depends on the Claude Code
conversation, local files or unpushed work.

---

## A. Version and identification

| | |
| --- | --- |
| Date | 2026-10-16 |
| Milestone | Revision 2: inquiry hardening, retention wording, test expansion |
| Repository | https://github.com/TheAwesomeAndy/eMotiveArc |
| Branch | `claude/emotivearc-website-launch-4dcl0p` |
| Reviewed code commit | `2b404fffb2b58db2e86393a6a0ab7726a6e3286f` |
| Handoff commit | The commit that adds this file version (documentation and one test fixture only, no runtime code) |
| Previous reviewed commit | `228632c51cedc331f370600d8b79e2e6d21c61e5` |
| Diff since last review | https://github.com/TheAwesomeAndy/eMotiveArc/compare/228632c51cedc331f370600d8b79e2e6d21c61e5...2b404fffb2b58db2e86393a6a0ab7726a6e3286f |
| Current state | **Staging-ready, not production-ready.** Safe to deploy as a private, non-indexed preview. Not ready to publish: inquiry delivery is unconfigured and the sample assets are missing (section E) |

Nothing has been deployed, purchased or sent. No production environment exists.

### What changed since `228632c`

Requested by the review of `228632c`, in order:

1. **Sample audit integration: blocked, assets missing.** The approved files were not in
   the workspace, the repository, or the founder's connected Google Drive (the
   `eMotiveArc/website` Drive folder exists but is empty). Nothing was invented. The
   excerpt slot now targets the F01 example by ID, and the preview placeholder names the
   exact missing asset. The AI-review disclosure is unchanged.
2. **Sensitive logging removed.** Inquiry contents are no longer written to server logs
   on any path.
3. **Server-side credential rejection added.** It covers every field, in the browser and
   on the server.
4. **Retention wording reconciled.** There's now one canonical statement, used on
   `/data-handling` and in the FAQ, marked pending approval. Replacement wording for the
   prospect sheet is in section D.
5. **Tests expanded.** Unit and handler tests went from 7 to 21, and browser checks from
   94 to 98.

---

## B. Work completed

### Implemented in this revision

| File | What it does |
| --- | --- |
| [`src/lib/inquiry-handler.ts`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/2b404fffb2b58db2e86393a6a0ab7726a6e3286f/src/lib/inquiry-handler.ts) | **New.** All inquiry logic, independent of Next.js: honeypot, timing check, rate limit, validation (including credential rejection), delivery, and the visitor-facing result messages. Order guarantees a credential is rejected before anything is delivered or logged |
| [`src/lib/lead-delivery.ts`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/2b404fffb2b58db2e86393a6a0ab7726a6e3286f/src/lib/lead-delivery.ts) | Resend and webhook delivery. **Logs only `safeLeadMeta`**: reference code, next-step type, source path, message length, and whether company and website were filled in. Failure logs add mode and a reason code (`http_500`, `timeout`, `TypeError`). Error messages from `fetch` are dropped because they can echo request details |
| [`src/lib/inquiry.ts`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/2b404fffb2b58db2e86393a6a0ab7726a6e3286f/src/lib/inquiry.ts) | Shared validation. Adds `SECRET_PATTERNS` (Anthropic, OpenAI-style, Stripe, AWS, GitHub, Slack, Google, Resend, Hugging Face, PEM private keys, JWTs) and applies them to **every** field. `findSecret` returns only the credential type, never the match |
| [`src/app/actions.ts`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/2b404fffb2b58db2e86393a6a0ab7726a6e3286f/src/app/actions.ts) | Now a thin Server Action: reads the client IP, calls `handleInquiry` |
| [`src/content/policies.ts`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/2b404fffb2b58db2e86393a6a0ab7726a6e3286f/src/content/policies.ts) | **New.** Canonical retention wording, with approval status |
| [`src/content/sample-audit.ts`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/2b404fffb2b58db2e86393a6a0ab7726a6e3286f/src/content/sample-audit.ts) | Excerpt type gains `findingId`. Slot pinned to `F01`, "coaching continuity". `excerpt` remains `null` |
| [`tests/inquiry-handler.test.ts`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/2b404fffb2b58db2e86393a6a0ab7726a6e3286f/tests/inquiry-handler.test.ts) | **New.** 11 handler tests with a fake `fetch` and captured console output |
| [`tests/fixtures/mock-webhook.mjs`](./tests/fixtures/mock-webhook.mjs) | **New in handoff commit.** Local webhook stand-in for manual delivery tests. Prints byte counts only, not payloads |

### Inquiry behavior now

| Situation | Visitor sees | Server log | Delivered |
| --- | --- | --- | --- |
| No provider configured (preview) | Warning banner **before** submitting. After: "This form is in preview mode, so your inquiry was not sent to anyone and has not been saved…" Text stays in the form | `not_delivered_preview` + metadata | No |
| Provider succeeds | "Inquiry received… Reference: XXXXXXXX" | `delivered` + mode + ref | Yes |
| Provider fails or times out | "We couldn't send your inquiry, and it hasn't been saved anywhere. Your details are still in the form. Please wait a minute and press send again… Reference: XXXXXXXX." Mentions the public email instead, once `NEXT_PUBLIC_CONTACT_EMAIL` is set | `delivery_failed` + reason + metadata | No |
| Credential in any field | Field error: "This looks like it contains an API key or other credential. Please remove it…" Blocked in the browser before any request, and again on the server | `rejected_credential` + field **names** only | No |
| Honeypot filled or submitted in under 3 s | Fake success | `dropped_spam` + booleans | No |
| Over 5 submissions per IP per 10 min | "Too many submissions…" | `rate_limited` | No |

**Logs are not a recovery mechanism.** If delivery fails, the inquiry exists only in the
visitor's open form. The retry message says so plainly.

### Status of everything on the site

| Feature | Status |
| --- | --- |
| All marketing sections, brand, SEO, sitemap, robots, OG image | Fully implemented |
| Inquiry form, validation, anti-spam, credential rejection | Fully implemented |
| Email delivery (Resend) | Implemented, **unconfigured**. Request format verified with a fake `fetch` only. Never sent through Resend |
| Webhook delivery | Implemented, **unconfigured**. Verified against the local mock only |
| Preview/live stage switch | Implemented. Defaults to preview (ribbon, `noindex`, robots disallow) |
| Sample PDFs | **Placeholder.** Download buttons activate automatically when files exist |
| F01 sample excerpt | **Placeholder** (preview builds only). Hidden on live builds |
| Analytics | Integration point only. Off |
| Privacy and data-handling pages | Drafts, labeled on the page, pending legal review |
| Hero diagram and "The problem" examples | **Illustrative.** Labeled on the page as not client results |

---

## C. Evidence and testing

All commands below were run on 2026-10-16 against commit `2b404ff` in the build container
(Linux, Node 22.22.0, Chromium 141.0.7390.37 headless).

| Command | Result |
| --- | --- |
| `npm run lint` | Pass. 0 errors, 0 warnings |
| `npm run typecheck` | Pass (`tsc --noEmit`, strict) |
| `npm test` | **21 passed, 0 failed** (10 validation and credential tests, 11 handler tests) |
| `npm run build` | Pass. 11 routes, all statically prerendered |
| `npm run test:e2e` against `npm start` | **98 passed, 0 failed** |
| `npm audit --omit=dev` | 0 vulnerabilities in shipped dependencies |
| `npm audit` | 5 high, all in `braces` via the lint toolchain (dev-only, not shipped) |

### Unit and handler tests (`npm test`)

Fake `fetch`, no network. They prove our logic, not any provider's behavior.

- Preview mode: no network call, the visitor message says "not sent" and "not saved", and
  logs contain none of the submitted values.
- Webhook success: payload includes the lead, and the secret header is set. The secret
  and lead values are absent from logs.
- Resend success: correct endpoint, recipients split, `reply_to` set, no newline in the
  subject, API key absent from logs.
- HTTP 500 failure: error state with retry wording and a reference code, reason
  `http_500` logged, no content logged.
- Network error whose message contains the visitor's email: the email isn't logged, only
  `TypeError`.
- Credential in the message, in the company field, and in preview mode: rejected, no
  delivery, the credential is absent from logs.
- Honeypot and too-fast submissions: fake success, no delivery.
- Rate limit: the sixth submission from one IP is refused.
- 12 credential formats detected. 3 realistic product descriptions not flagged.

**Mutation check:** temporarily restoring the old `console.info(JSON.stringify(lead))`
made 2 tests fail. The fix restored 21 of 21. The log-hygiene tests can detect the
original defect.

### Browser tests (`npm run test:e2e`, file `tests/e2e/smoke.mjs`)

- Five pages at 1440×900 and 390×844: HTTP 200, one `h1`, title and description, no
  horizontal overflow, no console errors.
- **axe-core 4.x**: 0 serious or critical violations on all five pages.
- Every homepage link and anchor resolves. Robots, sitemap, OG image and icons served.
- Mobile menu opens and closes with Escape.
- Form: errors and focus, invalid email, `?next=` preselection, preview outcome keeps
  text, **preview warning visible before submit (new)**, honeypot drop.
- **New:** a pasted Anthropic-format key triggers the live warning, blocks submission with
  the credential error, and produces **0 POST requests**.

### Manual checks on the production server (not automated)

| Check | How | Result |
| --- | --- | --- |
| Server log content after the e2e run | Searched the `npm start` output for every submitted test value | 0 matches. Only JSON metadata lines |
| Provider failure end to end | Mock webhook in fail mode, HTML form POST with curl | Retry message with reference rendered. Log line `delivery_failed`, `http_500`. 0 content matches |
| Server-side credential rejection, bypassing the browser | curl POST with a key in `message` | Credential error rendered. Log `rejected_credential`, `fields: message`. **Mock received 0 requests** |
| Data-handling page layout | Screenshot | Renders correctly |

The two curl checks are plain multipart form POSTs, so they also re-verify the
no-JavaScript path against the new handler. From revision 1, still valid but not re-run:
live-stage build switches and PDF auto-activation with dummy files.

### Reproduce

```bash
git checkout 2b404fffb2b58db2e86393a6a0ab7726a6e3286f
npm ci
npm run check                          # lint, typecheck, 21 tests, build
npm start &                            # http://localhost:3000
npx playwright install chromium        # once, if no Chromium is available
BASE_URL=http://localhost:3000 npm run test:e2e
# or: CHROMIUM_PATH=/path/to/chrome BASE_URL=... npm run test:e2e

# Manual delivery-failure check
node tests/fixtures/mock-webhook.mjs &
curl localhost:4555/mode/fail
CONTACT_WEBHOOK_URL=http://localhost:4555/hook PORT=3001 npm start
# submit the form at http://localhost:3001/contact and read the server output
```

**Can't be reproduced without external accounts:** real Resend delivery (needs an account
and a verified domain), a Vercel deployment, and DNS or domain behavior.

**Not tested at all:** Safari, Firefox, real screen readers, Lighthouse on real hosting.

---

## D. Commercial and scientific integrity

### Customer-facing assertions changed in this revision

| Where | Before | Now |
| --- | --- | --- |
| `/data-handling`, proposed list | "A 90-day retention period for client audit materials after the final report or retest." | "Our proposed default is to keep client audit materials for 90 days after we deliver the final report or regression retest, unless your written agreement sets a different period." |
| `/data-handling`, note | "We don't yet offer automated deletion…" | "This default hasn't been finalized. Deletion is not automated, and we don't yet have a documented deletion procedure or issue deletion confirmations. The retention period and how deletion is handled will be set out in each client's written agreement before any materials are shared." Plus a visible tag: "Pending founder and legal approval" |
| FAQ, "How do you handle our data?" | "Confidentiality, retention, and deletion terms are agreed in writing…" | "Our proposed default is 90 days after the final report or retest, confirmed in each client's written agreement. Deletion isn't automated." |
| Form messages | Preview, failure and success wording | As in the table in section B. The success message now includes a reference code |
| Form credential error | (none) | "…We never need credentials through this form." |

No claims about psychological continuity, research validation, model performance,
romance or intimacy evaluation, or client results changed in this revision.

### Retention wording for the prospect sheet (founder action)

The earlier prospect sheet says client data is retained for 90 days by default. The site
now says that's a *proposed* default. **Before the sheet is published as
`emotivearc-audit-overview.pdf`,** replace its retention line with:

> **Client data:** Our proposed default is to keep audit materials for 90 days after the
> final report or retest, confirmed in each client's written agreement. Deletion is not
> automated. *(Terms pending approval.)*

If the founder and counsel instead approve 90 days as a firm commitment, change
`src/content/policies.ts` in one place and the site updates everywhere. That commitment
should wait until a documented deletion procedure exists.

### Standing claims that need independent review

| Claim | Location | Basis |
| --- | --- | --- |
| Three research levels described as "active research", "not a validated scientific standard" | Research section | Founder brief. Validation status of each level unknown to engineering |
| Mature-content scenarios "exercised with offline test fixtures… not yet experimentally validated against live products" | Romance section, FAQ | Founder brief |
| Sample disclosure: "ran against a real language model… reviewed by an AI assistant, not by an independent human reviewer. Paid audits include human expert review." | Sample section, `/sample-report` | Founder brief. **Unchanged** |
| Six "Earlier / Later" failure cards and the hero continuity trace | Problem section, hero | **Illustrative, written by engineering.** Labeled on the page |
| "Summaries and retrieval… we suspect they can flatten what facts meant… a working hypothesis" | Who we serve | Hypothesis. Labeled as such |
| "5-business-day target", "15–20 scenarios", "one regression retest", "Some audits find no substantial problems" | Audit section, FAQ | Founder brief |
| "The method isn't tied to a particular model provider" | FAQ | Engineering inference from behavior-based testing. Needs founder confirmation |

**Demonstrated vs. not:** no client results, model-performance figures or validated
findings appear anywhere. The only real-model artifact referenced is the AI-reviewed
Captain Ivy Marlow demonstration, and its content is not yet on the site.

---

## E. Limitations and blockers

| Severity | Issue | Needs |
| --- | --- | --- |
| **Critical** (for public launch) | Inquiry delivery is unconfigured. The form works and warns visitors honestly, but no lead reaches anyone | External account (Resend or a webhook destination) + founder approval |
| **High** | Sample PDFs missing: `public/sample/emotivearc-sample-audit-captain-ivy-marlow.pdf` (full report) and `public/sample/emotivearc-audit-overview.pdf` (two-page prospect sheet) | Founder to supply approved files |
| **High** | F01 coaching-continuity excerpt missing: setup, earlier exchange, later exchange, finding text and any priority label, copied verbatim from the approved report | Founder to supply approved text |
| **High** | Prospect sheet retention wording contradicts the site until edited (section D) | Founder edit, before the PDF is added |
| **High** | Privacy and data-handling pages are unreviewed drafts, with no legal entity or provider names | Legal decision |
| **High** | Brand and domain clearance, monitored mailbox, hosting account | Founder approval + external accounts |
| Medium | Rate limit is per server instance (in-memory). No CAPTCHA | Engineering, if spam appears (Cloudflare Turnstile is free) |
| Medium | Credential detection is pattern-based. It catches common formats, not arbitrary secrets. The form text still tells visitors not to send any | Accepted limitation |
| Medium | No Content-Security-Policy header | Engineering, after analytics and booking choices are final |
| Medium | Real Resend delivery, Safari, Firefox and screen readers untested | External account / devices |
| Low | 5 dev-only `npm audit` advisories (`braces`) | None now. The suggested forced fix would downgrade tooling |
| Low | One generic OG image for all pages | Optional |

There are no known critical security, privacy or data-loss defects in the code at
`2b404ff`.

---

## F. Founder decisions

1. **Supply the three sample assets** (section E), with the prospect sheet's retention
   line changed first.
2. **Approve or revise the retention statement** (section D), with counsel.
3. **Choose and approve inquiry delivery:** Resend (needs a verified domain) or a
   webhook destination.
4. **Approve a staging deployment.** This needs a Vercel account. Vercel's free plan is
   intended for non-commercial use, so a commercial launch likely needs the paid Pro plan.
5. **Clear the brand and domain, and set up the monitored mailbox**, before
   `NEXT_PUBLIC_CONTACT_EMAIL` is set.

---

## G. Questions for ChatGPT

1. Is the retention statement in `src/content/policies.ts` accurate enough to publish as a
   *proposed* term, and is the replacement prospect-sheet line in section D acceptable?
2. In preview mode the form accepts a submission and then says it wasn't sent. For a
   shared staging link, is that acceptable, or should submission be disabled entirely
   until delivery is configured?
3. If the PDFs arrive before the F01 excerpt (or the reverse), should the sample section
   launch partially, or stay hidden until both exist?
4. Does the sample disclosure sentence sufficiently prevent a reader from assuming the
   demonstration was human-reviewed?
5. Is rejecting the whole submission when a credential is detected the right trade-off,
   or should the form strip the credential and continue? (The current choice favors
   never transmitting it.)

---

## Appendix 1: environment variables

All optional. With none set the site runs as a safe preview. Template: `.env.example`.
Pages are prerendered, so **redeploy after changing any variable.**

| Variable | Scope | Default | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_STAGE` | public | `preview` | `live` removes the ribbon and allows indexing. Founder approval only |
| `NEXT_PUBLIC_SITE_URL` | public | Vercel URL, then localhost | Canonical URL for metadata and sitemap |
| `NEXT_PUBLIC_CONTACT_EMAIL` | public | unset | Shown in the footer and the retry message. Only once monitored |
| `NEXT_PUBLIC_DISCOVERY_CALL_URL` | public | unset | Optional booking link |
| `RESEND_API_KEY` | **server secret** | unset | Email delivery, with the next two |
| `CONTACT_TO_EMAIL` | server | unset | Recipient(s), comma-separated |
| `CONTACT_FROM_EMAIL` | server | unset | Sender on a Resend-verified domain |
| `CONTACT_WEBHOOK_URL` | **server secret** | unset | JSON webhook alternative |
| `CONTACT_WEBHOOK_SECRET` | server secret | unset | Sent as `X-EmotiveArc-Secret` |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | public | unset | `plausible`. Off until approved |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` / `_SRC` | public | unset | Plausible settings |

## Appendix 2: adding the sample assets

1. Put the two PDFs in `public/sample/` with the exact names in section E. Check they
   contain no client data, private datasets, credentials or internal MotiveLab material.
   Everything in `public/` is downloadable by anyone.
2. Fill in `excerpt` in `src/content/sample-audit.ts`, with `findingId: "F01"` and wording
   copied verbatim from the approved report.
3. Run `npm run check` and `npm run test:e2e`, then commit.

## Appendix 3: staging deployment (needs founder approval and a Vercel account)

1. vercel.com → sign in with GitHub → Add New → Project → import
   `TheAwesomeAndy/eMotiveArc`. Framework: Next.js. Root: repository root. No other
   settings needed.
2. Leave `NEXT_PUBLIC_SITE_STAGE` unset, so the deployment is a non-indexed preview with
   the ribbon visible.
3. Optionally set `CONTACT_WEBHOOK_URL` to a test receiver to exercise delivery.
4. After deploying, run `BASE_URL=<preview URL> npm run test:e2e`.

## Appendix 4: repository hygiene

`.gitignore` blocks `.env*` (except `.env.example`), build output, and research or client
paths (`/motivelab`, `/research`, `/private`, `/datasets`, `/experiments`, `/evaluations`,
`/clients`, `/client-data`, `/transcripts`, `*.jsonl`, `*.parquet`, `*.sqlite`, `*.db`).
A staged-file scan for env files, PDFs and credential patterns ran before each commit: no
matches. MotiveLab research stays in its own private repository with its own `HANDOFF.md`.
