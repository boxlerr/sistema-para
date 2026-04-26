import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { searchSeoPages } from "@/lib/search";

type RouteProps = { searchParams: Promise<{ q?: string }> };

export const metadata: Metadata = {
  title: "Buscar — SistemasPara",
  description: "Buscá comparativas, sistemas y categorías en el directorio.",
  robots: { index: false, follow: true },
};

export default async function BuscarPage({ searchParams }: RouteProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query.length >= 2 ? await searchSeoPages(query) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <header className="max-w-3xl">
        <span className="eyebrow">Buscar</span>
        <h1 className="mt-4 text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl">
          {query ? (
            <>
              Resultados para{" "}
              <span className="text-indigo-600">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            "Encontrá el sistema que necesitás"
          )}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          {query.length === 0
            ? "Escribí qué tipo de software o industria estás buscando."
            : query.length < 2
              ? "Ingresá al menos 2 caracteres."
              : results.length === 0
                ? "No encontramos artículos para esa búsqueda. Probá con otros términos."
                : `${results.length} ${results.length === 1 ? "artículo encontrado" : "artículos encontrados"}.`}
        </p>

        <form action="/buscar" method="get" role="search" className="mt-8">
          <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-200 max-w-2xl">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Buscar sistemas, categorías o industrias..."
              className="flex-1 rounded-lg bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              autoFocus
            />
            <button type="submit" className="btn-accent">
              Buscar
            </button>
          </div>
        </form>
      </header>

      {results.length > 0 && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((page) => (
            <ArticleCard key={page.slug} page={page} />
          ))}
        </div>
      )}

      {query.length >= 2 && results.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">
            ¿Sos un proveedor y tu sistema no aparece?
          </p>
          <Link href="/agregar" className="btn-accent mt-4">
            Agregar tu sistema
          </Link>
        </div>
      )}
    </div>
  );
}
