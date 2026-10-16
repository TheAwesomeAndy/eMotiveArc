import "server-only";
import { getLeadDeliveryMode, type LeadDeliveryMode } from "./config";
import { NEXT_STEPS, type InquiryFields, type NextStep } from "./inquiry";

export type Lead = InquiryFields & {
  receivedAt: string;
  sourcePath: string;
};

export type DeliveryResult =
  | { ok: true; mode: LeadDeliveryMode }
  | { ok: false; mode: LeadDeliveryMode; reason: string };

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
  if (!res.ok) {
    return { ok: false, mode: "email", reason: `Resend responded ${res.status}` };
  }
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
  if (!res.ok) {
    return { ok: false, mode: "webhook", reason: `Webhook responded ${res.status}` };
  }
  return { ok: true, mode: "webhook" };
}

/**
 * Delivers a lead to the configured destination.
 *
 * In preview mode (no provider configured) nothing is sent. The lead is
 * written to the server log so a test submission can be inspected, and the
 * visitor is told plainly that their message was not delivered.
 */
export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const mode = getLeadDeliveryMode();

  if (mode === "preview") {
    console.info("[inquiry:preview] Not delivered. No provider configured.", JSON.stringify(lead));
    return { ok: true, mode };
  }

  try {
    const result = mode === "email" ? await sendWithResend(lead) : await sendToWebhook(lead);
    if (!result.ok) {
      // Keep the lead recoverable from the server log if delivery fails.
      console.error(`[inquiry:${mode}] Delivery failed: ${result.reason}`, JSON.stringify(lead));
    }
    return result;
  } catch (error) {
    console.error(`[inquiry:${mode}] Delivery error`, error, JSON.stringify(lead));
    return { ok: false, mode, reason: "network" };
  }
}
