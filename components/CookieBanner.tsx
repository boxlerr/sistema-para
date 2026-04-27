"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "sp_cookie_consent_v1";

type Consent = "accepted" | "rejected";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
    [key: string]: unknown;
  }
}

/**
 * Banner de consent mínimo viable para AdSense + GDPR.
 * - Persiste la elección en localStorage.
 * - Si el usuario rechaza, le pasa a AdSense la señal de Non-Personalized Ads
 *   vía requestNonPersonalizedAds (cuando la lib está cargada).
 * - No usamos Google Consent Mode v2 todavía: queda como mejora futura
 *   si activás propiedades GA4 o targetás explícitamente EEE/UK.
 */
export default function CookieBanner() {
  const [decision, setDecision] = useState<Consent | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "rejected") {
        setDecision(stored);
        applyAdSenseConsent(stored);
      }
    } catch {
      /* localStorage bloqueado: tratamos como sin decisión */
    }
  }, []);

  function persist(choice: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* noop */
    }
    setDecision(choice);
    applyAdSenseConsent(choice);
  }

  // Mientras hidrata o ya hay decisión: no renderizamos el banner.
  if (!mounted || decision !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md"
    >
      <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-2xl ring-1 ring-slate-800">
        <h2 className="font-heading text-base font-semibold">
          Cookies y privacidad
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          Usamos cookies propias y de terceros (incluyendo Google AdSense y
          Vercel Analytics) para operar el sitio, medir audiencia y mostrar
          anuncios. Podés aceptar todas, o rechazar las no esenciales.{" "}
          <Link
            href="/privacidad"
            className="font-medium text-white underline underline-offset-2 hover:text-slate-200"
          >
            Ver política
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => persist("rejected")}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-slate-200 ring-1 ring-slate-700 transition hover:bg-slate-800"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => persist("accepted")}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}

function applyAdSenseConsent(choice: Consent) {
  if (typeof window === "undefined") return;
  try {
    const queue = (window.adsbygoogle = window.adsbygoogle || []);
    if (choice === "rejected") {
      queue.push({ requestNonPersonalizedAds: 1 });
    }
    // 'accepted' deja el comportamiento por defecto (anuncios personalizados).
  } catch {
    /* AdSense aún no cargada: la próxima visita hidrata desde localStorage */
  }
}
