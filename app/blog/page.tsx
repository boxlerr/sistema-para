import Link from "next/link";
import { supabase } from "@/lib/supabase";
import AdPlaceholder from "@/components/AdPlaceholder";

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  // Fetch from seo_pages as the informational engine (Blog/Artículos)
  const { data: articulos, error } = await supabase
    .from("seo_pages")
    .select("slug, h1_title, meta_description, created_at, industry")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching blog articles:", error);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="max-w-2xl mb-12">
        <span className="eyebrow mb-4">Motor Informacional</span>
        <h1 className="mt-2 text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl">
          Blog y Guías
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-8">
          Guías completas, comparativas y análisis para ayudarte a elegir el software
          adecuado para tu negocio, etapa por etapa.
        </p>
      </div>

      <div className="mb-12">
        <AdPlaceholder size="leaderboard" />
      </div>

      {articulos && articulos.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articulos.map((articulo) => (
            <article key={articulo.slug} className="card-modern relative flex flex-col group">
              <div className="mb-4">
                <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700 ring-1 ring-teal-100 uppercase tracking-wider">
                  {articulo.industry}
                </span>
                <p className="mt-3 text-xs text-slate-400">
                  {new Date(articulo.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              
              <h2 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                <Link href={`/${articulo.slug}`}>
                  <span className="absolute inset-0" aria-hidden="true" />
                  {articulo.h1_title}
                </Link>
              </h2>
              
              <p className="text-sm text-slate-600 flex-grow mb-6 line-clamp-3">
                {articulo.meta_description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center">
                <span className="text-sm font-semibold text-indigo-600 flex items-center group-hover:text-indigo-700">
                  Leer artículo
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-xl shadow-sm ring-1 ring-slate-100">
          <p className="text-slate-500">No hay artículos publicados aún.</p>
        </div>
      )}
    </div>
  );
}
