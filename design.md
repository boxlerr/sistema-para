# SistemasPara.com — Design System

> Fuente única de verdad de UI/UX. Todo cambio visual debe respetar este documento.

---

## 1. Marca

### Nombre y dominio
- **Nombre:** SistemasPara.com
- **Lockup tipográfico:**
  - `Sistemas` → `font-heading`, `font-bold`, `text-slate-900`
  - `Para` → `font-heading`, `font-bold`, `text-indigo-600`
  - `.com` → `font-heading`, `font-medium`, `text-slate-500`, tamaño 0.6× del wordmark
- **Tagline oficial:** *"El directorio B2B de sistemas y software para empresas"*

### Logo
- **Isotipo (ícono):** cuadrado redondeado `rounded-2xl` `bg-indigo-600`, padding interior, contiene un grafo de nodos conectados (3–4 nodos blancos + 1 nodo `text-teal-400` como acento).
- **Variantes obligatorias:**
  - Lockup horizontal (ícono + wordmark + .com) — uso por defecto en header/footer.
  - Solo wordmark — uso en contextos donde el ícono ya está presente.
  - Solo ícono — favicon, app icon, avatares.
- **Favicon:** versión simplificada del isotipo, optimizada para 32×32 y 16×16.

---

## 2. Paleta de colores

| Token             | Hex       | Tailwind        | Uso                                              |
| ----------------- | --------- | --------------- | ------------------------------------------------ |
| `primary`         | `#4F46E5` | `indigo-600`    | CTAs principales, enlaces, acento de marca       |
| `primary-hover`   | `#4338CA` | `indigo-700`    | Hover de botones primarios                       |
| `accent`          | `#14B8A6` | `teal-500`      | CTAs secundarios destacados, badges, micro-acentos |
| `accent-hover`    | `#0D9488` | `teal-600`      | Hover de botones accent                          |
| `background`      | `#F8FAFC` | `slate-50`      | Fondo base del sitio                             |
| `surface`         | `#FFFFFF` | `white`         | Cards, header, modales                           |
| `surface-muted`   | `#F1F5F9` | `slate-100`     | Inputs, fondos de iconos, ad placeholders        |
| `border`          | `#E2E8F0` | `slate-200`     | Bordes neutros                                   |
| `text-primary`    | `#0F172A` | `slate-900`     | Títulos y texto principal                        |
| `text-secondary`  | `#64748B` | `slate-500`     | Texto secundario, descripciones                  |
| `text-muted`      | `#94A3B8` | `slate-400`     | Placeholders, labels deshabilitados              |
| `cta-dark`        | `#1E1B4B` | `indigo-950`    | Fondo del banner CTA "¿Tienes un sistema?"       |

**Reglas:**
- `primary` y `accent` nunca se combinan en el mismo botón. `accent` se reserva para el CTA "Agregar Sistema" y badges de estado positivo.
- Texto sobre `cta-dark` es siempre blanco; el botón sobre `cta-dark` es `accent`.
- No hay modo oscuro en V1.

---

## 3. Tipografía

### Familias
- **Headings — `font-heading`:** Plus Jakarta Sans (vía `next/font/google`, variable `--font-jakarta`).
- **Body — `font-sans`:** Inter (vía `next/font/google`, variable `--font-inter`).

### Escala
| Rol       | Clase Tailwind                                        | Peso | Tracking         |
| --------- | ----------------------------------------------------- | ---- | ---------------- |
| `display` | `text-5xl md:text-6xl font-heading font-bold`         | 700  | `tracking-tight` |
| `h1`      | `text-4xl md:text-5xl font-heading font-bold`         | 700  | `tracking-tight` |
| `h2`      | `text-3xl md:text-4xl font-heading font-bold`         | 700  | `tracking-tight` |
| `h3`      | `text-xl md:text-2xl font-heading font-semibold`      | 600  | `tracking-tight` |
| `h4`      | `text-lg font-heading font-semibold`                  | 600  | normal           |
| `body-lg` | `text-lg leading-8 font-sans text-slate-600`          | 400  | normal           |
| `body`    | `text-base leading-7 font-sans`                       | 400  | normal           |
| `small`   | `text-sm font-sans text-slate-600`                    | 400  | normal           |
| `eyebrow` | `text-xs font-sans font-semibold uppercase tracking-wider text-indigo-600` | 600 | `tracking-wider` |

**Regla:** TODO `<h1>`–`<h4>` usa `font-heading`. TODO párrafo, label, botón y nav usa `font-sans`.

---

## 4. Espaciado, radios, sombras

