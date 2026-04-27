import type { MetadataRoute } from "next";
import {
  listAllSeoSlugs,
  listCategories,
  listIndustries,
} from "@/lib/seoPages";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://sistemaspara.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, categories, industries] = await Promise.all([
    listAllSeoSlugs(),
    listCategories(),
    listIndustries(),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/categorias`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/sistemas`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/agregar`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const facetEntries: MetadataRoute.Sitemap = [
    ...categories.map((c) => ({
      url: `${SITE_URL}/categorias/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...industries.map((i) => ({
      url: `${SITE_URL}/sistemas/${i.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const articleEntries: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...facetEntries, ...articleEntries];
}
