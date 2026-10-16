/**
 * Server-side inquiry handling: preview mode, delivery success and failure,
 * credential rejection, spam handling, and log hygiene.
 *
 * Runs without Next.js. Network calls are replaced by a fake `fetch`, so
 * these tests prove our logic, not a real provider's behavior.
 */
import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { SECRET_ERROR } from "../src/lib/inquiry.ts";
import { handleInquiry, PREVIEW_MESSAGE } from "../src/lib/inquiry-handler.ts";

const PII = {
  name: "Priya Example",
  email: "priya@studio.example",
  company: "Lantern Studio",
  website: "lantern.example",
  message: "Our coaching companion forgets the user's breakthrough after a session break.",
};

const ENV_KEYS = [
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
  "CONTACT_WEBHOOK_URL",
  "CONTACT_WEBHOOK_SECRET",
];

type Call = { url: string; init: RequestInit };
let calls: Call[] = [];
let logs: string[] = [];
let fetchImpl: (url: string, init: RequestInit) => Promise<Response>;
const realFetch = globalThis.fetch;
const realConsole = { info: console.info, warn: console.warn, error: console.error };
let ipCounter = 0;

beforeEach(() => {
  for (const k of ENV_KEYS) delete process.env[k];
  calls = [];
  logs = [];
  fetchImpl = async () => new Response("{}", { status: 200 });
  globalThis.fetch = (async (url: string | URL, init: RequestInit = {}) => {
    calls.push({ url: String(url), init });
    return fetchImpl(String(url), init);
  }) as typeof fetch;
  for (const level of ["info", "warn", "error"] as const) {
    console[level] = (...args: unknown[]) => {
      logs.push(args.map((a) => (typeof a === "string" ? a : JSON.stringify(a))).join(" "));
    };
  }
});

afterEach(() => {
  globalThis.fetch = realFetch;
  Object.assign(console, realConsole);
});

function form(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  const values = { ...PII, nextStep: "audit", sourcePath: "/contact", ...overrides };
  for (const [k, v] of Object.entries(values)) fd.set(k, v);
  return fd;
}

const ctx = () => ({ ip: `10.0.0.${++ipCounter}`, now: 1_800_000_000_000, makeRef: () => "TESTREF1" });

/** No log line may contain any submitted personal or free-text value. */
function assertLogsClean(extra: string[] = []) {
  const all = logs.join("\n");
  for (const value of [...Object.values(PII), "lantern", ...extra]) {
    assert.ok(!all.includes(value), `log leaked "${value}":\n${all}`);
  }
}

test("preview mode: nothing is sent, visitor is warned, logs hold no content", async () => {
  const state = await handleInquiry(form(), ctx());
  assert.equal(state.status, "preview");
  assert.equal(state.status === "preview" && state.message, PREVIEW_MESSAGE);
  assert.match(PREVIEW_MESSAGE, /not sent to anyone/);
  assert.match(PREVIEW_MESSAGE, /has not been saved/);
  assert.equal(calls.length, 0, "no network call in preview mode");
  assert.ok(logs.some((l) => l.includes('"event":"not_delivered_preview"')));
  assert.ok(logs.some((l) => l.includes('"ref":"TESTREF1"')));
  assertLogsClean();
});

test("webhook success: payload carries the inquiry, logs do not", async () => {
  process.env.CONTACT_WEBHOOK_URL = "https://hooks.example/inquiry";
  process.env.CONTACT_WEBHOOK_SECRET = "hook-secret";
  const state = await handleInquiry(form(), ctx());
  assert.equal(state.status, "sent");
  assert.equal(calls.length, 1);
  const headers = calls[0].init.headers as Record<string, string>;
  assert.equal(headers["X-EmotiveArc-Secret"], "hook-secret");
  const body = JSON.parse(String(calls[0].init.body));
  assert.equal(body.lead.email, PII.email);
  assert.equal(body.lead.website, "https://lantern.example");
  assertLogsClean(["hook-secret"]);
});

test("email success: Resend request is well formed", async () => {
  process.env.RESEND_API_KEY = "re_test_key_value";
  process.env.CONTACT_TO_EMAIL = "founder@emotivearc.example, second@emotivearc.example";
  process.env.CONTACT_FROM_EMAIL = "EmotiveArc <inquiries@emotivearc.example>";
  const state = await handleInquiry(form(), ctx());
  assert.equal(state.status, "sent");
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  const body = JSON.parse(String(calls[0].init.body));
  assert.deepEqual(body.to, ["founder@emotivearc.example", "second@emotivearc.example"]);
  assert.equal(body.reply_to, PII.email);
  assert.ok(body.text.includes(PII.message));
  assert.ok(!/[\r\n]/.test(body.subject));
  assertLogsClean(["re_test_key_value"]);
});

