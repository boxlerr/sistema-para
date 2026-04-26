import type { Metadata } from "next";
import Link from "next/link";

type RouteProps = {
  searchParams: Promise<{
    slug?: string;
    plan?: string;
    amount?: string;
    name?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Solicitud recibida | SistemasPara",
  robots: { index: false, follow: false },
};

const PAYMENTS_ENABLED = Boolean(process.env.MERCADO_PAGO_ACCESS_TOKEN);

export default async function ExitoPage({ searchParams }: RouteProps) {
  const { slug = "", plan = "basic", amount = "0", name = "" } =
    await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600 ring-1 ring-teal-100">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-heading font-bold text-slate-900 sm:text-4xl">
          ¡Recibimos tu solicitud!
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          {name ? <strong>{name}</strong> : "Tu sistema"} quedó registrado con
          el plan{" "}
          <span className="font-semibold capitalize text-indigo-600">
            {plan}
          </span>
          .
        </p>
      </div>

      <div className="mt-10 card-modern">
        <h2 className="font-heading text-lg font-semibold text-slate-900">
          Próximo paso: pago
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Total a pagar:{" "}
          <strong className="text-slate-900">USD {amount} / mes</strong>.
        </p>

        {PAYMENTS_ENABLED ? (
          <p className="mt-4 text-sm text-slate-600">
            Te llevamos a Mercado Pago para completar el cobro. Una vez
            confirmado, tu ficha pasa a estado <strong>activo</strong>{" "}
            automáticamente y aparece en el directorio.
          </p>
        ) : (
          <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-100">
            <strong>Pasarela de pago en preparación.</strong> Por ahora vamos a
            contactarte por mail dentro de las próximas 24h para coordinar el
            pago manualmente. Apenas confirmemos, tu ficha pasa a{" "}
            <strong>activo</strong>.
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="btn-secondary">
            Volver al inicio
          </Link>
          <Link href="/sistemas" className="btn-ghost">
            Ver el directorio
          </Link>
        </div>

        {slug && (
          <p className="mt-6 text-xs text-slate-400">
            ID de tu solicitud:{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600">
              {slug}
            </code>
          </p>
        )}
      </div>
    </div>
  );
}
