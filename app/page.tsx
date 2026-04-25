import Link from "next/link";
import AdPlaceholder from "@/components/AdPlaceholder";

const STATS = [
  { value: "2,450+", label: "Sistemas" },
  { value: "320+", label: "Categorías" },
  { value: "18,600+", label: "Empresas" },
  { value: "50K+", label: "Visitas mensuales" },
];

const CATEGORIES = [
  { name: "CRM", count: 189, tone: "indigo" },
  { name: "ERP", count: 154, tone: "teal" },
  { name: "Contabilidad", count: 98, tone: "amber" },
  { name: "RRHH", count: 112, tone: "rose" },
  { name: "E-commerce", count: 201, tone: "sky" },
  { name: "Marketing", count: 95, tone: "violet" },
] as const;

const TONE_CLASSES: Record<string, string> = {
  indigo: "bg-indigo-50 ring-indigo-100 text-indigo-600",
  teal: "bg-teal-50 ring-teal-100 text-teal-600",
  amber: "bg-amber-50 ring-amber-100 text-amber-600",
  rose: "bg-rose-50 ring-rose-100 text-rose-600",
  sky: "bg-sky-50 ring-sky-100 text-sky-600",
  violet: "bg-violet-50 ring-violet-100 text-violet-600",
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <section className="text-center">
        <span className="eyebrow">Directorio B2B</span>
        <h1 className="mt-6 text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          Encuentra el sistema perfecto para{" "}
          <span className="text-indigo-600">tu empresa</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Miles de soluciones de software, herramientas y plataformas
          organizadas para que tomes mejores decisiones.
        </p>

        <form
          role="search"
          className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-200"
        >
          <input
            type="search"
            placeholder="Buscar sistemas, categorías o empresas..."
            className="flex-1 rounded-lg bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button type="submit" className="btn-accent">
            Buscar
          </button>
        </form>

        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-y-8 sm:grid-cols-4 sm:divide-x sm:divide-slate-200">
          {STATS.map((s) => (
            <div key={s.label} className="px-4">
              <dt className="text-sm text-slate-500">{s.label}</dt>
              <dd className="mt-1 text-3xl font-heading font-bold text-slate-900">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <AdPlaceholder size="leaderboard" />

      <section className="mt-20">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-heading font-bold tracking-tight text-slate-900">
            Categorías populares
          </h2>
          <Link
            href="/categorias"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Ver todas →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.name}
              href={`/categorias/${c.name.toLowerCase()}`}
              className="card-modern flex items-start gap-4"
            >
              <span
                className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${TONE_CLASSES[c.tone]}`}
              >
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
              <div>
                <h3 className="font-heading text-lg font-semibold text-slate-900">
                  {c.name}
                </h3>
                <p className="mt-0.5 text-sm text-slate-500">
                  {c.count} sistemas
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 overflow-hidden rounded-2xl bg-indigo-950 px-8 py-12 md:px-12">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-heading font-bold text-white md:text-3xl">
              ¿Tienes un sistema que otras empresas deberían conocer?
            </h2>
            <p className="mt-2 text-base text-indigo-200">
              Agrega tu sistema al directorio y llega a miles de empresas.
            </p>
          </div>
          <Link href="/agregar" className="btn-accent shrink-0">
            Agregar Sistema
          </Link>
        </div>
      </section>
    </div>
  );
}
