import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yamuti.or.id";

/**
 * Dynamic sitemap for public-facing pages.
 * Admin, owner, and authenticated routes are intentionally excluded
 * as they should not be indexed by search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/explore`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/auth`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/auth/daftar`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/auth/donatur`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/auth/lupa-password`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/auth/reset-password`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: `${BASE_URL}/kunjungan`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/showcase`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.1,
    },
  ];

  return staticPages;
}
