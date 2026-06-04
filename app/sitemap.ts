import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, priority: 1 },
    { url: `${siteUrl}/events`, lastModified, priority: 0.9 },
    { url: `${siteUrl}/registration`, lastModified, priority: 0.85 },
    { url: `${siteUrl}/contact`, lastModified, priority: 0.8 },
  ];
}
