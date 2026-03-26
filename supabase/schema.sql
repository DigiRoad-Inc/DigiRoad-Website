-- ══════════════════════════════════════════════════════════════
-- DigiRoad — Supabase schema
-- Run this in your Supabase project → SQL Editor
-- ══════════════════════════════════════════════════════════════

-- ── Pricing requests ─────────────────────────────────────────
create table if not exists public.pricing_requests (
  id                 uuid        default gen_random_uuid() primary key,
  created_at         timestamptz default now(),
  full_name          text        not null,
  email              text        not null,
  university_name    text        not null,
  website            text,
  country            text,
  student_population text,
  solutions          text[],
  goals              text
);

alter table public.pricing_requests enable row level security;

-- Only the edge function (service role) can read/write — no client access
create policy "Service role only" on public.pricing_requests
  using (false);

-- ── Contact submissions ───────────────────────────────────────
create table if not exists public.contact_submissions (
  id           uuid        default gen_random_uuid() primary key,
  created_at   timestamptz default now(),
  full_name    text        not null,
  email        text        not null,
  org_name     text        not null,
  website      text,
  job_level    text,
  job_function text,
  org_type     text,
  org_size     text,
  country      text,
  city         text,
  project_desc text,
  interests    text[],
  timeline     text
);

alter table public.contact_submissions enable row level security;

create policy "Service role only" on public.contact_submissions
  using (false);

-- ── Demo requests ─────────────────────────────────────────────
create table if not exists public.demo_requests (
  id           uuid        default gen_random_uuid() primary key,
  created_at   timestamptz default now(),
  uni_name     text        not null,
  uni_website  text,
  uni_country  text,
  uni_city     text,
  uni_size     text,
  uni_campuses integer,
  inst_type    text,
  full_name    text        not null,
  email        text        not null,
  role         text,
  interests    text[],
  challenges   text
);

alter table public.demo_requests enable row level security;

create policy "Service role only" on public.demo_requests
  using (false);
