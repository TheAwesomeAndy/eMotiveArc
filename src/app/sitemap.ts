import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/contact", priority: 0.9 },
    { path: "/sample-report", priority: 0.8 },
    { path: "/data-handling", priority: 0.4 },
    { path: "/privacy", priority: 0.3 },
  ];
  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
