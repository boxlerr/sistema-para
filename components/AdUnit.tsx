"use client";

import { useEffect, useRef } from "react";

const PUB_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "ca-pub-2837838140442134";

type AdUnitProps = {
  /** ID del ad slot creado en AdSense → Anuncios → Por unidad. */
  slot: string;
  /** "auto" para responsive (recomendado), o uno fijo: "rectangle", etc. */
  format?: string;
  /** true cuando la unidad debe ocupar todo el ancho disponible. */
  fullWidthResponsive?: boolean;
  /** Estilo CSS extra para el `<ins>`. */
  style?: React.CSSProperties;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Slot real de Google AdSense.
 *
 * Reemplaza progresivamente a <AdPlaceholder /> una vez que AdSense apruebe el
 * sitio y vos crees ad units en el panel (Anuncios → Por unidad → Display).
 *
 * Si no hay slot configurado o estamos en dev sin la lib cargada, no hace
 * nada visible (no rompe el layout).
 */
export default function AdUnit({
  slot,
  format = "auto",
  fullWidthResponsive = true,
  style,
  className,
}: AdUnitProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    if (typeof window === "undefined") return;
    if (!insRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (err) {
      // En dev / sin red AdSense puede tirar — silenciamos para no romper.
      console.warn("[AdUnit] adsbygoogle push failed", err);
    }
  }, []);

  if (!slot) return null;

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block", ...style }}
      data-ad-client={PUB_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
    />
  );
}
