-- ============================================================================
-- Migration: 001_create_seo_pages
-- Tabla principal del motor SEO programático.
-- Cada fila es un artículo/landing dirigido a una combinación industria + tipo
-- de software. La generación se hace desde Python (service role) y la lectura
-- es pública para SSR/SSG en Next.js.
-- ============================================================================

create extension if not exists "pgcrypto";

create table if not exists public.seo_pages (
  id                uuid          primary key default gen_random_uuid(),
  slug              text          not null unique,
  industry          text          not null,
  software_type     text          not null,
  h1_title          text          not null,
  meta_title        text          not null,
  meta_description  text          not null,
  html_content      text          not null,
  created_at        timestamptz   not null default now()
);

-- Índices de soporte para listados y filtrado por facets.
create index if not exists seo_pages_industry_idx       on public.seo_pages (industry);
create index if not exists seo_pages_software_type_idx  on public.seo_pages (software_type);
create index if not exists seo_pages_created_at_idx     on public.seo_pages (created_at desc);

-- ============================================================================
-- Row Level Security
--   - Lectura: pública (anon + authenticated).
--   - Escritura: solo service_role (motor Python).
-- ============================================================================
alter table public.seo_pages enable row level security;

drop policy if exists "seo_pages_public_read"        on public.seo_pages;
drop policy if exists "seo_pages_service_role_write" on public.seo_pages;

create policy "seo_pages_public_read"
  on public.seo_pages
  for select
  to anon, authenticated
  using (true);

create policy "seo_pages_service_role_write"
  on public.seo_pages
  for all
  to service_role
  using (true)
  with check (true);
