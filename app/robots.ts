import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.knowitafrica.com";

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/payment/"] },
    ],
    sitemap: `${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
