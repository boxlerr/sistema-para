import Link from "next/link";
import type { Facet } from "@/lib/seoPages";

export default function FacetCard({
  facet,
  basePath,
}: {
  facet: Facet;
  basePath: "/categorias" | "/sistemas";
}) {
  return (
    <Link
      href={`${basePath}/${facet.slug}`}
      className="card-modern group flex items-start gap-4"
    >
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-lg font-semibold text-slate-900 capitalize group-hover:text-indigo-600 transition">
          {facet.name}
        </h3>
        <p className="mt-0.5 text-sm text-slate-500">
          {facet.count} {facet.count === 1 ? "artículo" : "artículos"}
        </p>
      </div>
    </Link>
  );
}
