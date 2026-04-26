"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitListing, type SubmitState } from "./actions";
import { PLANS, type ListingPlan } from "@/lib/listings";

const CATEGORIES = [
  "CRM",
  "ERP",
  "Facturación",
  "Inventario",
  "RRHH",
  "E-commerce",
  "Marketing",
  "Contabilidad",
  "Gestión de turnos",
  "Punto de venta (POS)",
  "Reservas",
  "Soporte / Helpdesk",
  "Project management",
  "Otro",
];

const INDUSTRY_SUGGESTIONS = [
  "ferreterías",
  "panaderías",
  "ópticas",
  "talleres mecánicos",
  "veterinarias",
  "inmobiliarias",
  "restaurantes",
  "gimnasios",
  "estudios contables",
  "peluquerías",
  "clínicas dentales",
  "estudios jurídicos",
  "comercio minorista",
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn-accent w-full sm:w-auto"
      disabled={pending}
    >
      {pending ? "Enviando..." : "Enviar y continuar al pago"}
    </button>
  );
}

export default function AgregarForm({
  defaultPlan = "pro" as ListingPlan,
}: {
  defaultPlan?: ListingPlan;
}) {
  const [state, formAction] = useActionState<SubmitState | null, FormData>(
    submitListing,
    null,
  );
  const v = state && !state.ok ? state.values : ({} as Record<string, string>);

  return (
    <form action={formAction} className="mt-10 space-y-12">
      {/* Sección 1 — Datos del producto */}
      <section className="card-modern space-y-6">
        <header>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Paso 1
          </span>
          <h2 className="mt-1 font-heading text-2xl font-bold text-slate-900">
            Datos del sistema
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Cómo querés que aparezca en el directorio.
          </p>
        </header>

        <Field
          label="Nombre del sistema"
          name="name"
          required
          placeholder="Holded, Alegra, MiCRM..."
          defaultValue={v.name}
        />
        <Field
          label="Sitio web oficial"
          name="website"
          type="url"
          required
          placeholder="https://miSistema.com"
          defaultValue={v.website}
        />
        <Field
          label="URL del logo (opcional)"
          name="logo_url"
          type="url"
          placeholder="https://..."
          defaultValue={v.logo_url}
          help="Cuadrado 256×256 recomendado. Si no, te lo coordinamos por mail."
        />
        <Field
          label="Descripción corta"
          name="short_description"
          required
          maxLength={160}
          placeholder="Una frase de hasta 160 caracteres que resuma qué hacés."
          defaultValue={v.short_description}
          help="Aparece en cards de listado."
        />
        <Field
          label="Descripción larga"
          name="long_description"
          textarea
          rows={6}
          required
          placeholder="Para qué empresas es ideal, features distintivas, qué problema resuelve..."
          defaultValue={v.long_description}
          help="2 a 4 párrafos. Sin emojis, sin frases plantilla."
        />
      </section>

      {/* Sección 2 — Clasificación */}
      <section className="card-modern space-y-6">
        <header>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Paso 2
          </span>
          <h2 className="mt-1 font-heading text-2xl font-bold text-slate-900">
            Clasificación
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Dónde mostrar tu sistema.
          </p>
        </header>

        <SelectField
          label="Categoría principal"
          name="primary_category"
          required
          options={CATEGORIES}
          defaultValue={v.primary_category}
        />

        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">
            Industrias target{" "}
            <span className="font-normal text-slate-500">
              (marcá todas las que apliquen)
            </span>
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {INDUSTRY_SUGGESTIONS.map((ind) => (
              <label
                key={ind}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  name="industries"
                  value={ind}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="capitalize">{ind}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <Field
          label="Modelo de pricing (opcional)"
          name="pricing_model"
          placeholder="Ej: Desde USD 29/mes — freemium disponible"
          defaultValue={v.pricing_model}
        />
      </section>

      {/* Sección 3 — Contacto */}
      <section className="card-modern space-y-6">
        <header>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Paso 3
          </span>
          <h2 className="mt-1 font-heading text-2xl font-bold text-slate-900">
            Contacto
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sólo lo usamos para coordinar el alta y el pago.
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Nombre y apellido"
            name="contact_name"
            required
            defaultValue={v.contact_name}
          />
          <Field
            label="Email"
            name="contact_email"
            type="email"
            required
            defaultValue={v.contact_email}
          />
        </div>
      </section>

      {/* Sección 4 — Plan */}
      <section className="space-y-6">
        <header>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Paso 4
          </span>
          <h2 className="mt-1 font-heading text-2xl font-bold text-slate-900">
            Elegí tu plan
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Podés cambiarlo más adelante. Pago mensual, cancelás cuando quieras.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <label
              key={plan.id}
              className={`relative flex cursor-pointer flex-col rounded-2xl border-2 bg-white p-6 transition hover:border-indigo-200 ${
                plan.featured ? "border-indigo-200" : "border-slate-200"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                  Recomendado
                </span>
              )}
              <input
                type="radio"
                name="plan"
                value={plan.id}
                defaultChecked={plan.id === defaultPlan}
                className="peer sr-only"
              />
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  {plan.name}
                </h3>
                <div className="text-right">
                  <span className="font-heading text-3xl font-bold text-slate-900">
                    USD {plan.priceUSD}
                  </span>
                  <span className="block text-xs text-slate-500">
                    / {plan.pricePeriod}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-600">{plan.tagline}</p>
              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-0.5 h-4 w-4 flex-none text-teal-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.296a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.414L8.5 12.086l6.79-6.79a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-transparent peer-checked:ring-indigo-600 transition" />
            </label>
          ))}
        </div>
      </section>

      {/* Submit */}
      {state && !state.ok && (
        <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-100">
          {state.error}
        </div>
      )}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Al continuar aceptás los{" "}
          <a href="/terminos" className="text-indigo-600 hover:underline">
            términos
          </a>{" "}
          y la{" "}
          <a href="/privacidad" className="text-indigo-600 hover:underline">
            política de privacidad
          </a>
          .
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}

// ---------- Sub-components -----------

type FieldProps = {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  help?: string;
  type?: string;
  maxLength?: number;
  textarea?: boolean;
  rows?: number;
};

function Field({
  label,
  name,
  required,
  placeholder,
  defaultValue,
  help,
  type = "text",
  maxLength,
  textarea,
  rows,
}: FieldProps) {
  const baseClass =
    "mt-1 block w-full rounded-xl border-0 bg-white px-3 py-2.5 text-sm text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500";
  return (
    <div>
      <label className="block">
        <span className="text-sm font-semibold text-slate-900">
          {label}
          {required && <span className="ml-1 text-rose-600">*</span>}
        </span>
        {textarea ? (
          <textarea
            name={name}
            required={required}
            placeholder={placeholder}
            defaultValue={defaultValue}
            rows={rows ?? 4}
            className={baseClass}
          />
        ) : (
          <input
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            defaultValue={defaultValue}
            maxLength={maxLength}
            className={baseClass}
          />
        )}
      </label>
      {help && <p className="mt-1 text-xs text-slate-500">{help}</p>}
    </div>
  );
}

function SelectField({
  label,
  name,
  required,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-900">
        {label}
        {required && <span className="ml-1 text-rose-600">*</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue || ""}
        className="mt-1 block w-full rounded-xl border-0 bg-white px-3 py-2.5 text-sm text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="" disabled>
          Seleccioná una opción
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
