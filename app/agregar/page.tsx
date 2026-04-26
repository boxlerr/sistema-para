import type { Metadata } from "next";
import AgregarForm from "./AgregarForm";

export const metadata: Metadata = {
  title: "Agregar tu sistema al directorio | SistemasPara",
  description:
    "Sumá tu producto SaaS a SistemasPara.com y llegá a miles de empresas que buscan software por industria.",
};

export default function AgregarPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <header className="text-center">
        <span className="eyebrow">Agregar tu sistema</span>
        <h1 className="mt-4 text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl">
          Llegá a empresas que buscan tu solución
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          SistemasPara recibe tráfico orgánico de empresas comparando software
          por industria. Sumá tu producto en menos de 3 minutos.
        </p>
      </header>

      <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
        {[
          {
            t: "Tráfico calificado",
            d: "Llegan buscando exactamente tu categoría.",
          },
          {
            t: "SEO permanente",
            d: "Tu ficha indexada para siempre con link dofollow.",
          },
          {
            t: "Sin compromiso",
            d: "Cancelás cuando quieras. Sin contratos.",
          },
        ].map((b) => (
          <li
            key={b.t}
            className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
          >
            <p className="font-heading text-sm font-semibold text-slate-900">
              {b.t}
            </p>
            <p className="mt-1 text-xs text-slate-500">{b.d}</p>
          </li>
        ))}
      </ul>

      <AgregarForm />
    </div>
  );
}
