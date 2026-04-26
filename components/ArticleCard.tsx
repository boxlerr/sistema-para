import Link from "next/link";
import type { SeoPageCard } from "@/lib/seoPages";

const TONE = ["indigo", "teal", "amber", "rose", "sky", "violet"] as const;

const TONE_CLASSES: Record<(typeof TONE)[number], string> = {
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  teal: "bg-teal-50 text-teal-700 ring-teal-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  rose: "bg-rose-50 text-rose-700 ring-rose-100",
  sky: "bg-sky-50 text-sky-700 ring-sky-100",
  violet: "bg-violet-50 text-violet-700 ring-violet-100",
};

function pickTone(seed: string): (typeof TONE)[number] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return TONE[Math.abs(hash) % TONE.length];
}

export default function ArticleCard({ page }: { page: SeoPageCard }) {
  const tone = pickTone(page.software_type);
  return (
    <Link href={`/${page.slug}`} className="card-modern flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${TONE_CLASSES[tone]}`}
        >
          {page.software_type}
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200 capitalize">
          {page.industry}
        </span>
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-slate-900 line-clamp-2">
        {page.h1_title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 line-clamp-3">
        {page.meta_description}
      </p>
      <div className="mt-auto pt-4 flex items-center justify-between">
        <time
          dateTime={page.created_at}
          className="text-xs text-slate-400"
        >
          {new Date(page.created_at).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <span className="text-sm font-semibold text-indigo-600">
          Leer →
        </span>
      </div>
    </Link>
  );
}
