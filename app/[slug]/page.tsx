import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdPlaceholder from "@/components/AdPlaceholder";
import { getSeoPageBySlug } from "@/lib/seoPages";

type RouteProps = { params: Promise<{ slug: string }> };

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://sistemaspara.com";

// Revalidación periódica (ISR): se rehace estática cada hora.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getSeoPageBySlug(slug);

  if (!page) {
    return {
      title: "Página no encontrada — SistemasPara.com",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/${page.slug}`;

  return {
    title: page.meta_title,
    description: page.meta_description,
    alternates: { canonical: url },
    openGraph: {
      title: page.meta_title,
      description: page.meta_description,
      url,
      type: "article",
      siteName: "SistemasPara.com",
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta_title,
      description: page.meta_description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function SeoArticlePage({ params }: RouteProps) {
  const { slug } = await params;
  const page = await getSeoPageBySlug(slug);

  if (!page) notFound();

  const url = `${SITE_URL}/${page.slug}`;

  // JSON-LD Schema.org TechArticle
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.h1_title,
    name: page.meta_title,
    description: page.meta_description,
    inLanguage: "es",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: page.created_at,
    dateModified: page.created_at,
    author: { "@type": "Organization", name: "SistemasPara.com" },
    publisher: {
      "@type": "Organization",
      name: "SistemasPara.com",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/sistema-para-logo.png`,
      },
    },
    about: [
      { "@type": "Thing", name: page.industry },
      { "@type": "Thing", name: page.software_type },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <nav
          aria-label="Migas de pan"
          className="mb-6 text-sm text-slate-500"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <a href="/" className="hover:text-slate-900">
                Inicio
              </a>
            </li>
            <li aria-hidden="true">›</li>
            <li className="capitalize">{page.software_type}</li>
            <li aria-hidden="true">›</li>
            <li className="capitalize text-slate-900">{page.industry}</li>
          </ol>
        </nav>

        <header>
          <span className="eyebrow">{page.software_type}</span>
          <h1 className="mt-4 text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl">
            {page.h1_title}
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            Publicado el{" "}
            <time dateTime={page.created_at}>
              {new Date(page.created_at).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
        </header>

        <AdPlaceholder size="leaderboard" />

        <div
          className="prose prose-slate mt-4 max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-headings:text-slate-900 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: page.html_content }}
        />

        <AdPlaceholder size="leaderboard" />

        <footer className="mt-16 rounded-2xl bg-indigo-950 px-8 py-10 text-white">
          <h2 className="text-2xl font-heading font-bold">
            ¿Conocés un sistema mejor?
          </h2>
          <p className="mt-2 text-indigo-200">
            Sumalo al directorio y ayudá a otras empresas a encontrarlo.
          </p>
          <a href="/agregar" className="btn-accent mt-6">
            Agregar Sistema
          </a>
        </footer>
      </article>
    </>
  );
}
