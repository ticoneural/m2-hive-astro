-- TITAN v5.4.2a Production Schema
-- Single Source of Truth: Supabase

-- 1. CLEANUP (Careful in Prod)
-- drop table if exists inquiries;
-- drop table if exists listings;
-- drop table if exists areas;
-- drop table if exists site_settings;

-- 2. SITE SETTINGS (Config Global)
create table site_settings (
  id bigint primary key generated always as identity,
  brand_name text not null,
  whatsapp_number text not null,
  instagram_url text,
  facebook_url text,
  working_hours text,
  default_og_image_path text default '/assets/og-default.jpg',
  created_at timestamptz default now()
);

-- Seed Site Settings (Initial Config)
insert into site_settings (brand_name, whatsapp_number, working_hours)
select 'M2 Real Estate', '50600000000', 'Lunes a Viernes 8am - 5pm'
where not exists (select 1 from site_settings);

-- 3. AREAS (Zonas)
create table areas (
  id bigint primary key generated always as identity,
  slug text unique not null,
  name text not null,
  "order" int default 0,
  created_at timestamptz default now()
);

-- Seed Area (Escazú)
insert into areas (slug, name, "order")
select 'escazu', 'Escazú', 1
where not exists (select 1 from areas where slug = 'escazu');

-- 4. LISTINGS (Propiedades)
create table listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  price numeric not null,
  currency text not null check (currency in ('USD', 'CRC')),
  status text not null check (status in ('draft', 'published', 'hidden')),
  is_featured boolean default false,
  area_id bigint references areas(id),
  cover_path text,
  gallery_paths jsonb default '[]'::jsonb, -- Array of paths
  youtube_url text,
  lat double precision, -- Optional
  lng double precision, -- Optional
  published_at timestamptz,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

-- 5. INQUIRIES (Leads)
create table inquiries (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  name text not null,
  phone text not null,
  message text not null,
  intent text, -- buy/rent/other
  listing_id uuid references listings(id),
  page_path text,
  ip_hash text,
  user_agent text
);

-- 6. SECURITY (RLS)
alter table site_settings enable row level security;
alter table areas enable row level security;
alter table listings enable row level security;
alter table inquiries enable row level security;

-- Policies

-- Site Settings: Public Read
create policy "Public Read Settings" on site_settings
  for select to anon using (true);

-- Areas: Public Read
create policy "Public Read Areas" on areas
  for select to anon using (true);

-- Listings: Public Read ONLY PUBLISHED
create policy "Public Read Published Listings" on listings
  for select to anon
  using (status = 'published');

-- Inquiries: NO PUBLIC INSERT (Service Role Only)
-- We explicitly DO NOT create an insert policy for anon.
-- This ensures only the Service Role (server-side) can insert.
create policy "Service Role Full Access Inquiries" on inquiries
  for all to service_role
  using (true)
  with check (true);

-- Storage Buckets (Logical Definition - Must be created in Studio if not verifiable via SQL)
-- Bucket: listing-media (Public)
-- Policy: SELECT for Anon, INSERT/UPDATE/DELETE for Service Role only.
