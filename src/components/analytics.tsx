import Script from "next/script";
import { analytics } from "@/lib/config";

/**
 * Analytics integration point. Renders nothing unless the founder sets
 * NEXT_PUBLIC_ANALYTICS_PROVIDER after approving a provider.
 *
 * Plausible is wired up because it is cookieless and lightweight. Add other
 * providers here, behind the same env check.
 */
export function Analytics() {
  if (analytics.provider === "plausible" && analytics.plausibleDomain) {
    return (
      <Script
        defer
        data-domain={analytics.plausibleDomain}
        src={analytics.plausibleSrc}
        strategy="afterInteractive"
      />
    );
  }
  return null;
}
