-- ============================================================================
-- Migration: 002_create_listed_systems
-- Tabla de sistemas pagos / submitted listings.
-- Cada fila representa un producto SaaS que la empresa-dueña paga para
-- aparecer en el directorio. El registro queda en pending_payment hasta que
-- Mercado Pago confirme el cobro vía webhook (Step 6).
-- ============================================================================

create extension if not exists "pgcrypto";

do $$ begin
  create type public.listing_status as enum (
    'draft', 'pending_payment', 'active', 'expired', 'rejected'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.listing_plan as enum ('basic', 'pro', 'featured');
exception when duplicate_object then null; end $$;

create table if not exists public.listed_systems (
  id                  uuid                primary key default gen_random_uuid(),
  name                text                not null,
  slug                text                not null unique,
  website             text                not null,
  logo_url            text,
  short_description   text                not null,
  long_description    text                not null,
  primary_category    text                not null,
  industries          text[]              not null default '{}',
  pricing_model       text,
  contact_name        text                not null,
  contact_email       text                not null,
  status              listing_status      not null default 'pending_payment',
  plan                listing_plan        not null default 'basic',
  payment_provider    text,
  payment_session_id  text,
  payment_id          text,
  paid_until          timestamptz,
  created_at          timestamptz         not null default now(),
  updated_at          timestamptz         not null default now()
);

create index if not exists listed_systems_status_idx           on public.listed_systems (status);
create index if not exists listed_systems_primary_category_idx on public.listed_systems (primary_category);
create index if not exists listed_systems_industries_gin       on public.listed_systems using gin (industries);

-- Trigger updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists listed_systems_touch_updated_at on public.listed_systems;
create trigger listed_systems_touch_updated_at
  before update on public.listed_systems
  for each row execute function public.touch_updated_at();

-- ============================================================================
-- RLS
--   - Lectura pública: solo registros 'active'.
--   - Inserción pública: permitida pero forzada a 'pending_payment'.
--   - Update / select-all: solo service_role.
-- ============================================================================
alter table public.listed_systems enable row level security;

drop policy if exists "listed_systems_public_read_active" on public.listed_systems;
drop policy if exists "listed_systems_public_insert"      on public.listed_systems;
drop policy if exists "listed_systems_service_role_all"   on public.listed_systems;

create policy "listed_systems_public_read_active"
  on public.listed_systems for select
  to anon, authenticated
  using (status = 'active');

create policy "listed_systems_public_insert"
  on public.listed_systems for insert
  to anon, authenticated
  with check (status = 'pending_payment');

create policy "listed_systems_service_role_all"
  on public.listed_systems for all
  to service_role
  using (true) with check (true);
