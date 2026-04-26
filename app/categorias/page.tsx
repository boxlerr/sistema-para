import type { Metadata } from "next";
import FacetCard from "@/components/FacetCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { listCategories } from "@/lib/seoPages";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Categorías de software B2B | SistemasPara",
  description:
    "Explora las categorías de software B2B que cubrimos: CRM, ERP, facturación, inventario, RRHH, e-commerce y más.",
};

export default async function CategoriasPage() {
  const categories = await listCategories();
  const totalArticles = categories.reduce((acc, f) => acc + f.count, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <header className="max-w-2xl">
        <span className="eyebrow">Categorías</span>
        <h1 className="mt-4 text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl">
          Categorías de software
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Cada categoría agrupa nuestras comparativas por tipo de herramienta:
          CRM, facturación, inventario, gestión de turnos y más.
        </p>
      </header>

      <div className="my-10">
        <AdPlaceholder size="leaderboard" />
      </div>

      {categories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">
            Estamos publicando las primeras categorías. Volvé en unos minutos.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500">
            {categories.length}{" "}
            {categories.length === 1 ? "categoría" : "categorías"} ·{" "}
            {totalArticles}{" "}
            {totalArticles === 1 ? "artículo" : "artículos"}
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((facet) => (
              <FacetCard
                key={facet.slug}
                facet={facet}
                basePath="/categorias"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
