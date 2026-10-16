import "server-only";
import { getLeadDeliveryMode, publicContactEmail } from "./config";
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

/**
 * Pages that render the inquiry form. `sourcePath` arrives from the browser,
 * so anything outside this list is reported as "other" before it reaches
 * logs or delivered messages.
 */
export const KNOWN_SOURCE_PATHS = ["/", "/contact", "/sample-report"] as const;

export function sanitizeSourcePath(raw: FormDataEntryValue | null): string {
  return typeof raw === "string" && (KNOWN_SOURCE_PATHS as readonly string[]).includes(raw)
    ? raw
    : "other";
}

const defaultRef = () => crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();

export function retryMessage(ref: string): string {
  const fallback = publicContactEmail
    ? ` If it keeps failing, email us at ${publicContactEmail} instead.`
    : " If it keeps failing, please copy your message somewhere safe and try again later.";
  return (
    "We couldn't confirm that your inquiry was delivered, so please treat it as not sent. " +
    "This website doesn't keep a copy, and your details are still in the form. " +
    "Please wait a minute and press send again." +
    fallback +
    ` Reference: ${ref}.`
  );
}

export const PREVIEW_MESSAGE =
  "This form is in preview mode, so your inquiry was not sent to anyone, and this website did not store it. Your details are still in the form. If you'd like to keep what you wrote, copy it before leaving this page.";

export const TOO_FAST_MESSAGE =
  "That was quicker than we expected, so we didn't send it. Please check your details and press send again.";

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

  const isPreview = getLeadDeliveryMode() === "preview";

  if (typeof honeypot === "string" && honeypot.length > 0) {
    logInquiryEvent("warn", "dropped_spam", { reason: "honeypot" });
    // Look like a normal outcome so automated senders get no signal. In preview
    // mode that outcome is the preview notice, so nobody is told it was delivered.
    return isPreview
      ? { status: "preview", message: PREVIEW_MESSAGE }
      : { status: "sent", message: "Thanks. Your inquiry has been received." };
  }

  if (tooFast) {
    // A fast human (pasted text, autofill) must not lose a real lead silently.
    logInquiryEvent("warn", "rejected_too_fast", {});
    return { status: "error", message: TOO_FAST_MESSAGE };
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
  const sourcePath = sanitizeSourcePath(formData.get("sourcePath"));
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
