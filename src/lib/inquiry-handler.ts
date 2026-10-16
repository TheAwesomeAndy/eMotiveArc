import "server-only";
import { publicContactEmail } from "./config";
import { deliverLead, logInquiryEvent } from "./lead-delivery";
import {
  fieldsWithSecrets,
  normalizeWebsite,
  readInquiry,
  validateInquiry,
  type InquiryState,
} from "./inquiry";
import { rateLimited } from "./rate-limit";

export const MIN_FILL_MS = 3000;
export const HONEYPOT_FIELD = "fax_number";

export type RequestContext = {
  ip: string;
  now: number;
  /** Injectable for tests. */
  makeRef?: () => string;
};

const defaultRef = () => crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();

export function retryMessage(ref: string): string {
  const fallback = publicContactEmail
    ? ` If it keeps failing, email us at ${publicContactEmail} instead.`
    : " If it keeps failing, please copy your message somewhere safe and try again later.";
  return (
    "We couldn't send your inquiry, and it hasn't been saved anywhere. " +
    "Your details are still in the form. Please wait a minute and press send again." +
    fallback +
    ` Reference: ${ref}.`
  );
}

export const PREVIEW_MESSAGE =
  "This form is in preview mode, so your inquiry was not sent to anyone and has not been saved. Your details are still in the form. If you'd like to keep what you wrote, copy it before leaving this page.";

/**
 * All inquiry logic, independent of Next.js request APIs so it can be tested
 * directly. Order matters: spam checks, rate limit, validation (including
 * credential rejection), then delivery. Nothing is logged or delivered for
 * a submission that contains a recognizable credential.
 */
export async function handleInquiry(
  formData: FormData,
  ctx: RequestContext,
): Promise<InquiryState> {
  const { now } = ctx;

  // Anti-spam 1: honeypot. Real visitors never see or fill this field.
  const honeypot = formData.get(HONEYPOT_FIELD);
  // Anti-spam 2: timing. The browser sets startedAt, so it is absent (and
  // ignored) when JavaScript is disabled.
  const startedAt = Number(formData.get("startedAt"));
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && now - startedAt < MIN_FILL_MS;

  if ((typeof honeypot === "string" && honeypot.length > 0) || tooFast) {
    logInquiryEvent("warn", "dropped_spam", { honeypot: Boolean(honeypot), tooFast });
    // Look like success so automated senders get no signal.
    return { status: "sent", message: "Thanks. Your inquiry has been received." };
  }

  // Anti-spam 3: per-IP rate limit.
  if (rateLimited(ctx.ip, now)) {
    logInquiryEvent("warn", "rate_limited", {});
    return {
      status: "error",
      message: "Too many submissions from your connection. Please wait a few minutes and try again.",
    };
  }

  const fields = readInquiry(formData);
  const errors = validateInquiry(fields);
  if (Object.keys(errors).length > 0) {
    const secretFields = fieldsWithSecrets(fields);
    if (secretFields.length > 0) {
      // Field names only. The credential itself is never logged or sent.
      logInquiryEvent("warn", "rejected_credential", { fields: secretFields.join(",") });
    }
    return { status: "invalid", errors, message: "Please check the highlighted fields." };
  }

  const ref = (ctx.makeRef ?? defaultRef)();
  const sourcePath = String(formData.get("sourcePath") ?? "").slice(0, 100) || "/";
  const result = await deliverLead({
    ...fields,
    website: normalizeWebsite(fields.website),
    receivedAt: new Date(now).toISOString(),
    sourcePath,
    ref,
  });

  if (!result.ok) return { status: "error", message: retryMessage(ref) };
  if (result.mode === "preview") return { status: "preview", message: PREVIEW_MESSAGE };
  return {
    status: "sent",
    message: `Thanks. Your inquiry has been received, and we'll reply to the email address you gave. Reference: ${ref}.`,
  };
}
