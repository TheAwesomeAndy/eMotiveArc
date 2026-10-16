import "server-only";
import { getLeadDeliveryMode, type LeadDeliveryMode } from "./config";
import { NEXT_STEPS, type InquiryFields, type NextStep } from "./inquiry";

export type Lead = InquiryFields & {
  receivedAt: string;
  sourcePath: string;
  /** Short random reference, safe to log and show to the visitor. */
  ref: string;
};

export type DeliveryResult =
  | { ok: true; mode: LeadDeliveryMode }
  | { ok: false; mode: LeadDeliveryMode; reason: string };

/**
 * Operational metadata only. Never names, emails, companies, websites or
 * message text, so server logs never hold a copy of a visitor's inquiry.
 */
export function safeLeadMeta(lead: Lead) {
  return {
    ref: lead.ref,
    nextStep: lead.nextStep,
    sourcePath: lead.sourcePath,
    messageLength: lead.message.length,
    hasCompany: Boolean(lead.company),
    hasWebsite: Boolean(lead.website),
  };
}

/** Structured, content-free log line. */
export function logInquiryEvent(
  level: "info" | "warn" | "error",
  event: string,
  meta: Record<string, string | number | boolean | undefined>,
) {
  console[level](JSON.stringify({ scope: "inquiry", event, ...meta }));
}

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").slice(0, 200);

function formatText(lead: Lead): string {
  const step = NEXT_STEPS[lead.nextStep as NextStep] ?? lead.nextStep;
  return [
    "New EmotiveArc inquiry",
    "",
    `Preferred next step: ${step}`,
    `Name: ${lead.name}`,
    `Work email: ${lead.email}`,
    `Company: ${lead.company || "(not given)"}`,
    `Product website: ${lead.website || "(not given)"}`,
    `Submitted from: ${lead.sourcePath}`,
    `Received: ${lead.receivedAt}`,
    `Reference: ${lead.ref}`,
    "",
    "Character or continuity problem:",
    lead.message,
  ].join("\n");
}

async function sendWithResend(lead: Lead): Promise<DeliveryResult> {
  const step = lead.nextStep === "audit" ? "Audit inquiry" : "Discovery conversation";
  const subject = oneLine(
    `[EmotiveArc] ${step}: ${lead.name}${lead.company ? `, ${lead.company}` : ""}`,
  );
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env
        .CONTACT_TO_EMAIL!.split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      reply_to: lead.email,
      subject,
      text: formatText(lead),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) return { ok: false, mode: "email", reason: `http_${res.status}` };
  return { ok: true, mode: "email" };
}

async function sendToWebhook(lead: Lead): Promise<DeliveryResult> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const secret = process.env.CONTACT_WEBHOOK_SECRET?.trim();
  if (secret) headers["X-EmotiveArc-Secret"] = secret;
  const res = await fetch(process.env.CONTACT_WEBHOOK_URL!, {
    method: "POST",
    headers,
    body: JSON.stringify({ type: "emotivearc.inquiry", text: formatText(lead), lead }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) return { ok: false, mode: "webhook", reason: `http_${res.status}` };
  return { ok: true, mode: "webhook" };
}

/** Error class name only. Messages can echo request details, so they're dropped. */
function errorKind(error: unknown): string {
  if (error instanceof Error) return error.name === "TimeoutError" ? "timeout" : error.name;
  return "unknown";
}

/**
 * Delivers a lead to the configured destination.
 *
 * Preview mode (no provider configured): nothing is sent or stored. Only
 * content-free metadata is logged, and the caller tells the visitor plainly
 * that their message was not delivered.
 *
 * Failure: only content-free metadata is logged. Logs are not a recovery
 * mechanism. The visitor keeps their text and is asked to retry.
 */
export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const mode = getLeadDeliveryMode();

  if (mode === "preview") {
    logInquiryEvent("info", "not_delivered_preview", safeLeadMeta(lead));
    return { ok: true, mode };
  }

  let result: DeliveryResult;
  try {
    result = mode === "email" ? await sendWithResend(lead) : await sendToWebhook(lead);
  } catch (error) {
    result = { ok: false, mode, reason: errorKind(error) };
  }

  if (result.ok) logInquiryEvent("info", "delivered", { mode, ref: lead.ref });
  else logInquiryEvent("error", "delivery_failed", { mode, reason: result.reason, ...safeLeadMeta(lead) });
  return result;
}
