/**
 * End-to-end smoke test against a running server.
 *
 *   npm run build && npm start      # in one terminal
 *   npm run test:e2e                # in another
 *
 * Env: BASE_URL (default http://localhost:3000)
 *      E2E_BASIC_AUTH ("user:password" for a staging preview protected by
 *      STAGING_ACCESS_PASSWORD; also checks that anonymous access is refused)
 *      CHROMIUM_PATH (path to a Chromium/Chrome binary; optional if
 *      Playwright's own browser is installed)
 */
import { createRequire } from "node:module";
import { chromium } from "playwright-core";

const require = createRequire(import.meta.url);
const axeSource = require("fs").readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const PAGES = ["/", "/contact", "/sample-report", "/privacy", "/data-handling"];

let failures = 0;
const check = (cond, msg) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`);
  if (!cond) failures++;
};

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);

const auth = process.env.E2E_BASIC_AUTH;
const httpCredentials = auth
  ? { username: auth.slice(0, auth.indexOf(":")), password: auth.slice(auth.indexOf(":") + 1) }
  : undefined;
const newContext = (opts = {}) => browser.newContext({ ...opts, httpCredentials });
const newPage = async (opts = {}) => (await newContext(opts)).newPage();

if (auth) {
  const anon = await fetch(BASE + "/");
  check(anon.status === 401, `anonymous request is refused by the access gate (${anon.status})`);
  const anonPdf = await fetch(BASE + "/robots.txt");
  check(anonPdf.status === 401, `anonymous asset request is refused (${anonPdf.status})`);
}

// 1. Every page loads, has one h1, a title, a description, no console errors,
//    no horizontal overflow, and no serious axe violations.
for (const vp of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const ctx = await newContext({ viewport: vp });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  for (const path of PAGES) {
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    check(res?.status() === 200, `[${vp.name}] ${path} returns 200`);
    check((await page.locator("h1").count()) === 1, `[${vp.name}] ${path} has exactly one h1`);
    check((await page.title()).length > 10, `[${vp.name}] ${path} has a title`);
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    check(Boolean(desc && desc.length > 50), `[${vp.name}] ${path} has a meta description`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    check(overflow <= 0, `[${vp.name}] ${path} has no horizontal overflow (${overflow}px)`);
    if (vp.name === "desktop") {
      await page.addScriptTag({ content: axeSource });
      const result = await page.evaluate(async () =>
        axe.run(document, { resultTypes: ["violations"] }),
      );
      const serious = result.violations.filter((v) => ["serious", "critical"].includes(v.impact));
      for (const v of serious) console.log(`      axe ${v.impact}: ${v.id} (${v.nodes.length}) ${v.help}`);
      check(serious.length === 0, `[axe] ${path} has no serious/critical violations`);
    }
  }
  check(errors.length === 0, `[${vp.name}] no console or page errors ${errors.join(" | ")}`);
  await ctx.close();
}

// 2. Internal links and in-page anchors resolve.
{
  const page = await newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const hrefs = await page.$$eval("a[href]", (as) => [...new Set(as.map((a) => a.getAttribute("href")))]);
  for (const href of hrefs.filter((h) => h.startsWith("/"))) {
    const [path, hash] = href.split("#");
    const res = await page.request.get(BASE + (path || "/"));
    check(res.status() === 200, `link ${href} resolves (${res.status()})`);
    if (hash) {
      const html = await res.text();
      check(html.includes(`id="${hash}"`), `anchor #${hash} exists on ${path || "/"}`);
    }
  }
  for (const f of ["/robots.txt", "/sitemap.xml", "/opengraph-image", "/icon.svg", "/apple-icon"]) {
    const res = await page.request.get(BASE + f);
    check(res.status() === 200, `${f} is served`);
  }
  await page.close();
}

// 2b. Approved sample assets: both PDFs download, F01 excerpt and disclosure render.
{
  const page = await newPage();
  for (const f of [
    "/sample/emotivearc-sample-audit-captain-ivy-marlow.pdf",
    "/sample/emotivearc-audit-overview.pdf",
  ]) {
    const res = await page.request.get(BASE + f);
    const type = res.headers()["content-type"] ?? "";
    const head = (await res.body()).subarray(0, 5).toString();
    check(res.status() === 200 && type.includes("application/pdf") && head === "%PDF-", `${f} serves a PDF`);
  }
  for (const path of ["/", "/sample-report"]) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    check(await page.getByText("Accepts a new request, then reverts to the old rule").first().isVisible(), `${path} shows the F01 excerpt`);
    check(
      await page.getByText("An AI assistant reviewed the flagged conversations, not an independent human").first().isVisible(),
      `${path} shows the AI-review disclosure`,
    );
    check((await page.getByText("Placeholder: ").count()) === 0, `${path} has no sample placeholders`);
    check(
      (await page.locator('a[href$="emotivearc-sample-audit-captain-ivy-marlow.pdf"]').count()) > 0,
      `${path} links the full sample report`,
    );
  }
  await page.close();
}

// 3. Mobile menu opens, traps nothing unexpected, and closes on Escape.
{
  const ctx = await newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  check(await page.locator("#mobile-nav").isVisible(), "mobile menu opens");
  await page.keyboard.press("Escape");
  check(!(await page.locator("#mobile-nav").isVisible()), "mobile menu closes on Escape");
  await ctx.close();
}