test("failed delivery (HTTP 500): clear retry instructions, no content in logs", async () => {
  process.env.CONTACT_WEBHOOK_URL = "https://hooks.example/inquiry";
  fetchImpl = async () => new Response("boom", { status: 500 });
  const state = await handleInquiry(form(), ctx());
  assert.equal(state.status, "error");
  const msg = state.status === "error" ? state.message : "";
  assert.match(msg, /couldn't send/);
  assert.match(msg, /hasn't been saved anywhere/);
  assert.match(msg, /still in the form/);
  assert.match(msg, /press send again/);
  assert.match(msg, /Reference: TESTREF1/);
  assert.ok(logs.some((l) => l.includes('"event":"delivery_failed"') && l.includes('"reason":"http_500"')));
  assertLogsClean();
});

test("failed delivery (network error): error text from fetch is not logged", async () => {
  process.env.CONTACT_WEBHOOK_URL = "https://hooks.example/inquiry";
  fetchImpl = async () => {
    throw new TypeError(`fetch failed while sending ${PII.email}`);
  };
  const state = await handleInquiry(form(), ctx());
  assert.equal(state.status, "error");
  assert.ok(logs.some((l) => l.includes('"reason":"TypeError"')));
  assertLogsClean();
});

test("credential in message: rejected before delivery and never logged", async () => {
  process.env.CONTACT_WEBHOOK_URL = "https://hooks.example/inquiry";
  const key = "sk-ant-api03-abcdefghijklmnopqrstuvwxyz012345";
  const state = await handleInquiry(form({ message: `Here is our key ${key} for testing.` }), ctx());
  assert.equal(state.status, "invalid");
  assert.equal(state.status === "invalid" && state.errors.message, SECRET_ERROR);
  assert.equal(calls.length, 0, "nothing delivered");
  assert.ok(logs.some((l) => l.includes('"event":"rejected_credential"') && l.includes("message")));
  assertLogsClean([key, "sk-ant"]);
});

test("credential in another field is rejected too", async () => {
  process.env.CONTACT_WEBHOOK_URL = "https://hooks.example/inquiry";
  const key = "ghp_abcdefghijklmnopqrstuvwxyz0123456789";
  const state = await handleInquiry(form({ company: key }), ctx());
  assert.equal(state.status, "invalid");
  assert.equal(state.status === "invalid" && state.errors.company, SECRET_ERROR);
  assert.equal(calls.length, 0);
  assertLogsClean([key]);
});

test("credential rejected in preview mode as well", async () => {
  const key = "AKIAIOSFODNN7EXAMPLE";
  const state = await handleInquiry(form({ message: `Access key ${key} is attached here.` }), ctx());
  assert.equal(state.status, "invalid");
  assertLogsClean([key]);
});

test("honeypot and too-fast submissions are dropped without delivery", async () => {
  process.env.CONTACT_WEBHOOK_URL = "https://hooks.example/inquiry";
  const c = ctx();
  const bot = await handleInquiry(form({ fax_number: "x" }), c);
  assert.equal(bot.status, "sent");
  const fast = await handleInquiry(form({ startedAt: String(c.now - 500) }), ctx());
  assert.equal(fast.status, "sent");
  assert.equal(calls.length, 0);
  assertLogsClean();
});

test("rate limit: sixth submission from one IP in ten minutes is refused", async () => {
  const c = { ...ctx(), ip: "203.0.113.9" };
  for (let i = 0; i < 5; i++) assert.equal((await handleInquiry(form(), c)).status, "preview");
  const sixth = await handleInquiry(form(), c);
  assert.equal(sixth.status, "error");
  assertLogsClean();
});

test("invalid fields are reported without delivery or content logging", async () => {
  process.env.CONTACT_WEBHOOK_URL = "https://hooks.example/inquiry";
  const state = await handleInquiry(form({ email: "not-an-email" }), ctx());
  assert.equal(state.status, "invalid");
  assert.equal(calls.length, 0);
  assertLogsClean(["not-an-email"]);
});
