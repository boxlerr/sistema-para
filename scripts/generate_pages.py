"""
SistemasPara.com — Motor SEO programático.

Lee keywords.csv (columnas: industry, software_type), para cada fila pide a
Gemini un artículo SEO en HTML estructurado (JSON estricto), genera el slug
y lo inserta en la tabla `seo_pages` de Supabase usando la SERVICE_ROLE_KEY.

Uso:
    cd scripts
    python -m venv .venv && source .venv/bin/activate
    pip install -r requirements.txt
    python generate_pages.py                     # procesa todas las filas
    python generate_pages.py --limit 3           # solo primeras 3
    python generate_pages.py --csv mi.csv        # otro CSV
    python generate_pages.py --dry-run           # no escribe en Supabase

Variables de entorno requeridas (en ../.env.local):
    NEXT_PUBLIC_SUPABASE_URL
    SUPABASE_SERVICE_ROLE_KEY
    GEMINI_API_KEY
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import unicodedata
from pathlib import Path
from typing import Any

import pandas as pd
from dotenv import load_dotenv

# ---------------------------------------------------------------------------
# Configuración
# ---------------------------------------------------------------------------

ROOT_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = ROOT_DIR / ".env.local"
DEFAULT_CSV = Path(__file__).resolve().parent / "keywords.csv"

GEMINI_MODEL = "gemini-2.5-flash"
SLEEP_SECONDS_BETWEEN_CALLS = 4  # 2 calls por fila → margen para rate limits
SUPABASE_TABLE = "seo_pages"


# ---------------------------------------------------------------------------
# Utilidades
# ---------------------------------------------------------------------------

def slugify(value: str) -> str:
    """Convierte 'Software de Facturación' → 'software-de-facturacion'."""
    value = unicodedata.normalize("NFKD", value)
    value = value.encode("ascii", "ignore").decode("ascii")
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9\s-]", "", value)
    value = re.sub(r"[\s_-]+", "-", value)
    return value.strip("-")


def build_slug(software_type: str, industry: str) -> str:
    return f"{slugify(software_type)}-para-{slugify(industry)}"


def build_research_prompt(industry: str, software_type: str) -> str:
    """Prompt de investigación con Google Search grounding."""
    return (
        f"Investiga en web las 5 mejores opciones REALES de {software_type} "
        f"para {industry} en mercado hispanohablante (España, México, Argentina, "
        "Chile, Colombia, Perú, Uruguay).\n\n"
        "Para cada una entrega en texto plano:\n"
        "- Nombre exacto del producto\n"
        "- URL oficial completa (https://...)\n"
        "- Empresa que lo desarrolla\n"
        "- Modelo de pricing si está público (mensual/anual/freemium)\n"
        "- Tamaño de empresa ideal (autónomo, PyME, mediana, enterprise)\n"
        "- 2 a 3 features distintivas REALES (no inventes)\n"
        "- Países donde opera principalmente\n\n"
        "REGLAS CRÍTICAS:\n"
        "- Solo herramientas REALES con presencia web verificable.\n"
        "- Si el rubro tiene pocas opciones verticales, completa con "
        "generalistas adaptables (Odoo, Holded, Salesforce, HubSpot, "
        "Monday, Zoho, Bitrix24, Contpaqi, Alegra, Bind ERP, etc.).\n"
        "- NO inventes productos. Si no encontrás suficientes en una "
        "categoría, decilo explícitamente.\n"
        "- Para casos como delivery de restaurantes incluí líderes "
        "regionales reales (PedidosYa, Rappi, Uber Eats, DiDi Food).\n"
    )


def build_compose_prompt(
    industry: str, software_type: str, research_notes: str
) -> str:
    """Prompt de composición SEO sobre la research verificada."""
    return f"""Eres editor SEO B2B senior. Con la siguiente investigación verificada
en web (NO inventes nada por fuera de esto, pero podés sintetizar y omitir
opciones débiles):

---INVESTIGACION---
{research_notes}
---/INVESTIGACION---

Escribe un artículo SEO de 850–1100 palabras en HTML sobre el tema
"Mejor {software_type} para {industry}" con la siguiente ESTRUCTURA EXACTA:

1. <p> Intro: 2 párrafos. Primer párrafo describe un problema CONCRETO
   y específico de {industry} (no genérico, usa lenguaje del rubro).
   Segundo párrafo explica por qué un buen {software_type} resuelve eso.

2. <h2>Qué buscar en un {software_type} para {industry}</h2>
   <ul> con 6 a 8 <li> de criterios CONCRETOS para este rubro
   (no genéricos como "fácil de usar"; pensá en integraciones,
   normativa local, escalas, casos de uso del rubro).

