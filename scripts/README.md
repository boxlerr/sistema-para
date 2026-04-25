# 🤖 Programmatic SEO Engine

> The brain behind **SistemasPara.com**. This engine automates market research and high-quality content generation using state-of-the-art AI.

---

## 🛠️ Environment Setup

Ensure you have your environment variables configured in the root `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...    # Ensure this is the Service Role Key
GEMINI_API_KEY=...               # From https://aistudio.google.com/
```

### Initial Installation
```bash
cd scripts
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

---

## 🚀 Usage Guide

The engine reads keywords from a CSV and performs a two-pass research and composition flow.

| Command | Description |
| :--- | :--- |
| `python generate_pages.py` | Process all rows in `keywords.csv` |
| `python generate_pages.py --limit 5` | Process only the first 5 rows (Smoke test) |
| `python generate_pages.py --dry-run` | Request from Gemini but **do not** write to Supabase |
| `python generate_pages.py --csv custom.csv` | Use a custom keyword file |

---

## 📊 Keyword Format

The engine expects a `keywords.csv` file with the following headers:

```csv
industry,software_type
ferreterías,software de inventario
panaderías,software de punto de venta
clínicas dentales,CRM médico
```

---

## 💡 Key Features

- **Grounding:** Uses Gemini's Google Search tool to find actual software products and real pricing.
- **Idempotency:** Uses `upsert` logic based on the URL slug. Running it twice with the same keywords updates the content instead of creating duplicates.
- **Rate-Limit Friendly:** Built-in throttling and retry logic to respect Gemini's API limits.
- **SEO Optimized:** Generates structured HTML, meta titles, and descriptions ready for Google indexing.
