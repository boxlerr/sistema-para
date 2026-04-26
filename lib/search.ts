import { supabase } from "@/lib/supabase";
import type { SeoPageCard } from "@/lib/seoPages";

/**
 * Búsqueda full-text light contra seo_pages.
 * Hace ILIKE OR sobre h1_title, meta_description, industry y software_type.
 * Para escala >50k filas conviene migrar a tsvector + GIN o pg_trgm.
 */
export async function searchSeoPages(
  rawQuery: string,
  limit = 60,
): Promise<SeoPageCard[]> {
  const q = rawQuery.trim();
  if (q.length < 2) return [];

  // Escapar wildcards de PostgREST.
  const safe = q.replace(/[%,]/g, " ");
  const pattern = `%${safe}%`;

  const { data, error } = await supabase
    .from("seo_pages")
    .select(
      "slug, h1_title, meta_description, industry, software_type, created_at",
    )
    .or(
      [
        `h1_title.ilike.${pattern}`,
        `meta_description.ilike.${pattern}`,
        `industry.ilike.${pattern}`,
        `software_type.ilike.${pattern}`,
      ].join(","),
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[search] searchSeoPages error:", error.message);
    return [];
  }
  return data ?? [];
}
