-- Lead capture table for the website contact form.
--
-- Run this once in the Supabase SQL editor (Dashboard -> SQL -> New query),
-- or with `supabase db push` if you use the CLI.
--
-- Security model: the site ships with the *publishable* anon key, which
-- anyone can read out of the JavaScript bundle. Row Level Security is
-- therefore mandatory here — anonymous visitors may INSERT a lead and
-- nothing else. Reading leads requires an authenticated staff account.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text        not null check (char_length(name) between 1 and 120),
  phone       text        not null check (char_length(phone) between 8 and 20),
  project     text,
  scheme      text,
  message     text        check (message is null or char_length(message) <= 2000),
  source      text,
  lang        text        check (lang in ('id', 'en')),
  page_url    text,
  -- Sales pipeline state, updated by staff from the dashboard.
  status      text        not null default 'new'
                          check (status in ('new', 'contacted', 'visiting', 'won', 'lost'))
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);

alter table public.leads enable row level security;

-- Anonymous visitors: insert only.
drop policy if exists "anon can submit a lead" on public.leads;
create policy "anon can submit a lead"
  on public.leads
  for insert
  to anon
  with check (true);

-- Signed-in staff: full read access.
drop policy if exists "staff can read leads" on public.leads;
create policy "staff can read leads"
  on public.leads
  for select
  to authenticated
  using (true);

-- Signed-in staff: update the pipeline status.
drop policy if exists "staff can update leads" on public.leads;
create policy "staff can update leads"
  on public.leads
  for update
  to authenticated
  using (true)
  with check (true);
