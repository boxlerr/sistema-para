import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

export type SeoPage = Database["public"]["Tables"]["seo_pages"]["Row"];

/**
 * Obtiene una página SEO por slug. Pensado para SSR/SSG en Server Components.
 * Devuelve null si no existe (para que la page pueda llamar a notFound()).
 */
export async function getSeoPageBySlug(slug: string): Promise<SeoPage | null> {
  const { data, error } = await supabase
    .from("seo_pages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[seoPages] getSeoPageBySlug error:", error.message);
    return null;
  }
  return data;
}

/**
 * Lista todos los slugs indexables para sitemap y generateStaticParams.
 * Pagina internamente por si la tabla supera el límite por request (1000).
 */
export async function listAllSeoSlugs(): Promise<
  Array<Pick<SeoPage, "slug" | "created_at">>
> {
  const PAGE_SIZE = 1000;
  const results: Array<Pick<SeoPage, "slug" | "created_at">> = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("seo_pages")
      .select("slug, created_at")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      console.error("[seoPages] listAllSeoSlugs error:", error.message);
      break;
    }
    if (!data || data.length === 0) break;
    results.push(...data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return results;
}

// ---------------------------------------------------------------------------
// Listados para /blog, /categorias, /sistemas
// ---------------------------------------------------------------------------

export type SeoPageCard = Pick<
  SeoPage,
  "slug" | "h1_title" | "meta_description" | "industry" | "software_type" | "created_at"
>;

/** Lista compacta para tarjetas (sin html_content). */
export async function listAllSeoCards(limit = 200): Promise<SeoPageCard[]> {
  const { data, error } = await supabase
    .from("seo_pages")
    .select("slug, h1_title, meta_description, industry, software_type, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[seoPages] listAllSeoCards error:", error.message);
    return [];
  }
  return data ?? [];
}

export type Facet = { name: string; slug: string; count: number };

/**
 * Slug determinístico (lowercase, sin acentos, espacios → guiones).
 * Inverso aproximado: lookup por igualdad de slug, no por equality del nombre.
 */
export function toFacetSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function listFacet(
  column: "industry" | "software_type",
): Promise<Facet[]> {
  // Trae todos los rows (sólo la columna pedida) y agrega en memoria.
  // Para escala >100k: mover a una vista materializada o RPC.
  const { data, error } = await supabase
    .from("seo_pages")
    .select(column)
    .limit(10000);

  if (error) {
    console.error(`[seoPages] listFacet(${column}) error:`, error.message);
    return [];
  }
  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    const name = String((row as Record<string, unknown>)[column] ?? "").trim();
    if (!name) continue;
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: toFacetSlug(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "es"));
}

export const listCategories = () => listFacet("software_type");
export const listIndustries = () => listFacet("industry");

async function listCardsByFacet(
  column: "industry" | "software_type",
  facetSlug: string,
): Promise<{ name: string | null; cards: SeoPageCard[] }> {
  // Buscamos todos los rows de la columna y filtramos por slug en memoria
  // (la BD guarda el valor original con acentos; el slug es derivado).
  const { data, error } = await supabase
    .from("seo_pages")
    .select("slug, h1_title, meta_description, industry, software_type, created_at")
    .order("created_at", { ascending: false })
    .limit(2000);

  if (error) {
    console.error(`[seoPages] listCardsByFacet(${column}) error:`, error.message);
    return { name: null, cards: [] };
  }

  const matches = (data ?? []).filter((row) => {
    const value = (row as Record<string, unknown>)[column];
    return typeof value === "string" && toFacetSlug(value) === facetSlug;
  });

  const name =
    matches.length > 0
      ? String((matches[0] as Record<string, unknown>)[column])
      : null;
  return { name, cards: matches };
}

export const listCardsByCategory = (slug: string) =>
  listCardsByFacet("software_type", slug);
export const listCardsByIndustry = (slug: string) =>
  listCardsByFacet("industry", slug);
