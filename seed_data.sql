-- DATA SEED (TITAN v5.4.2a)
-- Clear existing data for clean demo
delete from inquiries;
delete from listings;
delete from areas;

-- 1. Ensure Area Exists
insert into areas (slug, name, "order")
values ('escazu', 'Escazú', 1);

-- 2. Insert Demo Listings (Using local demo assets)
-- Note: cover_path is usually a UUID from Storage, but logic allows string.
-- We will use relative path convention that frontend hopefully handles or we adjust.
-- Actually, the frontend code prepends Supabase URL. 
-- Fix: We need to temporarily adjust frontend to support local demo assets OR 
-- we provide full URL if possible? 
-- Let's check listing logic: 
-- src=`https://.../listing-media/{listing.cover_path}`
-- Hack for Demo: We will change logic in +page.svelte to handle 'http' prefix or simple paths?
-- Better: We make cover_path a full URL or we use a specific hack.
-- Let's stick to standard and say we need to update the frontend to fallback to local assets if string starts with /assets.

insert into listings (title, slug, price, currency, status, is_featured, area_id, cover_path, gallery_paths, published_at)
select 
  'Residencia de Lujo en Escazú', 
  'residencia-lujo-escazu', 
  1250000, 
  'USD', 
  'published', 
  true, 
  id, 
  'demo_modern_home', -- Placeholder, will need logic tweak or strict storage
  '[]'::jsonb,
  now()
from areas where slug = 'escazu';

insert into listings (title, slug, price, currency, status, is_featured, area_id, cover_path, gallery_paths, published_at)
select 
  'Hacienda Colonial Premium', 
  'hacienda-colonial-escazu', 
  850000, 
  'USD', 
  'published', 
  true, 
  id, 
  'demo_colonial',
  '[]'::jsonb,
  now()
from areas where slug = 'escazu';

insert into listings (title, slug, price, currency, status, is_featured, area_id, cover_path, gallery_paths, published_at)
select 
  'Penthouse Vista Valle', 
  'penthouse-vista-valle', 
  450000, 
  'USD', 
  'published', 
  true, 
  id, 
  'demo_apartment',
  '[]'::jsonb,
  now()
from areas where slug = 'escazu';
