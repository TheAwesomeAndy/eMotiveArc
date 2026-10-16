# EmotiveArc website: engineering handoff

Source of truth for reviewing the EmotiveArc public website. Everything needed to verify
the claims below is in this repository. Nothing depends on the Claude Code conversation.

---

## A. Version and identification

| | |
| --- | --- |
| Date | 2026-10-16 |
| Milestone | Revision 4: staging verification attempt, PDF corrections, preview-accurate copy, launch-blocker list |
| Repository | https://github.com/TheAwesomeAndy/eMotiveArc |
| Branch | `claude/emotivearc-website-launch-4dcl0p` |
| Reviewed code commit | `c8b498f3acc5d889538d3c4d0ca52e122963989e` |
| Handoff commit | The commit that adds this file version (documentation only) |
| Previous reviewed commit | `db3d4024f4ab08f625c5669dbc2885bff321fff4` (code at `a4aa890`) |
| Diff since last review | https://github.com/TheAwesomeAndy/eMotiveArc/compare/db3d4024f4ab08f625c5669dbc2885bff321fff4...c8b498f3acc5d889538d3c4d0ca52e122963989e |
| Authorization | [Issue #1](https://github.com/TheAwesomeAndy/eMotiveArc/issues/1): $0 non-production staging only. No commercial launch |
| Current state | **Staging deployed by the founder on Netlify Free. Engineering could not verify it** (see C). Not production-ready |

### Staging deployment (founder-managed)

| | |
| --- | --- |
| Host | Netlify Free (founder account; engineering has no access) |
| Deploy permalink (immutable) | `https://6ad27de1cb377b058cf5c12f--sensational-cranachan-560be5.netlify.app/` |
| Stable site URL | `https://sensational-cranachan-560be5.netlify.app/` |
| Deployed commit | **Not confirmed.** The permalink was created after `db3d402` was pushed, so it most likely runs `db3d402`, but that's an inference. It does **not** include this revision's fixes. A new deploy of `c8b498f` or later is needed (Netlify creates one automatically if continuous deployment is on for this branch) |
| Access protection | Founder reports that a fresh incognito window asks for a password. **Not verified by engineering**, and the protection mechanism (app gate vs. Netlify feature) is unconfirmed |
| Configuration (expected per Issue #1) | `STAGING_ACCESS_PASSWORD` set privately; `NEXT_PUBLIC_SITE_STAGE` unset or `preview`; no `CONTACT_*`, `RESEND_*` or analytics variables. **Not visible to engineering** |

### What changed since `db3d402`

1. **Full sample report:** the broken sentence on **page 7** is fixed (my earlier note said
   page 6, which was wrong; Arc's page 7 is correct). MotiveLab is replaced by EmotiveArc
   on pages 1, 6 and 7.
2. **Overview:** "available on request" now reads "available on the EmotiveArc website".
3. **`/privacy`:** preview-aware. It no longer tells readers to contact us through a form
   that can't deliver.
4. **`/contact`:** preview-aware "What happens next".
5. **Site sample labels** no longer cite MotiveLab. The Research section still explains
   MotiveLab as EmotiveArc's research program.
6. **e2e:** new checks for the preview-accurate privacy and contact copy.

---

## B. Work completed

### PDF corrections

Edited with PyMuPDF redaction (old text removed from the file, not covered), then re-set
in Times regular and bold. Liberation Serif, the PDFs' original font, is metric-compatible
with Times, so line widths match. A word-level `pdftotext` diff against the previous
versions shows **only** the changes below. Page counts are unchanged (8 and 2).
`MotiveLab` and "on request" occur 0 times in either file.

| File | Page | Before | After |
| --- | --- | --- | --- |
| Full report | 1 | "made to show what a MotiveLab audit delivers" | "made to show what an EmotiveArc audit delivers" (paragraph re-wrapped within its 3 lines) |
| Full report | 6 | "API calls by MotiveLab" | "API calls by EmotiveArc" |
| Full report | 6 | "Claude (MotiveLab development assistant), an AI assistant. **No independent human reviewed this report.**" | Same, with "EmotiveArc development assistant" |
| Full report | 7 | "…Claude (MotiveLab development assistant), an AI assistant. **No independent human reviewed this report.** read every flagged conversation and decided…" | "…Claude (EmotiveArc development assistant), an AI assistant, read every flagged conversation and decided what appears here, as a finding, an observation, or not at all. **No independent human reviewed this report.**" |
| Overview | 1 | "The full sample report is available on request." | "The full sample report is available on the EmotiveArc website." |

Overview page 2 (retention and contact) is unchanged from revision 3. The F01 pages (2–3)
are untouched, and the site excerpt still matches the PDF text verbatim (13 of 13
strings).

| Published file | SHA-256 |
| --- | --- |
| `public/sample/emotivearc-sample-audit-captain-ivy-marlow.pdf` | `ea16e4dfe3ffa1d36e90deb31e19dccd5ec8de634374fa826a55d6ea6c5a0bbe` |
| `public/sample/emotivearc-audit-overview.pdf` | `03b6d6caae9ca4728bc803aaf192bdb09b45990e7c66c059076bbb2d6f1d4a78` |

**Note for the founder:** the full report is no longer byte-identical to your upload. If
you keep a source document, apply the same four wording changes there, so a future
regeneration doesn't reintroduce the errors.

### Preview-accurate copy

| Page | In preview mode (no delivery configured) | Once delivery is configured |
| --- | --- | --- |
| [`/privacy`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/c8b498f3acc5d889538d3c4d0ca52e122963989e/src/app/privacy/page.tsx) | Adds: "While this site is in preview, the inquiry form doesn't send or store anything…" Contact section: "There isn't a working way to contact us through this website yet: the contact form is in preview mode and doesn't deliver messages." | Original wording, pointing to the contact form |
| [`/contact`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/c8b498f3acc5d889538d3c4d0ca52e122963989e/src/app/contact/page.tsx) | "Once our inbox is live, we'll reply by email… While this site is in preview, the form doesn't deliver messages…" | "We reply by email to arrange a short scoping conversation…" |

Both switch automatically from the same delivery check the form uses, so they can't
contradict it.

### Unchanged and still in force

- Preview ribbon and `noindex`, robots disallow, and the optional Basic Auth gate.
- Inquiry handling: credential rejection, content-free logs, `sourcePath` allowlist, and
  "treat it as not sent" failure wording.
- F01 excerpt shown after the AI-review disclosure.

---

## C. Evidence and testing

### Live Netlify staging: NOT tested by engineering

**Blocked.** This build environment's network policy denies outbound connections to the
Netlify hosts. The egress proxy refused HTTPS `CONNECT` with **403** for
`6ad27de1cb377b058cf5c12f--sensational-cranachan-560be5.netlify.app` and
`sensational-cranachan-560be5.netlify.app`, on every path tried:

> `/`, `/contact`, `/sample-report`, `/privacy`, `/data-handling`, `/robots.txt`,
> `/sitemap.xml`, both PDFs, `/opengraph-image`, `/icon.svg`

Those 403s come from this environment's proxy, **not from Netlify**. They say nothing
about the site's access gate. **No anonymous or authenticated test of the deployed site
has been executed by engineering.** No staging credentials were requested or received.

**To unblock (founder, about 2 minutes, $0):**

1. In this Claude Code cloud environment's settings (environment menu → Edit → Network
   access), add `sensational-cranachan-560be5.netlify.app` and the deploy-permalink host
   to Allowed domains. Wildcard support for `*.netlify.app` may vary.
2. In the same settings, add an environment variable **`E2E_BASIC_AUTH`** with the value
   `<user>:<password>` for the staging gate. **Don't put it in chat, GitHub or the
   handoff.** A new session picks it up.
3. Ask engineering to run the live suite. Engineering will then execute:
   `BASE_URL=https://sensational-cranachan-560be5.netlify.app npm run test:e2e`
   (it reads `E2E_BASIC_AUTH` from the environment), plus anonymous `curl` checks and
   screenshots.

### Local production build, run at `c8b498f`

Linux, Node 22.22.0, Chromium 141.0.7390.37 headless.

| Command | Result |
| --- | --- |
| `npm run lint` | Pass, 0 errors, 0 warnings |
| `npm run typecheck` | Pass |
| `npm test` | **28 passed, 0 failed** |
| `npm run build` | Pass |
| `npm run test:e2e` (open server) | **113 passed, 0 failed** |
| `npm run test:e2e` (`STAGING_ACCESS_PASSWORD` set, `E2E_BASIC_AUTH` used) | **115 passed, 0 failed** |
| Anonymous `curl` to the gated server: `/`, `/contact`, `/privacy`, `/robots.txt`, both PDFs | All **401** |
| Authenticated `/robots.txt` | `User-Agent: *` / `Disallow: /` |
| Authenticated `/` | `<meta name="robots" content="noindex, nofollow"/>` |
| Server-log leak scan after both e2e runs | **0** occurrences of submitted test values or the gate password |

The e2e suite covers:
- desktop 1440 and mobile 390 layouts with no overflow
- the mobile menu, and every link and anchor
- axe (0 serious or critical issues)
- both PDFs served as real PDFs
- F01 and the disclosure on `/` and `/sample-report`
- the form: preview warning before submit, the "not sent / not stored" outcome, kept text, validation, credential block (0 POSTs) and the honeypot
- **new:** preview-accurate `/privacy` and `/contact` copy

**What this proves:** the code at `c8b498f` behaves correctly on a standard Next.js server.
**What it doesn't prove:** that Netlify's OpenNext runtime executes the proxy gate and the
Server Action the same way. That needs the live run above.

### Reproduce

```bash
git checkout c8b498f3acc5d889538d3c4d0ca52e122963989e
npm ci && npm run check
npm start &   BASE_URL=http://localhost:3000 npm run test:e2e
STAGING_ACCESS_PASSWORD=x PORT=3001 npm start &   BASE_URL=http://localhost:3001 E2E_BASIC_AUTH=preview:x npm run test:e2e
pdftotext public/sample/emotivearc-sample-audit-captain-ivy-marlow.pdf - | grep -c MotiveLab   # 0
sha256sum public/sample/*.pdf
```

---

## D. Commercial and scientific integrity

**Customer-facing assertions changed:** only the PDF wording and the preview-mode copy
listed in B. No claims about psychological continuity, research validation, model
performance, romance evaluation or client results changed.

**Standing reminders:**
- F01 is an AI-reviewed demonstration and a **commitment/preference persistence**
  finding. It isn't evidence for the emotional or path-dependent continuity thesis
  (Arc's caveat, accepted).
- The site and PDFs say plainly that no independent human reviewed the sample.
- The overview's "Every finding reviewed by a named human reviewer" and the site's
  "Human-reviewed findings" describe paid audits. **A named reviewer must exist before
  the first sale** (blocker O1 below).

---

## E. Blockers to accepting the first $750 customer

Only items that genuinely stop the first paid engagement. **None needs website
redesign.**

### Technical (engineering, $0 once decided)

| # | Blocker | Status / needs |
| --- | --- | --- |
| T1 | **A monitored inquiry channel.** The form delivers nothing today | Founder chooses a destination. $0 options: **(a)** publish an existing monitored address via `NEXT_PUBLIC_CONTACT_EMAIL`; **(b)** a free webhook receiver (for example a Google Apps Script web app forwarding to the founder's Gmail) via `CONTACT_WEBHOOK_URL`. Resend needs a verified domain, which means buying one. Engineering then configures and tests end to end in under a day |
| T2 | **Live staging QA on Netlify** | Blocked on the network allowance and `E2E_BASIC_AUTH` (section C) |
| T3 | **Go-live switch** | Config only: remove `STAGING_ACCESS_PASSWORD`, set `NEXT_PUBLIC_SITE_STAGE=live` and `NEXT_PUBLIC_SITE_URL`. Needs founder authorization |

### Legal (founder + counsel)

| # | Blocker |
| --- | --- |
| L1 | **A written client agreement** for the $750 audit: scope, fee, timeline target, access method, confidentiality, data retention and deletion, report ownership and use, liability limits and no-guarantee language, and adult-content boundaries for romance work. Retention is still "proposed" everywhere until this exists |
| L2 | **Finalized privacy notice and data-handling page**: legal name, provider names (Netlify, the delivery channel), retention period, and a contact route |
| L3 | **Legal identity for contracting and invoicing** (entity or sole proprietor) and whether to trade as "EmotiveArc" before brand clearance. Full trademark clearance can follow the first sale if counsel agrees |

### Financial (founder)

| # | Blocker |
| --- | --- |
| F1 | **A way to be paid $750**: invoice plus bank transfer, or a payment processor's invoicing. Processors typically charge per transaction rather than monthly. Confirm current fees before choosing |
| F2 | **Audit model costs.** Running a client's scenarios calls a language model. The sample cost under $1, but each paid audit needs either client-provided access or founder-approved model spend |

### Founder and operational

| # | Blocker |
| --- | --- |
| O1 | **The named human reviewer** promised in the offer, and capacity to meet the 5-business-day target |
| O2 | **Audit delivery readiness:** the MotiveLab tooling that runs client scenarios lives outside this repository and hasn't been assessed here |
| O3 | **Go-live approval.** A custom domain is optional for a first sale: the free `netlify.app` URL works but is less credible |

**Not blockers for the first customer:** custom domain, analytics, CSP header, an
emotional-continuity sample example, Safari and Firefox testing (desirable before broad
marketing), and the `npm audit` dev-tool advisories.

---

## F. Founder decisions

1. **Unblock live QA:** allow the Netlify hosts in this environment's network settings,
   and store `E2E_BASIC_AUTH` there as an environment variable (section C). $0.
2. **Choose the inquiry destination** (T1). $0 options listed.
3. **Commission the client agreement and privacy review** (L1, L2), and decide the
   contracting identity (L3).
4. **Choose a payment method** (F1), and decide who pays model costs per audit (F2).
5. **Name the human reviewer** (O1).
6. **Approve the corrected PDFs** (section B), and update your source documents to match.

---

## G. Questions for ChatGPT

1. Is the founder-observed incognito password prompt, without engineering verification,
   sufficient to share the staging link with a small trusted group before the live e2e
   run? Or should sharing wait for T2?
2. Do the PDF corrections in section B resolve the publication-polish items from your
   revision 3 review?
3. Is the E-section blocker list complete for a first $750 engagement sold through direct
   outreach, using the PDFs and the staging link?
4. For T1, is publishing an existing monitored email address an acceptable first channel,
   given the privacy notice must then name it?

---

## Appendix 1: environment variables

| Variable | Where | Staging value |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_STAGE` | Netlify | unset or `preview` (`live` needs authorization) |
| `STAGING_ACCESS_PASSWORD` / `STAGING_ACCESS_USER` | Netlify, private | set / optional (default `preview`) |
| `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_DISCOVERY_CALL_URL` | Netlify | unset |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET` | Netlify, private | **unset** |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER`, `NEXT_PUBLIC_PLAUSIBLE_*` | Netlify | unset |
| `E2E_BASIC_AUTH` | **Claude Code environment only**, private | `<user>:<password>`, for running the live suite |

Pages are prerendered, so Netlify needs a redeploy after changing a `NEXT_PUBLIC_*`
variable. The gate reads `STAGING_*` at request time.

## Appendix 2: founder manual checklist for the live staging site

Use a fresh private window, on the **stable** URL after the newest deploy finishes.

- [ ] A password prompt appears before anything loads, including for
      `/sample/emotivearc-audit-overview.pdf` opened directly
- [ ] "PREVIEW BUILD" ribbon on every page
- [ ] Homepage on a phone: headline, $750 price box, both buttons, diagram. Menu opens and
      closes
- [ ] Sample section: "How this sample was produced" box above the F01 transcript. Both
      download buttons open PDFs
- [ ] Full report page 7: the "How we tested" last bullet reads correctly and says
      EmotiveArc. Overview page 1 ends "available on the EmotiveArc website"
- [ ] `/contact`: "Preview mode" notice. After a test submission, the message says
      nothing was sent or stored
- [ ] `/privacy`: says the preview form doesn't send or store anything
- [ ] `/robots.txt` shows `Disallow: /`
- [ ] In Netlify, delete the older deploy permalink if it shouldn't stay reachable. Note
      the PDFs are public in the GitHub repository regardless

## Appendix 3: repository hygiene

`.gitignore` blocks `.env*` (except `.env.example`), build output and research or client
paths. Staged files were scanned for env files and credentials before each commit. No
staging password, account token or client data exists in this repository or in the issue
thread.
