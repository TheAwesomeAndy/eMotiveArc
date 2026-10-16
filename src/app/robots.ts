import type { MetadataRoute } from "next";
import { isPreview, siteUrl } from "@/lib/config";

/** Blocks all crawling until NEXT_PUBLIC_SITE_STAGE=live. */
export default function robots(): MetadataRoute.Robots {
  if (isPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
