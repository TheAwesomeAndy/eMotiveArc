"use server";

import { headers } from "next/headers";
import { deliverLead } from "@/lib/lead-delivery";
import {
  normalizeWebsite,
  readInquiry,
  validateInquiry,
  type InquiryState,
} from "@/lib/inquiry";
import { rateLimited } from "@/lib/rate-limit";

const MIN_FILL_MS = 3000;
const HONEYPOT_FIELD = "fax_number";

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const now = Date.now();

  // Anti-spam 1: honeypot. Real visitors never see or fill this field.
  const honeypot = formData.get(HONEYPOT_FIELD);
  // Anti-spam 2: timing. Bots tend to submit instantly. The field is set by
  // the browser, so it is absent (and ignored) when JavaScript is disabled.
  const startedAt = Number(formData.get("startedAt"));
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && now - startedAt < MIN_FILL_MS;

  if ((typeof honeypot === "string" && honeypot.length > 0) || tooFast) {
    console.warn("[inquiry] Dropped as likely spam", { honeypot: Boolean(honeypot), tooFast });
    // Look like success so automated senders get no signal.
    return { status: "sent", message: "Thanks. Your inquiry has been received." };
  }

  // Anti-spam 3: per-IP rate limit.
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip, now)) {
    return {
      status: "error",
      message: "Too many submissions from your connection. Please wait a few minutes and try again.",
    };
  }

  const fields = readInquiry(formData);
  const errors = validateInquiry(fields);
  if (Object.keys(errors).length > 0) {
    return {
      status: "invalid",
      errors,
      message: "Please check the highlighted fields.",
    };
  }

  const sourcePath = String(formData.get("sourcePath") ?? "").slice(0, 100) || "/";
  const result = await deliverLead({
    ...fields,
    website: normalizeWebsite(fields.website),
    receivedAt: new Date(now).toISOString(),
    sourcePath,
  });

  if (!result.ok) {
    return {
      status: "error",
      message:
        "We couldn't send your inquiry just now. Your details are still in the form, so please try again in a few minutes.",
    };
  }

  if (result.mode === "preview") {
    return {
      status: "preview",
      message:
        "This form is in preview mode, so your inquiry was not sent to anyone. Your details are still in the form. Our inbox isn't live yet, so please check back soon.",
    };
  }

  return {
    status: "sent",
    message:
      "Thanks. Your inquiry has been received, and we'll reply to the email address you gave.",
  };
}
