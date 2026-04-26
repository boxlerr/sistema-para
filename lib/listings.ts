import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

export type ListedSystem =
  Database["public"]["Tables"]["listed_systems"]["Row"];
export type ListingPlan = Database["public"]["Enums"]["listing_plan"];

export type PlanDef = {
  id: ListingPlan;
  name: string;
  priceUSD: number;
  pricePeriod: "mensual" | "anual";
  tagline: string;
  perks: string[];
  featured?: boolean;
};

export const PLANS: PlanDef[] = [
  {
    id: "basic",
    name: "Listado",
    priceUSD: 19,
    pricePeriod: "mensual",
    tagline: "Aparecé en el directorio.",
    perks: [
      "Ficha permanente en /sistemas",
      "Aparece en tu categoría",
      "Hasta 3 industrias target",
      "Link dofollow a tu sitio",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceUSD: 49,
    pricePeriod: "mensual",
    tagline: "Más visibilidad y prioridad.",
    featured: true,
    perks: [
      "Todo lo del plan Listado",
      "Posición destacada en búsquedas",
      "Hasta 10 industrias target",
      "Logo en mayor tamaño",
      "Estadísticas de visualización",
    ],
  },
  {
    id: "featured",
    name: "Featured",
    priceUSD: 99,
    pricePeriod: "mensual",
    tagline: "Aparición premium en home.",
    perks: [
      "Todo lo del plan Pro",
      "Slot en home (Sistemas destacados)",
      "Industrias ilimitadas",
      "Banner mensual en categorías relevantes",
      "Reporte mensual con métricas",
    ],
  },
];

export const planById = (id: ListingPlan) => PLANS.find((p) => p.id === id)!;

/** Slug para listings: a partir del nombre del producto. */
export function listingSlug(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Lista de listings activos (pagos al día) — para mostrar en /sistemas. */
export async function listActiveListings(limit = 60): Promise<ListedSystem[]> {
  const { data, error } = await supabase
    .from("listed_systems")
    .select("*")
    .eq("status", "active")
    .order("plan", { ascending: false }) // featured > pro > basic
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[listings] listActiveListings error:", error.message);
    return [];
  }
  return data ?? [];
}
