# SistemasPara.com

Directorio B2B masivo de software por industria, monetizado con SEO + AdSense.

- **Frontend:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- **Backend:** Supabase (Postgres + RLS)
- **Motor SEO:** Python + Gemini API (`google-genai`) en `/scripts`
- **Deploy:** Vercel (region `gru1` São Paulo)

Diseño y reglas visuales en [design.md](./design.md). Convenciones de Next.js
en [AGENTS.md](./AGENTS.md).

---

## Setup local

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local
# Completar valores de Supabase, Gemini y SITE_URL

# 3. Dev server
npm run dev          # http://localhost:3000
```

## Estructura

```
app/
  layout.tsx              fuentes, metadata global, header
  page.tsx                home (hero, stats, categorías, CTA)
  [slug]/page.tsx         página SEO dinámica con JSON-LD + ISR 1h
  sitemap.ts              sitemap.xml dinámico desde Supabase
  robots.ts               robots.txt
  globals.css             tokens de Tailwind + utilidades de marca
components/
  Header.tsx · Logo.tsx · AdPlaceholder.tsx
lib/
  supabase.ts             cliente público (anon)
  seoPages.ts             helpers tipados para la tabla seo_pages
types/
  supabase.ts             tipos generados desde el schema
supabase/
  migrations/001_create_seo_pages.sql
scripts/
  generate_pages.py       motor SEO programático
  keywords.csv            input (industry, software_type)
  requirements.txt
```

## Generar contenido SEO

```bash
cd scripts
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

python generate_pages.py --dry-run --limit 1   # validación
python generate_pages.py --limit 3             # smoke test real
python generate_pages.py                       # todo el CSV
```

El script hace **upsert por `slug`**, así que es idempotente. Ver
[scripts/README.md](./scripts/README.md) para detalle.

## Deploy en Vercel

1. Push del repo a GitHub.
2. **Import Project** en https://vercel.com/new — Vercel detecta Next.js.
3. En **Settings → Environment Variables** cargar:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (solo si vas a correr Server Actions privadas)
   - `NEXT_PUBLIC_SITE_URL` (la URL final del dominio)
   - `GEMINI_API_KEY` solo si vas a correr el script desde un cron en Vercel; para el motor batch no hace falta.
4. Deploy. El primer build genera `/sitemap.xml` con todas las páginas existentes.

`vercel.json` ya define la región `gru1` (São Paulo) para minimizar latencia
contra Supabase `sa-east-1`, e inyecta headers de seguridad básicos.

## Comandos útiles

```bash
npm run dev          # dev server
npm run build        # build de producción (verifica tipos + SSG)
npm run lint         # ESLint
```