// 4. Inquiry form: client validation, ?next= preselection, preview/sent outcome.
{
  const page = await newPage();
  await page.goto(BASE + "/contact?next=discovery", { waitUntil: "networkidle" });
  const previewBanner = await page.getByText("Preview mode.", { exact: false }).count();
  console.log(`INFO  delivery banner present: ${previewBanner > 0} (expected only when no provider is configured)`);
  check(
    await page.locator('input[name="nextStep"][value="discovery"]').isChecked(),
    "?next=discovery preselects the discovery option",
  );
  await page.getByRole("button", { name: /Request a conversation/ }).click();
  check(await page.getByText("Please tell us your name.").isVisible(), "empty submit shows name error");
  check(
    (await page.evaluate(() => document.activeElement?.getAttribute("name"))) === "name",
    "focus moves to first invalid field",
  );
  await page.fill('input[name="name"]', "Test Person");
  await page.fill('input[name="email"]', "bad");
  await page.fill('textarea[name="message"]', "Testing the EmotiveArc inquiry form end to end.");
  await page.getByRole("button", { name: /Request a conversation/ }).click();
  check(await page.getByText("Please enter a valid email address.").isVisible(), "bad email is rejected");
  await page.fill('input[name="email"]', "test@studio.example");
  await page.waitForTimeout(3200); // respect the anti-spam timing check
  await page.getByRole("button", { name: /Request a conversation/ }).click();
  // Scope to the form area: Next.js also renders an empty role="alert" route announcer.
  const outcome = page.locator("main [role=alert], main [role=status]").filter({ hasText: /\w/ });
  await outcome.first().waitFor({ timeout: 15000 });
  const text = (await outcome.first().innerText()).trim();
  const preview = text.includes("preview mode");
  check(preview || text.includes("received"), `submission shows an explicit outcome: "${text.slice(0, 80)}…"`);
  if (preview) {
    check(previewBanner > 0, "preview warning was shown before submitting");
    check(
      (await page.inputValue('textarea[name="message"]')).length > 0,
      "preview mode keeps the visitor's text",
    );
  }
  await page.close();
}

// 4a. In preview mode, policy and contact pages must not promise a working form.
{
  const page = await newPage();
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  const preview = (await page.getByText("Preview mode.", { exact: false }).count()) > 0;
  if (preview) {
    check(
      await page.getByText("While this site is in preview, the form doesn't deliver messages").isVisible(),
      "contact page says replies need a live inbox",
    );
    await page.goto(BASE + "/privacy", { waitUntil: "networkidle" });
    check(await page.getByTestId("privacy-form-preview").isVisible(), "privacy page says the preview form stores nothing");
    check(
      await page.getByText("the contact form is in preview mode and doesn't deliver messages").isVisible(),
      "privacy contact section does not point to the preview form",
    );
  } else {
    console.log("INFO  delivery configured; preview-only copy checks skipped");
  }
  await page.close();
}

// 4b. A pasted credential is blocked in the browser and never submitted.
{
  const page = await newPage();
  let actionPosts = 0;
  page.on("request", (r) => r.method() === "POST" && actionPosts++);
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await page.fill('input[name="name"]', "Key Paster");
  await page.fill('input[name="email"]', "keys@studio.example");
  await page.fill(
    'textarea[name="message"]',
    "Here is our key sk-ant-api03-abcdefghijklmnopqrstuvwxyz012345 for the test build.",
  );
  check(await page.getByText("This looks like it may contain an API key").isVisible(), "live credential warning appears");
  await page.waitForTimeout(3200);
  await page.getByRole("button", { name: /Send audit inquiry/ }).click();
  check(
    await page.getByText("This looks like it contains an API key or other credential").isVisible(),
    "credential blocks submission with a clear error",
  );
  check(actionPosts === 0, `credential was not sent to the server (${actionPosts} POSTs)`);
  await page.close();
}

// 5. Honeypot submissions are never delivered.
{
  const page = await newPage();
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const hp = document.querySelector('input[name="fax_number"]');
    hp.value = "bot";
  });
  await page.fill('input[name="name"]', "Bot");
  await page.fill('input[name="email"]', "bot@spam.example");
  await page.fill('textarea[name="message"]', "Buy cheap things now, lots of them, today only.");
  await page.waitForTimeout(3200);
  await page.getByRole("button", { name: /Send audit inquiry/ }).click();
  const hpOutcome = page.locator("main [role=alert], main [role=status]").filter({ hasText: /\w/ }).first();
  await hpOutcome.waitFor({ timeout: 15000 });
  const hpText = await hpOutcome.innerText();
  const hpPreview = (await page.getByText("Preview mode.", { exact: false }).count()) > 0 || /preview mode/.test(hpText);
  check(
    hpPreview ? /preview mode/.test(hpText) && !/received/i.test(hpText) : /received/.test(hpText),
    hpPreview
      ? "honeypot in preview mode shows the preview notice, never 'received'"
      : "honeypot with delivery configured gets a silent fake success",
  );
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