3. <h2>Las 3 mejores herramientas en 2026</h2>
   Por cada una de las 3 herramientas (elegí las 3 más fuertes de la
   investigación, descartá débiles):
   <h3>Nombre real</h3>
   <p>Para quién es: tamaño de empresa, perfil de usuario.</p>
   <p>Lo que la hace fuerte para {industry}: 2–3 features reales
   tomadas de la investigación, conectadas al rubro.</p>
   <p>Pricing: si lo tenés (rango); si no, "consultar".</p>
   <p><strong>Sitio oficial:</strong> <a href="URL_REAL_DE_LA_INVESTIGACION" target="_blank" rel="noopener">dominio.com</a></p>

4. <h2>Errores comunes al elegir {software_type} para {industry}</h2>
   <ul> con 4 <li>. Cada uno empieza con <strong>Error N:</strong> y
   describe un error real específico del rubro (no genérico).

5. <h2>Preguntas frecuentes</h2>
   3 bloques: <h3>pregunta</h3><p>respuesta directa de 2–3 frases</p>
   Las preguntas tienen que ser las que un dueño de {industry} googlearía
   antes de comprar (precio típico, integraciones específicas, alternativas
   gratis, normativa, etc.).

6. <h2>Conclusión y recomendación</h2>
   <p> 1 párrafo con una recomendación SEGMENTADA: cuál elegir si sos
   pequeño/independiente, cuál si sos mediano, cuál si sos grande.

REGLAS DE ESCRITURA:
- Cada una de las 3 herramientas DEBE incluir su <a href> con la URL real
  EXACTA tal como apareció en la investigación.
- NO uses frases plantilla repetidas: prohibido "es una solución integral",
  "potente herramienta", "amplia gama", "es ideal para", "cabe destacar".
- Tono español neutro B2B, segunda persona ("tu negocio", "tu equipo").
- Específico del rubro {industry}: nombrá procesos reales del sector.
- NO emojis. NO <h1>. NO <html>/<body>. Solo el cuerpo del artículo.

