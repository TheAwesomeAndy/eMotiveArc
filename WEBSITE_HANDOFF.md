# EmotiveArc website: engineering handoff

Source of truth for reviewing the EmotiveArc public website. Everything needed to verify
the claims below is in this repository. Nothing depends on the Claude Code conversation.

---

## A. Version and identification

| | |
| --- | --- |
| Date | 2026-10-16 |
| Milestone | Revision 6: full-spectrum copy patch from Arc's revision 5 review (content only). Builds on revision 5 |
| Repository | https://github.com/TheAwesomeAndy/eMotiveArc |
| Branch | `claude/emotivearc-website-launch-4dcl0p` |
| Reviewed code commit | `b96641d6366ab7a4470807e87395672406c99f72` |
| Handoff commit | The commit that adds this file version (documentation only) |
| Previous reviewed commit | `d98a6c27913676377fcfd02c341cf4ef2591360b` (code at `f4fc81d`, revision 5) |
| Diff since last review | https://github.com/TheAwesomeAndy/eMotiveArc/compare/d98a6c27913676377fcfd02c341cf4ef2591360b...b96641d6366ab7a4470807e87395672406c99f72 |
| Authorization | [Issue #1](https://github.com/TheAwesomeAndy/eMotiveArc/issues/1): $0 password-protected staging only. No public launch |
| Current state | Staging-ready. **Live Netlify staging is still not verified by engineering** (C). Not production-ready |

**Scope of this revision:** a targeted messaging correction requested by the founder and
Arc. The site over-emphasized embarrassment and shyness. The central question is whether
earlier emotional and interpersonal experiences produce believable, character-specific
consequences and transformations later. **There are no changes to layout, brand, price,
visual identity, inquiry handling, the access gate, the PDFs or the F01 evidence.**

### Staging deployment (founder-managed, unchanged)

| | |
| --- | --- |
| Host | Netlify Free (founder account; no engineering access) |
| Stable site URL | `https://sensational-cranachan-560be5.netlify.app/` |
| Earlier deploy permalink | `https://6ad27de1cb377b058cf5c12f--sensational-cranachan-560be5.netlify.app/` (immutable, predates revisions 4–5) |
| Deployed commit | **Not confirmed by engineering.** If Netlify continuous deployment is on for this branch, the stable URL should rebuild from the latest push. The founder can confirm the commit in Netlify's deploy list |
| Access protection | Founder-observed only: a password prompt in a fresh incognito window |

---

## B. Work completed

### Revision 6 patch (`b96641d`)

Arc approved revision 5 in principle and asked for one copy patch: **full spectrum means
expansion, not removal.**

| Area | Change |
| --- | --- |
| What we evaluate | New compact row, "Scenarios can draw on experiences such as": Joy, Pride, Love, Trust, Encouragement, **Desire**, Grief, Anger, Betrayal, **Shame**, **Embarrassment**, **Humiliation**, Conflict and repair, Resilience. Followed by: "Positive, negative and mixed, alone or in sequence. We test what these experiences observably change in later behavior. We don't claim the character feels them." No single emotion organizes the section |
| Romance & Intimacy | "Attraction and anticipation" became **"Attraction, desire and anticipation"** ("whether attraction and erotic desire build, hold, or fade believably"). The tone card became **"Shame, embarrassment, humiliation"** ("leave believable, distinct traces… tell playful teasing from a moment that needs care"). The lede adds: "Desire, intimacy, shame, embarrassment and humiliation are distinct experiences. They can occur together or apart, and a coherent character shouldn't treat them as one." The offline-fixtures status box is unchanged |
| The Problem | "Loss is recalled, not felt" became **"Loss is recalled without its significance"**, so nothing implies subjective model feeling |
| Hero caption | Adds "One possible trajectory, for illustration: repair doesn't always restore trust." |
| Level 3 contrast | "A coherent character might agree in both cases…" became "Level 3 examines **when** histories like these should lead to meaningfully different later behavior, and whether they do. It doesn't assume that every difference in history must show up." |
| e2e | New checks: the range row includes Joy, Grief, Shame, Humiliation, Desire and Resilience; Romance names erotic desire; "not felt" wording is gone |

The hero and the six Problem cards are **not** reverted to embarrassment, nothing invented,
no founder-private material. `public/sample/` and `src/content/sample-audit.ts` are
unchanged since revision 5.

### Revision 5 record (`f4fc81d`), still in force except as amended above

All copy below is **illustrative**, written by engineering to explain the problem space.
None of it is an audit result. None uses the founder's private fictional characters,
prose or scenarios.

| Area | File | Before | After |
| --- | --- | --- | --- |
| Hero diagram | [`continuity-chart.tsx`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/f4fc81d1ec83140a39b8b41b05e7fe1a5bb2479e/src/components/continuity-chart.tsx) | Y-axis "guardedness"; one event, "An embarrassing moment"; end labels "Carries the consequence" / "Reverts to baseline" | Y-axis "trust". Trust builds from "first meeting", drops at **"A promise broken"**, recovers after **"A sincere apology"**. After "days later": **"Repair carries forward"** vs **"Back to day one"**. Caption: "Both versions can recall the apology. Only one behaves as if the relationship changed." "Illustrative" badge kept |
| The Problem | [`problem.tsx`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/f4fc81d1ec83140a39b8b41b05e7fe1a5bb2479e/src/components/sections/problem.tsx) | Six cards, two framed around embarrassment or awkwardness | Six cards, each tagged by kind: **Positive** (shared joy leaves no warmth; earned trust disappears), **Negative** (loss is recalled, not felt; betrayal has no consequence), **Evolving** (encouragement doesn't take hold), **Mixed** (conflict and repair collapse). Intro now says "good or bad… in a way that fits who the character is". "Illustrative failure patterns" note kept |
| What we evaluate | [`evaluate.tsx`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/f4fc81d1ec83140a39b8b41b05e7fe1a5bb2479e/src/components/sections/evaluate.tsx) | "Emotional continuity"; probe "Does embarrassment, hurt, or delight shape later tone?" | **"Emotional and psychological continuity"**: "whether meaningful experiences, good, bad or mixed, have believable consequences". Probes cover lasting effect, believable settling, and different histories leading to different responses. Relational card adds "After conflict, is repair possible, and does it leave a mark?" Lede: "consequences of experience… We don't score a checklist of emotions" |
| Romance & Intimacy | [`romance.tsx`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/f4fc81d1ec83140a39b8b41b05e7fe1a5bb2479e/src/components/sections/romance.tsx) | Eight areas including "Shyness and embarrassment" as its own category | Eight areas: attraction and anticipation; **love and attachment**; trust and vulnerability; **rejection and its aftermath**; developing intimacy; tone (teasing and reassurance, with shyness as one example trait); consent, permissions and boundaries; change after meaningful encounters. The "offline fixtures only, not validated" status box is unchanged |
| Research foundation | [`research.tsx`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/f4fc81d1ec83140a39b8b41b05e7fe1a5bb2479e/src/components/sections/research.tsx) | Level 3: "develop differently depending on the path of experiences" | Three levels preserved. Level 3: "depend on the whole sequence of experiences… not just the most recent one?" plus an **"Illustrative contrast"**: Sequence A (trust built → broken once → sincerely repaired) vs Sequence B (trust built → never tested), with the same later moment (asked to keep an important secret). "Active research / not a validated scientific standard" kept |
| Sample audit | [`sample-audit.ts`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/f4fc81d1ec83140a39b8b41b05e7fe1a5bb2479e/src/content/sample-audit.ts), `sample.tsx`, `sample-report/page.tsx` | Disclosure only | **Evidence unchanged.** Adds "What it demonstrates: F01 is a commitment and preference continuity finding, one of our supporting checks. It shows the audit format and evidence standard. It isn't evidence for our broader research into emotional and relational continuity." on both pages, under the AI-review disclosure |
| Tests | [`tests/e2e/smoke.mjs`](https://github.com/TheAwesomeAndy/eMotiveArc/blob/f4fc81d1ec83140a39b8b41b05e7fe1a5bb2479e/tests/e2e/smoke.mjs) | | New checks: hero describes broken promise and apology; the Problem includes Positive, Negative, Mixed and Evolving cards; scope note visible on `/` and `/sample-report` |

**Verified unchanged since `9616fbd`:**
- `git diff --stat 9616fbd -- public/sample/` is empty.
- Both PDF SHA-256 values match revision 4 (`ea16e4df…0bbe` and `03b6d6ca…4a78`).
- The only diff in `sample-audit.ts` is the added `scopeNote`. The F01 fields are
  byte-identical.

---

## C. Evidence and testing

### Live Netlify staging: still NOT tested by engineering

Unchanged from revision 4. This environment's network policy refuses HTTPS to the
Netlify hosts (egress proxy 403 on `CONNECT`), and no staging credential is available to
engineering. Unblock steps, unchanged: in this Claude Code environment's settings, allow
`sensational-cranachan-560be5.netlify.app` under Network access, and add a private
environment variable `E2E_BASIC_AUTH=<user>:<password>`. Then engineering runs
`BASE_URL=https://sensational-cranachan-560be5.netlify.app npm run test:e2e`.

### Local production build, run at `b96641d`

Linux, Node 22.22.0, Chromium 141.0.7390.37 headless.

| Command | Result |
| --- | --- |
| `npm run lint` | Pass, 0 errors, 0 warnings |
| `npm run typecheck` | Pass |
| `npm test` | **28 passed, 0 failed** |
| `npm run build` | Pass |
| `npm run test:e2e` (open server) | **128 passed, 0 failed** |
| `npm run test:e2e` (`STAGING_ACCESS_PASSWORD` set, `E2E_BASIC_AUTH`) | **130 passed, 0 failed** |
| Server-log leak scan after both runs | 0 |

Includes axe (0 serious or critical), layouts at 1440 and 390 with no overflow, the
mobile menu, links and anchors, both PDFs, F01 and the disclosure, the preview form
behavior, the credential block, and the new positioning checks.

**Visual check:** I screenshotted the hero diagram, Problem, Evaluate, Romance and Research
sections at 1440 and 390 wide. No label collisions in the diagram. The Level 3 contrast
needed one mobile wrapping fix, which is included.

### Reproduce

```bash
git checkout b96641d6366ab7a4470807e87395672406c99f72
npm ci && npm run check
npm start &   BASE_URL=http://localhost:3000 npm run test:e2e
git diff --stat 9616fbd -- public/sample/      # empty: PDFs unchanged
```

---

## D. Commercial and scientific integrity

**Customer-facing assertions changed:** all of section B. Every new example is either
labeled illustrative (hero badge, "Illustrative failure patterns" note, "Illustrative
contrast" label) or describes what we evaluate, not what we've found.

**Claims for independent review:**

1. **The Problem cards** assert that these failure patterns are things a character
   "can" do. They're presented as illustrations, not observed results. Arc may want to
   confirm none implies a demonstrated finding.
2. **The Evaluate probe** "Do different histories lead the same character to respond
   differently to the same moment?" describes the Level 3 research question as
   something an audit examines. The audit "draws on" the levels (Research section), but
   **Level 3 isn't validated.** Check that this reads as an evaluation question, not a
   validated capability.
3. **The Level 3 contrast** says "A coherent character might agree in both cases, but
   not in the same way." That's a normative illustration of the hypothesis, not a
   result.
4. **Romance** names love, attachment and rejection explicitly. The status box still
   says mature-content scenarios have only been exercised with offline fixtures.
5. **F01** is now explicitly scoped as a supporting commitment/preference mechanism, as
   Arc requested. It isn't validation of the emotional-continuity thesis.

**What hasn't changed:** the AI-review disclosure; "not a validated scientific standard";
the observable-behavior and no-consciousness statements; and the offer terms.

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
6. **Approve the corrected PDFs** from revision 4, and update your source documents to match.
7. **Approve the revision 5 positioning copy** (section B).

---

## G. Questions for ChatGPT

1. Does the revision 6 patch satisfy "expansion, not removal" without making shame,
   embarrassment, humiliation or desire the company's identity?
2. Is "We don't claim the character feels them" placed and worded adequately in the
   Evaluate section?

Per Arc's instruction, no further positioning iteration is planned after this patch.
Remaining work is the commercial blocker list in section E and live staging verification.

**Netlify reminder:** verify the **stable** URL, not an old hash-prefixed deploy URL,
shows commit `b96641d` or later, using Netlify's deploy list. Engineering still can't
reach Netlify from this environment (section C).

**Not done, per Arc's priority guidance:** the print/PDF-export contrast issue Arc noted
(scroll-reveal content and dark sections washing out in "Print to PDF"). It isn't an
on-screen defect. A small `@media print` rule can be added on request.

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
