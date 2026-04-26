"use server";

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { Database } from "@/types/supabase";
import { listingSlug, planById, type ListingPlan } from "@/lib/listings";

/**
 * Cliente con SERVICE_ROLE para bypass de RLS al crear el listing.
 * Solo se usa server-side.
 */
function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY",
    );
  }
  return createClient<Database>(url, key, {
    auth: { persistSession: false },
  });
}

export type SubmitState =
  | { ok: true; slug: string }
  | { ok: false; error: string; values: Record<string, string> };

function getStr(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

function getStrList(form: FormData, key: string): string[] {
  return form
    .getAll(key)
    .map((v) => String(v).trim())
    .filter(Boolean);
}

export async function submitListing(
  _prev: SubmitState | null,
  form: FormData,
): Promise<SubmitState> {
  const values = {
    name: getStr(form, "name"),
    website: getStr(form, "website"),
    short_description: getStr(form, "short_description"),
    long_description: getStr(form, "long_description"),
    primary_category: getStr(form, "primary_category"),
    industries: getStrList(form, "industries").join(", "),
    pricing_model: getStr(form, "pricing_model"),
    logo_url: getStr(form, "logo_url"),
    contact_name: getStr(form, "contact_name"),
    contact_email: getStr(form, "contact_email"),
    plan: getStr(form, "plan") || "basic",
  };

  // Validación mínima.
  const missing: string[] = [];
  if (!values.name) missing.push("nombre");
  if (!values.website) missing.push("website");
  if (!/^https?:\/\//i.test(values.website)) missing.push("website (URL válida)");
  if (!values.short_description) missing.push("descripción corta");
  if (values.short_description.length > 160)
    return { ok: false, error: "La descripción corta no puede superar 160 caracteres.", values };
  if (!values.long_description) missing.push("descripción larga");
  if (!values.primary_category) missing.push("categoría");
  if (!values.contact_name) missing.push("contacto (nombre)");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contact_email))
    missing.push("email de contacto válido");

  const validPlans: ListingPlan[] = ["basic", "pro", "featured"];
  if (!validPlans.includes(values.plan as ListingPlan)) missing.push("plan");

  if (missing.length) {
    return {
      ok: false,
      error: `Completá: ${missing.join(", ")}.`,
      values,
    };
  }

  const supabase = adminClient();

  // Slug único — si choca, sufijo numérico.
  const baseSlug = listingSlug(values.name);
  let slug = baseSlug;
  for (let i = 2; i <= 50; i++) {
    const { data } = await supabase
      .from("listed_systems")
      .select("slug")
      .eq("slug", slug)
      .maybeSingle();
    if (!data) break;
    slug = `${baseSlug}-${i}`;
  }

  const industries = getStrList(form, "industries");
  const plan = values.plan as ListingPlan;

  const { error } = await supabase.from("listed_systems").insert({
    name: values.name,
    slug,
    website: values.website,
    logo_url: values.logo_url || null,
    short_description: values.short_description,
    long_description: values.long_description,
    primary_category: values.primary_category,
    industries,
    pricing_model: values.pricing_model || null,
    contact_name: values.contact_name,
    contact_email: values.contact_email,
    plan,
    status: "pending_payment",
  });

  if (error) {
    console.error("[submitListing] insert error:", error);
    return {
      ok: false,
      error: "No pudimos guardar tu solicitud. Probá de nuevo en un minuto.",
      values,
    };
  }

  // Calculamos monto sólo para mostrar en la pantalla de éxito.
  const planDef = planById(plan);
  const params = new URLSearchParams({
    slug,
    plan,
    amount: String(planDef.priceUSD),
    name: values.name,
  });

  redirect(`/agregar/exito?${params.toString()}`);
}