Devuelve SOLO JSON estricto, sin markdown, sin ```json:
{{
  "h1_title": string (máx 70 chars, sin nombre de marca),
  "meta_title": string (<60 chars, terminando con " | SistemasPara"),
  "meta_description": string (<155 chars, persuasivo, con la keyword),
  "html_content": string (HTML del artículo según la estructura)
}}"""


# ---------------------------------------------------------------------------
# Generación
# ---------------------------------------------------------------------------

def _generate_with_retry(client: Any, *, model: str, contents: str, config: dict[str, Any]) -> Any:
    """Wrapper con retry-on-429 que respeta el retry_delay del error."""
    max_retries = 3
    last_exc: Exception | None = None
    for attempt in range(max_retries + 1):
        try:
            return client.models.generate_content(
                model=model, contents=contents, config=config,
            )
        except Exception as exc:  # noqa: BLE001
            msg = str(exc)
            last_exc = exc
            # 429 con retry hint → esperar y reintentar.
            if "429" in msg or "RESOURCE_EXHAUSTED" in msg:
                m = re.search(r"retry in (\d+(?:\.\d+)?)s", msg)
                wait = float(m.group(1)) + 1 if m else 30
                # Si el delay sugerido es muy largo (> 5min), es daily quota.
                if wait > 300:
                    raise RuntimeError(
                        f"Daily quota exhausted (espera {wait:.0f}s). "
                        "Re-correr cuando resetee."
                    ) from exc
                if attempt < max_retries:
                    print(f"   ⏳ 429 rate-limit, esperando {wait:.0f}s (intento {attempt + 1}/{max_retries})...")
                    time.sleep(wait)
                    continue
            raise
    assert last_exc is not None
    raise last_exc


def research_real_tools(client: Any, industry: str, software_type: str) -> str:
    """Pasada 1: investigación con Google Search grounding."""
    response = _generate_with_retry(
        client,
        model=GEMINI_MODEL,
        contents=build_research_prompt(industry, software_type),
        config={
            # Tool de Google Search → respuestas grounded en web real.
            "tools": [{"google_search": {}}],
            "temperature": 0.3,
            "max_output_tokens": 4096,
            "thinking_config": {"thinking_budget": 0},
        },
    )
    text = (response.text or "").strip()
    if not text:
        raise RuntimeError("Research vacía (Gemini sin grounding)")
    return text


def compose_seo_article(
    client: Any, industry: str, software_type: str, research_notes: str
) -> dict[str, str]:
    """Pasada 2: compone el artículo SEO en JSON estricto."""
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=build_compose_prompt(industry, software_type, research_notes),
        config={
            "response_mime_type": "application/json",
            "temperature": 0.75,
            "max_output_tokens": 8192,
            # Desactiva thinking — el JSON no necesita razonamiento extra
            # y los tokens de thinking cortarían la salida.
            "thinking_config": {"thinking_budget": 0},
        },
    )
    text = (response.text or "").strip()
    if not text:
        raise RuntimeError("Compose vacía")

    data = json.loads(text)
    required = {"h1_title", "meta_title", "meta_description", "html_content"}
    missing = required - set(data.keys())
    if missing:
        raise RuntimeError(f"JSON incompleto, faltan claves: {missing}")
    return data


def generate_seo_page(
    client: Any, industry: str, software_type: str
) -> dict[str, str]:
    """Pipeline completo: research grounded → composición JSON."""
    notes = research_real_tools(client, industry, software_type)
    return compose_seo_article(client, industry, software_type, notes)


def upsert_page(
    supabase_client: Any,
    *,
    slug: str,
    industry: str,
    software_type: str,
    payload: dict[str, str],
) -> None:
    record = {
        "slug": slug,
        "industry": industry,
        "software_type": software_type,
        "h1_title": payload["h1_title"],
        "meta_title": payload["meta_title"],
        "meta_description": payload["meta_description"],
        "html_content": payload["html_content"],
    }
    # upsert por slug → idempotente: re-correr el script no duplica filas.
    supabase_client.table(SUPABASE_TABLE).upsert(
        record, on_conflict="slug"
    ).execute()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(description="Generador SEO programático.")
    parser.add_argument("--csv", type=Path, default=DEFAULT_CSV)
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="No inserta en Supabase, solo imprime el JSON generado.",
    )
    args = parser.parse_args()

    load_dotenv(ENV_PATH)

    supabase_url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    service_role = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    gemini_key = os.getenv("GEMINI_API_KEY")

    missing_envs = [
        name
        for name, val in [
            ("NEXT_PUBLIC_SUPABASE_URL", supabase_url),
            ("SUPABASE_SERVICE_ROLE_KEY", service_role),
            ("GEMINI_API_KEY", gemini_key),
        ]
        if not val
    ]
    if missing_envs and not args.dry_run:
        print(f"❌ Faltan variables en .env.local: {', '.join(missing_envs)}")
        return 1
    if missing_envs and args.dry_run:
        print(f"⚠️  Dry-run con envs faltantes: {', '.join(missing_envs)}")

    if not args.csv.exists():
        print(f"❌ CSV no encontrado: {args.csv}")
        return 1

    df = pd.read_csv(args.csv)
    expected_cols = {"industry", "software_type"}
    if not expected_cols.issubset(df.columns):
        print(f"❌ El CSV debe tener columnas: {expected_cols}")
        return 1

    if args.limit is not None:
        df = df.head(args.limit)

    print(f"📄 {len(df)} filas a procesar desde {args.csv.name}")

    # Lazy imports — evitan exigir credenciales para --help.
    from google import genai  # noqa: WPS433
    from supabase import Client, create_client  # noqa: WPS433

    gemini_client = genai.Client(api_key=gemini_key) if gemini_key else None

    supabase_client: Client | None = None
    if not args.dry_run and supabase_url and service_role:
        supabase_client = create_client(supabase_url, service_role)

    ok, fail = 0, 0
    for idx, row in df.iterrows():
        industry = str(row["industry"]).strip()
        software_type = str(row["software_type"]).strip()
        slug = build_slug(software_type, industry)

        print(f"\n[{idx + 1}/{len(df)}] {software_type} · {industry}")
        print(f"   slug: {slug}")

        try:
            if gemini_client is None:
                raise RuntimeError("GEMINI_API_KEY no configurada")
            payload = generate_seo_page(gemini_client, industry, software_type)
            print(f"   ✓ Gemini → {payload['meta_title']}")

            if args.dry_run or supabase_client is None:
                print("   (dry-run) no se inserta en Supabase")
            else:
                upsert_page(
                    supabase_client,
                    slug=slug,
                    industry=industry,
                    software_type=software_type,
                    payload=payload,
                )
                print(f"   ✓ Supabase upsert → /{slug}")
            ok += 1
        except Exception as exc:  # noqa: BLE001
            fail += 1
            print(f"   ✗ ERROR: {exc}")

        # Throttle — evita rate limits de Gemini y RLS write storms.
        if idx < len(df) - 1:
            time.sleep(SLEEP_SECONDS_BETWEEN_CALLS)

    print(f"\n✔ Listo. OK={ok}  FAIL={fail}")
    return 0 if fail == 0 else 2


if __name__ == "__main__":
    sys.exit(main())
