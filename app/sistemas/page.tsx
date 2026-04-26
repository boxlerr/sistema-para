import type { Metadata } from "next";
import FacetCard from "@/components/FacetCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { listIndustries } from "@/lib/seoPages";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Sistemas por industria — Directorio B2B | SistemasPara",
  description:
    "Explora el mejor software por industria: ferreterías, panaderías, ópticas, talleres, restaurantes y más. Comparativas reales y enlaces a sitios oficiales.",
};

export default async function SistemasPage() {
  const industries = await listIndustries();
  const totalArticles = industries.reduce((acc, f) => acc + f.count, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <header className="max-w-2xl">
        <span className="eyebrow">Directorio por industria</span>
        <h1 className="mt-4 text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl">
          Sistemas para tu industria
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Encontrá el software pensado para tu rubro. Comparativas reales,
          opciones específicas y enlaces directos al sitio oficial de cada
          herramienta.
        </p>
      </header>

      <div className="my-10">
        <AdPlaceholder size="leaderboard" />
      </div>

      {industries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">
            Estamos publicando los primeros sistemas. Volvé en unos minutos.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500">
            {industries.length}{" "}
            {industries.length === 1 ? "industria cubierta" : "industrias cubiertas"}{" "}
            · {totalArticles}{" "}
            {totalArticles === 1 ? "artículo publicado" : "artículos publicados"}
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((facet) => (
              <FacetCard
                key={facet.slug}
                facet={facet}
                basePath="/sistemas"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