- **Container:** `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- **Sección vertical:** `py-16 md:py-24`
- **Gap entre cards:** `gap-6`
- **Radio canónico:** `rounded-xl` (0.875rem). Botones, cards e inputs usan `rounded-xl`. Badges y pills usan `rounded-full`. El isotipo usa `rounded-2xl`.
- **Sombras:**
  - `shadow-sm` — cards en reposo.
  - `shadow-md` — cards en hover (transición 200ms).
  - Sin sombras pesadas. Profundidad se logra con `ring-1 ring-slate-100`.

---

## 5. Componentes canónicos

### 5.1 Header
- `sticky top-0 z-40`, `bg-white/80 backdrop-blur-md`, `border-b border-slate-200/70`, alto `h-16`.
- Estructura: `[Logo] · [Nav central: Sistemas, Categorías, Empresas, Recursos] · [CTA "Agregar Sistema" en accent]`.
- Nav links: `text-sm font-medium text-slate-600 hover:text-slate-900`.
- En mobile el nav colapsa; el CTA "Agregar Sistema" siempre visible.

### 5.2 Botones
- **`.btn-primary`** — `bg-indigo-600 text-white hover:bg-indigo-700` `rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm`.
- **`.btn-accent`** — idéntico a primary pero `bg-teal-500 hover:bg-teal-600`. Reservado para "Agregar Sistema" y CTAs de conversión.
- **`.btn-secondary`** — `bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50`.
- **`.btn-ghost`** — sin fondo, `text-slate-600 hover:text-slate-900`.

### 5.3 Cards
- **`.card-modern`** — `bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md`.
- **Card de sistema (sistema destacado):** logo arriba, nombre `h3`, badges de categoría con `rounded-full bg-{tono}-50 text-{tono}-700 ring-1 ring-{tono}-100 px-2.5 py-0.5 text-xs`, descripción `text-sm text-slate-600`, link "Ver sistema →" en `text-indigo-600 font-semibold`.
- **Card de categoría:** ícono dentro de cuadrado `h-12 w-12 rounded-xl bg-{tono}-50 ring-1 ring-{tono}-100 text-{tono}-600`, título `h4`, sublabel "N sistemas" en `small`.

### 5.4 Hero
- Eyebrow pill: `inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100` con texto "Directorio B2B".
- H1 con palabra acentuada en `text-indigo-600` (ej: "Encuentra el sistema perfecto para **tu empresa**").
- Subtítulo `body-lg` con `max-w-2xl`.
- Search bar: input `rounded-xl ring-1 ring-slate-200 bg-white px-4 py-3 text-sm` + botón `.btn-accent` "Buscar".

### 5.5 Stats strip
- Grid 4 columnas, separadores `divide-x divide-slate-200` en desktop.
- Número: `text-3xl font-heading font-bold text-slate-900`.
- Label: `text-sm text-slate-500`.

### 5.6 CTA banner ("¿Tienes un sistema?")
- `bg-indigo-950 rounded-2xl p-8 md:p-12`, ícono circular blanco/translúcido a la izquierda, texto blanco, botón `.btn-accent` a la derecha.

### 5.7 AdPlaceholder
- `border border-dashed border-slate-300 bg-slate-100 rounded-xl text-xs uppercase tracking-wider text-slate-400`.
- Variantes: `leaderboard` (728×90), `rectangle` (300×250), `skyscraper` (160×600), `banner` (responsive).

### 5.8 Footer
- `bg-white border-t border-slate-200`, padding generoso, 4 columnas: Producto · Industrias · Recursos · Legal. Logo + tagline a la izquierda en mobile.

---

## 6. Iconografía

- **Estilo:** outline / stroke, grosor `1.5`. Uso de `lucide-react` por defecto.
- **Tamaño base:** `h-5 w-5` inline, `h-6 w-6` en cards, `h-10 w-10` en hero.
- **Color:** hereda de su contenedor; en cards de categoría se pintan con el tono de la categoría.
- **Encapsulamiento:** todo ícono temático va dentro de un cuadrado `rounded-xl` con fondo tonal `-50` y `ring-1` con tono `-100`.

---

## 7. Microinteracciones

- Transiciones por defecto: `transition duration-200 ease-out`.
- Hover de cards: elevar a `shadow-md` y `-translate-y-0.5` (sutil).
- Focus visible: `focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`. Nunca remover el outline sin reemplazo.

---

## 8. Pilares de marca (uso editorial)

| Pilar      | Significado visual                                                        |
| ---------- | ------------------------------------------------------------------------- |
| Moderno    | Layouts limpios, mucho whitespace, bordes redondeados.                    |
| Confiable  | Sombras sutiles, jerarquía clara, datos verificables visibles (stats).    |
| Escalable  | Componentes reutilizables, grids consistentes, sin one-offs.              |
| Claridad   | Una idea por sección, CTA único por bloque, lenguaje directo en español. |

---

## 9. Reglas de oro (no negociables)

1. `font-heading` SOLO para `h1`–`h4` y wordmark.
2. CTAs primarios = `indigo-600`. CTA de conversión "Agregar Sistema" = `teal-500`. Nunca al revés.
3. Cards = `rounded-xl` + `shadow-sm` + `ring-1 ring-slate-100`. Nunca `border` solo, nunca `shadow-lg`.
4. Texto sobre fondo blanco/slate-50 = `text-slate-900` (títulos) o `text-slate-600` (cuerpo). Nunca negro puro.
5. Iconos siempre encapsulados en cuadrado tonal con ring del mismo tono.
6. Container global = `max-w-6xl`. No exceder.
7. Idioma: español neutro B2B. Sin emojis en UI de producto.
