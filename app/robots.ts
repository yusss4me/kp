import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yamuti.or.id";

/**
 * Robots rules for search engine crawlers.
 * Blocks admin, owner, home (authenticated), and API routes from indexing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/explore", "/auth", "/auth/daftar", "/auth/donatur", "/kunjungan"],
        disallow: ["/admin/", "/owner/", "/home/", "/api/", "/preview/", "/wireframe/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
