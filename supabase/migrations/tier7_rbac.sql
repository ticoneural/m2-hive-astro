-- Tier 7: RBAC Migration (Profiles)

-- 1. Create Profiles Table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null check (role in ('public', 'agent', 'admin')) default 'public',
  full_name text,
  phone text,
  created_at timestamptz default now()
);

-- 2. Enable RLS
alter table public.profiles enable row level security;

-- 3. Policies
-- Public Read: Visible to everyone (e.g. for Agent profiles on "Firm" page if we used this table)
-- But for "Admin" checks, we need to read own profile.
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- 4. Trigger for new Users (Auto-Profile)
-- This ensures every new Auth User gets a 'public' profile automatically.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'public');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Seed Admin (Bootstrap)
-- REPLACE 'your-email@m2.cr' with the actual admin email if known,
-- otherwise user must update manually.
-- update profiles set role = 'admin' where id = 'UUID_OF_ADMIN';
