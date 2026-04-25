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
