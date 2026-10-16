# EmotiveArc website: engineering handoff

Source of truth for reviewing the EmotiveArc public website. Everything needed to verify
the claims below is in this repository. Nothing depends on the Claude Code conversation,
local files or unpushed work.

---

## A. Version and identification

| | |
| --- | --- |
| Date | 2026-10-16 |
| Milestone | Revision 3: approved sample audit, Issue #1 fixes, staging readiness |
| Repository | https://github.com/TheAwesomeAndy/eMotiveArc |
| Branch | `claude/emotivearc-website-launch-4dcl0p` |
| Reviewed code commit | `a4aa89077c3658549403dd7525efc539524c313a` |
| Handoff commit | The commit that adds this file version (documentation only) |
| Previous reviewed commit | `3e89678b69da01f7aa11564895cf39af1d7148ec` (code at `2b404ff`) |
| Diff since last review | https://github.com/TheAwesomeAndy/eMotiveArc/compare/3e89678b69da01f7aa11564895cf39af1d7148ec...a4aa89077c3658549403dd7525efc539524c313a |
| Authorization | [Issue #1](https://github.com/TheAwesomeAndy/eMotiveArc/issues/1): founder approved a **non-production** staging preview only |
| Current state | **Staging-ready. Not deployed. Not production-ready.** |

**Staging deployment status: blocked, not deployed.** This build environment has no
Vercel, Netlify or Cloudflare account access, and Issue #1 says to stop if a host needs
founder sign-in or payment. **No staging URL exists.** Exact setup steps are in
Appendix 3. Nothing was purchased, published, or sent to anyone.

### What changed since `3e89678`

1. **Approved sample assets integrated** (founder-supplied, reviewed before commit). Both
   PDFs added, F01 excerpt on the homepage and `/sample-report`, disclosure aligned with
   the report.
2. **Prospect sheet retention wording updated** in the PDF itself (page 2 only).
3. **`sourcePath` allowlisted** before logging or delivery, with regression tests.
4. **Failure wording corrected.** It no longer claims nothing was saved after a provider
   was contacted.
5. **Preview mode never implies delivery,** including on the spam-handling paths.
6. **Optional staging access gate** (HTTP Basic Auth), free and host-independent.
7. **Site copy aligned with the approved overview** on what clients share at kickoff.

---

## B. Work completed

### Sample audit assets

| Published file | Source | Changes | SHA-256 |
| --- | --- | --- | --- |
| [`public/sample/emotivearc-sample-audit-captain-ivy-marlow.pdf`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/a4aa89077c3658549403dd7525efc539524c313a/public/sample/emotivearc-sample-audit-captain-ivy-marlow.pdf) | Founder upload, 8 pages | **None.** Byte-identical to the upload | `5a7465f463d04ad5ffe820a8b83a66c3b9dc59d3baf4380bcef262e0db6d7342` |
| [`public/sample/emotivearc-audit-overview.pdf`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/a4aa89077c3658549403dd7525efc539524c313a/public/sample/emotivearc-audit-overview.pdf) | Founder upload, 2 pages | Page 2 only, see below. Page 1 text verified identical | `1400d029ceec83824fb05c8d0b3d22e640bc9ea3f729c9a50876551d7afc2c70` |

**Overview edits** (made with PyMuPDF redaction, so the old text is **removed from the
file**, not covered. `pdftotext` finds 0 occurrences of the old wording):

| | Before | After |
| --- | --- | --- |
| "Your data" box | "Used only for your audit, kept for 90 days by default, and never used for research or other clients without written permission." | "Used only for your audit, and never used for research or other clients without written permission. Proposed default retention: 90 days, confirmed in your written agreement. Deletion is not automated. Terms pending approval." |
| Contact line | "Contact: [Founder to add contact details]" | "Contact: use the inquiry form on the EmotiveArc website." |

Document metadata title set to "EmotiveArc Character Continuity Audit: overview". The
new box text is set at 9.2pt (originally 10.1pt) to fit the existing box.

**Pre-commit review of both PDFs:** invented character, fictional client, no real
customer data, no credentials or email addresses, no system-prompt text (the report
states only its length, 469 characters). The full report discloses on page 1 that an AI
assistant, not an independent human, reviewed it.

**F01 excerpt.** [`src/content/sample-audit.ts`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/a4aa89077c3658549403dd7525efc539524c313a/src/content/sample-audit.ts)
holds the finding title, labels (Medium · Observed behaviour · Commitments and
boundaries), setup, the six transcript lines, the "12 turns of other conversation" gap,
the finding, the report's own qualification ("we count only the 12-turn run as a
failure") and the proposed intervention, labeled "not yet tested". Every string was
checked against the PDF's extracted text. 13 of 13 match verbatim, including straight
quotes and em dashes.

**Disclosure** now mirrors page 1 of the report and appears **before** the excerpt:
*"This is a sample audit of an invented character from an invented company. The character
ran on a real low-cost language model. An AI assistant reviewed the flagged
conversations, not an independent human. It is not a customer result. In a paid audit,
a named human reviewer does this work."*

### Issue #1 code fixes

| File | Change |
| --- | --- |
| [`src/lib/inquiry-handler.ts`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/a4aa89077c3658549403dd7525efc539524c313a/src/lib/inquiry-handler.ts) | `sanitizeSourcePath`: only `/`, `/contact` and `/sample-report` pass. Anything else becomes `other` before logs or delivery. New failure, preview and too-fast messages. Honeypot outcome is mode-aware |
| [`src/lib/access-gate.ts`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/a4aa89077c3658549403dd7525efc539524c313a/src/lib/access-gate.ts), [`src/proxy.ts`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/a4aa89077c3658549403dd7525efc539524c313a/src/proxy.ts) | **New.** HTTP Basic Auth on every request (pages, PDFs, robots.txt) when `STAGING_ACCESS_PASSWORD` is set. Constant-time comparison. A 401 carries `X-Robots-Tag: noindex` and `Cache-Control: no-store`. Off when unset |
| [`src/components/sample-excerpt.tsx`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/a4aa89077c3658549403dd7525efc539524c313a/src/components/sample-excerpt.tsx) | Renders the full F01 structure as one transcript. Labels stack above lines on phones |
| [`tests/e2e/smoke.mjs`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/a4aa89077c3658549403dd7525efc539524c313a/tests/e2e/smoke.mjs) | `E2E_BASIC_AUTH` support, anonymous-401 checks, PDF and F01 checks, mode-aware honeypot check |

### Inquiry behavior (current)

| Situation | Visitor sees | Delivered |
| --- | --- | --- |
| Preview (no provider; current staging config) | Warning banner before submitting, then: "This form is in preview mode, so your inquiry was not sent to anyone, and this website did not store it…" Text kept | No |
| Provider succeeds | "Inquiry received… Reference: XXXXXXXX" | Yes |
| Provider fails or times out | "We couldn't confirm that your inquiry was delivered, so please treat it as not sent. This website doesn't keep a copy, and your details are still in the form. Please wait a minute and press send again…" | Unknown to us. Told to treat it as not sent |
| Credential detected | Field error. Blocked in the browser (0 requests) and on the server | No |
| Honeypot filled | Preview mode: the preview notice. Delivery configured: fake success | No |
| Submitted in under 3 s | "That was quicker than we expected, so we didn't send it. Please check your details and press send again." | No |

Server logs hold JSON metadata only: event, reference, mode, next step, sanitized source
path, message length, field presence, and provider status code.

### Fully implemented vs. not

| Item | Status |
| --- | --- |
| Marketing site, brand, SEO, sample section with real assets | Implemented |
| Inquiry form, validation, credential rejection, anti-spam, log hygiene | Implemented |
| Staging access gate | Implemented, off until `STAGING_ACCESS_PASSWORD` is set |
| Email (Resend) and webhook delivery | Implemented, **unconfigured**. Verified with a fake `fetch` and a local mock only |
| Staging deployment | **Not done.** Needs a host account (Appendix 3) |
| Analytics | Integration point only. Off |
| Privacy and data-handling pages | Drafts, pending legal review |
| Hero diagram, "The problem" cards | Illustrative, labeled on the page |

---

## C. Evidence and testing

Run on 2026-10-16 against `a4aa890` in the build container (Linux, Node 22.22.0, Chromium
141.0.7390.37 headless).

| Command | Result |
| --- | --- |
| `npm run lint` | Pass, 0 errors, 0 warnings |
| `npm run typecheck` | Pass |
| `npm test` | **28 passed, 0 failed** (10 validation, 15 handler, 3 access gate) |
| `npm run build` | Pass. All pages static. Proxy compiled |
| `npm run test:e2e` (open server) | **110 passed, 0 failed** |
| `npm run test:e2e` with `STAGING_ACCESS_PASSWORD` set and `E2E_BASIC_AUTH` | **112 passed, 0 failed** (adds the two anonymous-401 checks) |
| `npm audit --omit=dev` | 0 vulnerabilities in shipped dependencies |

**New tests in this revision:**

- **`sourcePath` allowlist** with 6 hostile values (query string, injected JSON line,
  `javascript:`, external URL, 5,000 characters, empty) and `null`. A forged value
  reaches neither the delivered payload nor the logs, and every log line still parses as
  a single JSON object.
- **Mutation check:** removing the sanitizer fails the forged-`sourcePath` test (27 of
  28). Restoring it gives 28 of 28.
- **Failure wording:** asserts "couldn't confirm…", "treat it as not sent", and the
  absence of "saved anywhere".
- **Honeypot:** fake success with delivery configured, preview notice in preview mode.
- **Too-fast:** retry message, no delivery.
- **Access gate:** off by default, default user name, exact-match only, rejects wrong
  user or password, missing header, Bearer, malformed base64 and no colon. Passwords
  containing colons work.
- **e2e:** both PDFs return 200 with `application/pdf` and a `%PDF-` header. F01 and
  the disclosure are visible on `/` and `/sample-report`, there are no placeholders, and
  the full report is linked. Anonymous requests to `/` and `/robots.txt` return 401.

**Accessibility:** axe-core, 0 serious or critical violations on all five pages at
1440px. Layout checked at 1440×900 and 390×844 (no horizontal overflow, mobile menu
works), and the F01 block was inspected in screenshots at both widths.

**Manual checks:** wrong password returns 401 and an anonymous PDF request returns 401.
A server-log scan after both e2e runs found **0 occurrences** of any submitted test
value or the gate password.

**Not verified:**
- staging-host behavior (no deployment exists)
- real Resend delivery
- Safari and Firefox
- screen readers

### Reproduce

```bash
git checkout a4aa89077c3658549403dd7525efc539524c313a
npm ci
npm run check                                    # lint, typecheck, 28 tests, build
npm start &                                      # :3000
BASE_URL=http://localhost:3000 npm run test:e2e  # needs Chromium: npx playwright install chromium

# Gated run
STAGING_ACCESS_PASSWORD=pick-one PORT=3001 npm start &
BASE_URL=http://localhost:3001 E2E_BASIC_AUTH=preview:pick-one npm run test:e2e

# Verify the PDF edit
pdftotext public/sample/emotivearc-audit-overview.pdf - | grep -c "kept for 90 days by default"   # 0
sha256sum public/sample/*.pdf
```

---

## D. Commercial and scientific integrity

### Customer-facing assertions changed in this revision

| Location | Change | Basis |
| --- | --- | --- |
| Homepage and `/sample-report` | **New:** the F01 finding, transcript, qualification and untested intervention | Verbatim from the approved report |
| Sample disclosure | Reworded to mirror page 1 of the report. Now also states "invented company" and "not a customer result". Moved above the excerpt | Approved report |
| Sample section lede | "…an invented character from an invented company" | Approved report |
| FAQ: "Do you need our system prompt…?" | **Corrected.** Was "we don't ask for your internal prompts" (an engineering inference that contradicted the approved overview). Now: "Never through this website. For the audit itself, we normally work from your character's system prompt and model access, shared through a secure method we agree during scoping… If you'd rather not share them, you can run our scenario scripts yourself." | Approved overview, "How it works", Day 1 |
| Audit section, "What we'll need from you" | Same correction, same basis | Approved overview |
| Overview PDF, "Your data" and "Contact" | As in section B | Retention per Issue #1. Contact line is engineering wording |
| Form messages | Failure, preview and too-fast wording | Issue #1 |

### Claims needing independent review

- **F01** is a finding from an **AI-reviewed demonstration** on a real low-cost model
  (`deepseek/deepseek-v4.1-flash`), with automated screening by
  `anthropic/claude-sonnet-5.5`. It is **not** human-reviewed and **not** a customer
  result. The site says so before the excerpt.
- The report's "Medium" severity and "Observed behaviour" label are the AI reviewer's
  judgement.
- The F01 intervention is a proposal, labeled "not yet tested".
- **Unchanged since the last review:** the research levels (not presented as
  validated), Romance & Intimacy (offline fixtures only), the illustrative examples, the
  memory-architecture hypothesis, and the "15–20 scenarios / 5-business-day target /
  one retest" offer terms.

### Inconsistencies found in the approved PDFs (not edited by engineering)

| PDF | Issue | Severity |
| --- | --- | --- |
| Full report, p. 6, "How we tested" | Template glitch: "Claude (MotiveLab development assistant), an AI assistant. No independent human reviewed this report. read every flagged conversation…" | Medium (credibility) |
| Full report, p. 1 | Calls it "a MotiveLab audit", while the public brand is EmotiveArc | Medium |
| Overview, p. 1 | "The full sample report is available on request", but the website now hosts it | Low |

---

## E. Limitations and blockers

| Severity | Issue | Needs |
| --- | --- | --- |
| **Critical** (public launch only) | Inquiry delivery unconfigured. The form is honest about it, but no lead reaches anyone | External account + founder approval |
| **High** | **No staging deployment.** No host account is available to engineering | Founder: host account and terms decision (Appendix 3) |
| **High** | Legal review of `/privacy`, `/data-handling`, and the retention wording now in the overview PDF | Legal decision |
| **High** | Brand and domain clearance, monitored mailbox | Founder + external accounts |
| Medium | Full report p. 6 glitch and MotiveLab naming | Founder: regenerate the approved PDF |
| Medium | Overview contact line is engineering wording | Founder approval |
| Medium | Rate limit is in-memory. Credential detection is pattern-based. No CSP | Engineering, later |
| Medium | Real Resend delivery, Safari, Firefox and screen readers untested | Account / devices |
| Low | Overview "available on request" line. 5 dev-only `npm audit` advisories. Generic OG image | Optional |

No known critical security, privacy or data-loss defect in code at `a4aa890`.

---

## F. Founder decisions

1. **Choose a staging host and sign in** (Appendix 3). Vercel's free Hobby plan is, to
   my knowledge, limited to non-commercial use, so a commercial company's staging may
   require Pro (paid). Please confirm current terms on the host's site. I can't verify
   them from here.
2. **Approve the edited overview PDF**, including the new contact line.
3. **Regenerate the full report** to fix the p. 6 sentence, and decide whether it should
   say EmotiveArc rather than MotiveLab.
4. **Legal review** of the retention wording and policy pages.
5. **Inquiry delivery destination**, when ready to collect real leads.

---

## G. Questions for ChatGPT

1. Is showing an AI-reviewed demonstration finding (F01) on the homepage acceptable for a
   service that sells human review, given the disclosure appears first? Or should the
   excerpt live only on `/sample-report`?
2. Is the replacement overview contact line ("use the inquiry form on the EmotiveArc
   website") acceptable while no public URL is confirmed?
3. Do the corrected FAQ and audit "What we'll need from you" texts now match the approved
   overview's Day 1 kickoff accurately?
4. For staging, is HTTP Basic Auth sufficient access protection, or should the founder
   use the host's built-in protection instead or as well?

---

## Appendix 1: environment variables

Template: `.env.example`. Pages are prerendered, so redeploy after changes. The proxy
reads `STAGING_ACCESS_*` at request time.

| Variable | Scope | Default | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_STAGE` | public | `preview` | Keep `preview` for staging (ribbon, `noindex`, robots disallow). `live` needs separate founder authorization |
| `STAGING_ACCESS_PASSWORD` | **server secret** | unset | Turns on the access gate. Set for staging |
| `STAGING_ACCESS_USER` | server | `preview` | Gate user name |
| `NEXT_PUBLIC_SITE_URL` | public | host URL | Canonical URL. Leave unset on staging |
| `NEXT_PUBLIC_CONTACT_EMAIL` | public | unset | Only once a monitored mailbox exists |
| `NEXT_PUBLIC_DISCOVERY_CALL_URL` | public | unset | Optional booking link |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | server | unset | Email delivery. **Leave unset on staging** |
| `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET` | server | unset | Webhook delivery. **Leave unset on staging** |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER`, `NEXT_PUBLIC_PLAUSIBLE_*` | public | unset | Off until approved |

## Appendix 2: updating sample assets

Replace files in `public/sample/` using the same names, re-run the excerpt check (every
string in `src/content/sample-audit.ts` must appear in `pdftotext` output), then
`npm run check` and `npm run test:e2e`. Everything in `public/` is downloadable by anyone
who can open the site.

## Appendix 3: staging deployment steps (founder)

Recommended host: Vercel, which runs this Next.js app with no configuration.

1. Sign in at vercel.com with GitHub. Confirm the plan and terms are acceptable for a
   commercial company's staging site (see F1). **Don't enter payment details unless you
   have separately approved the cost.**
2. **Add New → Project → import `TheAwesomeAndy/eMotiveArc`.** Framework: Next.js. Root
   directory: repository root. Build command and output: defaults.
3. **Production branch:** the repo has only `claude/emotivearc-website-launch-4dcl0p`,
   so Vercel will treat it as production. That's fine for staging because the site
   stays in preview mode. Don't attach a custom domain.
4. **Environment variables** (Settings → Environment Variables, all environments):
   - `STAGING_ACCESS_PASSWORD` = a long random string, shared privately with reviewers
   - optionally `STAGING_ACCESS_USER` = `preview`
   - **do not set** `NEXT_PUBLIC_SITE_STAGE`, any `CONTACT_*`, `RESEND_*` or analytics
     variable
5. Deploy, then redeploy once after adding the variables.
6. Optionally also enable the host's own deployment protection, if available on your plan.
7. Verify (or send engineering the URL and password):

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://<staging-url>/        # expect 401
BASE_URL=https://<staging-url> E2E_BASIC_AUTH=preview:<password> npm run test:e2e
```

**Manual checklist for Arc:**

- [ ] Browser asks for a password before showing anything
- [ ] "PREVIEW BUILD" ribbon on every page
- [ ] Hero, $750 price box and diagram render at desktop and phone width
- [ ] Mobile menu opens and closes
- [ ] Sample section: disclosure above the F01 excerpt, and both PDF buttons download
- [ ] Overview PDF page 2 shows the new retention wording
- [ ] Contact form shows "Preview mode" before submitting, and after submitting says
      nothing was sent or stored
- [ ] Pasting `sk-ant-api03-abcdefghijklmnopqrstuvwxyz012345` into the message blocks
      submission
- [ ] `/robots.txt` (after login) shows `Disallow: /`

## Appendix 4: repository hygiene

`.gitignore` blocks `.env*` (except `.env.example`), build output and research or client
paths. Before each commit a staged-file scan checked for env files and credential
patterns. Both PDFs were reviewed in full before being committed. No MotiveLab research
archive, dataset, system prompt or client data is in this repository.
