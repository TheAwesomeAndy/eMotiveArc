/**
 * Central runtime configuration. Everything here is read from environment
 * variables so the founder can switch the site from preview to live without
 * code changes. See WEBSITE_HANDOFF.md for the full list.
 *
 * Pages are statically prerendered, so values are captured at build time.
 * After changing an env var on Vercel, trigger a redeploy.
 */

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function resolveSiteUrl(): string {
  const explicit = clean(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return explicit.replace(/\/$/, "");
  const vercelProd = clean(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercelProd) return `https://${vercelProd}`;
  const vercel = clean(process.env.VERCEL_URL);
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/**
 * "preview" (default): shows a preview ribbon and asks search engines not to
 * index the site. "live": removes the ribbon and allows indexing. Only set
 * "live" after the founder approves publication.
 */
export const siteStage: "preview" | "live" =
  clean(process.env.NEXT_PUBLIC_SITE_STAGE) === "live" ? "live" : "preview";

export const isPreview = siteStage === "preview";

export const siteUrl = resolveSiteUrl();

/**
 * Public contact address. Left unset until the mailbox exists and is
 * monitored, so the site never shows an address that bounces.
 */
export const publicContactEmail = clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL);

/** Optional booking link (e.g. Cal.com) for discovery conversations. */
export const discoveryCallUrl = clean(process.env.NEXT_PUBLIC_DISCOVERY_CALL_URL);

export type LeadDeliveryMode = "email" | "webhook" | "preview";

/** Server-only. Decides where inquiry submissions go. */
export function getLeadDeliveryMode(): LeadDeliveryMode {
  if (
    clean(process.env.RESEND_API_KEY) &&
    clean(process.env.CONTACT_TO_EMAIL) &&
    clean(process.env.CONTACT_FROM_EMAIL)
  ) {
    return "email";
  }
  if (clean(process.env.CONTACT_WEBHOOK_URL)) return "webhook";
  return "preview";
}

/**
 * Analytics stay off unless explicitly configured. Supported today:
 * "plausible" (requires NEXT_PUBLIC_PLAUSIBLE_DOMAIN).
 */
export const analytics = {
  provider: clean(process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER),
  plausibleDomain: clean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
  plausibleSrc:
    clean(process.env.NEXT_PUBLIC_PLAUSIBLE_SRC) ??
    "https://plausible.io/js/script.js",
};
