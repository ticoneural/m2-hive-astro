-- Tier 10: The Ledger (Audit System)

-- 1. Create Audit Logs Table
-- Immutable record of system activity.
create table if not exists public.audit_logs (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  resource_id text,
  metadata jsonb default '{}'::jsonb,
  ip_address text
);

-- 2. Security (RLS)
-- Only Service Role can INSERT.
-- Only Admins can SELECT (via Policy).
alter table public.audit_logs enable row level security;

-- Admin Read Policy
create policy "Admins can read audit logs"
  on audit_logs
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Service Role Full Access (Needed for Logging)
create policy "Service Role Full Access Audit"
  on audit_logs
  for all
  to service_role
  using (true)
  with check (true);
