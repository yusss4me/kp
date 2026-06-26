import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yamuti.or.id";

/**
 * Robots rules for search engine crawlers.
   * Blocks admin, super_admin, user (authenticated), and API routes from indexing.
   */
  export default function robots(): MetadataRoute.Robots {
    return {
      rules: [
        {
          userAgent: "*",
          allow: ["/", "/explore", "/auth", "/auth/daftar", "/auth/donatur", "/kunjungan"],
          disallow: ["/admin/", "/super_admin/", "/user/", "/api/", "/preview/", "/wireframe/"],
        },
      ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
