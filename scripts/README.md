# Motor SEO programático

Genera páginas SEO en bulk con Gemini y las inserta en Supabase.

## Setup (una sola vez)

```bash
cd scripts
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Variables requeridas

En la raíz del proyecto, en `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://ywbhbrqwgfmxksdmvejz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...      # NO la publishable
GEMINI_API_KEY=...                            # https://aistudio.google.com/apikey
```

## Uso

```bash
# Procesar todas las filas de keywords.csv
python generate_pages.py

# Solo las primeras 3 (smoke test)
python generate_pages.py --limit 3

# Dry-run: pide a Gemini pero no escribe en Supabase
python generate_pages.py --dry-run --limit 1

# Otro CSV
python generate_pages.py --csv my_keywords.csv
```

## CSV

Columnas obligatorias: `industry`, `software_type`.

```csv
industry,software_type
ferreterías,software de inventario
panaderías,software de facturación
```

## Idempotencia

El script hace `upsert` por `slug`. Re-correrlo con las mismas keywords
sobreescribe el contenido (útil para regenerar con un prompt mejor) sin
duplicar filas.

## Throttle

Hay un `sleep(3)` entre llamadas a Gemini para evitar rate limits.
