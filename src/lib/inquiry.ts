/**
 * Inquiry form schema and validation. Shared by the client (instant feedback)
 * and the server action (authoritative check). No external dependencies.
 */

export const NEXT_STEPS = {
  audit: "Founding-client audit inquiry ($750)",
  discovery: "Introductory discovery conversation",
} as const;

export type NextStep = keyof typeof NEXT_STEPS;

export type InquiryFields = {
  name: string;
  email: string;
  company: string;
  website: string;
  message: string;
  nextStep: string;
};

export type InquiryErrors = Partial<Record<keyof InquiryFields, string>>;

export const LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  website: 300,
  message: 2000,
  messageMin: 20,
} as const;

/** Free-mail domains get a gentle nudge, not a rejection. */
const FREE_MAIL = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readInquiry(formData: FormData): InquiryFields {
  const get = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    website: get("website"),
    message: get("message"),
    nextStep: get("nextStep"),
  };
}

export function normalizeWebsite(raw: string): string {
  if (!raw) return "";
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

function isValidUrl(raw: string): boolean {
  try {
    const url = new URL(normalizeWebsite(raw));
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

export function validateInquiry(fields: InquiryFields): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!fields.name) errors.name = "Please tell us your name.";
  else if (fields.name.length > LIMITS.name) errors.name = "That name is too long.";

  if (!fields.email) errors.email = "Please enter your work email.";
  else if (fields.email.length > LIMITS.email || !EMAIL_RE.test(fields.email))
    errors.email = "Please enter a valid email address.";

  if (fields.company.length > LIMITS.company)
    errors.company = "That company name is too long.";

  if (fields.website) {
    if (fields.website.length > LIMITS.website)
      errors.website = "That address is too long.";
    else if (!isValidUrl(fields.website))
      errors.website = "Please enter a valid web address, like example.com.";
  }

  if (!fields.message)
    errors.message = "Please describe your character or the continuity problem.";
  else if (fields.message.length < LIMITS.messageMin)
    errors.message = `A little more detail helps. At least ${LIMITS.messageMin} characters, please.`;
  else if (fields.message.length > LIMITS.message)
    errors.message = `Please keep this under ${LIMITS.message} characters.`;

  if (!(fields.nextStep in NEXT_STEPS))
    errors.nextStep = "Please choose a next step.";

  // Credentials override any other error on the same field.
  for (const key of fieldsWithSecrets(fields)) errors[key] = SECRET_ERROR;

  return errors;
}

export function isFreeMail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? FREE_MAIL.has(domain) : false;
}

/**
 * Recognizable credential formats. Matching text is rejected in the browser
 * and again on the server, before anything is delivered or logged.
 * Patterns are deliberately specific to avoid flagging ordinary prose.
 */
const SECRET_PATTERNS: { label: string; re: RegExp }[] = [
  { label: "Anthropic API key", re: /\bsk-ant-[A-Za-z0-9_-]{16,}/ },
  { label: "OpenAI-style API key", re: /\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{20,}/ },
  { label: "Stripe secret key", re: /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}/ },
  { label: "AWS access key", re: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/ },
  { label: "GitHub token", re: /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})/ },
  { label: "Slack token", re: /\bxox[abprs]-[A-Za-z0-9-]{10,}/ },
  { label: "Google API key", re: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { label: "Resend API key", re: /\bre_[A-Za-z0-9]{8,}_[A-Za-z0-9]{16,}/ },
  { label: "Hugging Face token", re: /\bhf_[A-Za-z0-9]{30,}/ },
  { label: "private key", re: /-----BEGIN (?:[A-Z]+ )?PRIVATE KEY-----/ },
  { label: "JSON web token", re: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/ },
];

/** Returns the kind of credential found, or null. Never returns the match. */
export function findSecret(text: string): string | null {
  for (const { label, re } of SECRET_PATTERNS) if (re.test(text)) return label;
  return null;
}

export function looksLikeSecret(text: string): boolean {
  return findSecret(text) !== null;
}

export const SECRET_ERROR =
  "This looks like it contains an API key or other credential. Please remove it. We never need credentials through this form.";

/** Field names (never values) that contain a recognizable credential. */
export function fieldsWithSecrets(fields: InquiryFields): (keyof InquiryFields)[] {
  return (Object.keys(fields) as (keyof InquiryFields)[]).filter((k) =>
    looksLikeSecret(fields[k]),
  );
}

export type InquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: InquiryErrors; message: string }
  | { status: "sent"; message: string }
  | { status: "preview"; message: string }
  | { status: "error"; message: string };

export const initialInquiryState: InquiryState = { status: "idle" };
