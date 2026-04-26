import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { listCardsByCategory } from "@/lib/seoPages";

type RouteProps = { params: Promise<{ categoria: string }> };

export const revalidate = 600;

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { categoria } = await params;
  const { name } = await listCardsByCategory(categoria);
  if (!name) {
    return {
      title: "Categoría no encontrada — SistemasPara",
      robots: { index: false, follow: false },
    };
  }
  const cap = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    title: `${cap} para diferentes industrias | SistemasPara`,
    description: `Comparativas y guías de ${name} adaptadas a distintas industrias: panaderías, ferreterías, ópticas, talleres y más.`,
  };
}

export default async function CategoriaPage({ params }: RouteProps) {
  const { categoria } = await params;
  const { name, cards } = await listCardsByCategory(categoria);
  if (!name) notFound();

  const cap = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-slate-900">
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href="/categorias" className="hover:text-slate-900">
              Categorías
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-slate-900 capitalize">{name}</li>
        </ol>
      </nav>

      <header className="max-w-3xl">
        <span className="eyebrow">Categoría</span>
        <h1 className="mt-4 text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl capitalize">
          {cap}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          {cards.length}{" "}
          {cards.length === 1
            ? "comparativa publicada"
            : "comparativas publicadas"}{" "}
          de {name} adaptadas a distintas industrias.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((page) => (
          <ArticleCard key={page.slug} page={page} />
        ))}
      </div>
    </div>
  );
}
