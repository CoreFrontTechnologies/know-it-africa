-- Know It Africa registrations schema
-- Run this SQL in the Supabase SQL editor before enabling live registration submissions.

create extension if not exists pgcrypto;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  registration_id text unique not null,
  event_title text,
  event_slug text,
  full_name text not null,
  date_of_birth date,
  gender text,
  home_address text,
  school_name text,
  class_category text,
  state_of_origin text,
  lga text,
  student_phone text,
  guardian_name text,
  guardian_occupation text,
  guardian_phone text,
  guardian_email text,
  preferred_contact_channel text,
  preferred_class_category text,
  area_of_interest text,
  device_ownership text,
  internet_access text,
  reason_for_joining text,
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'manually_confirmed')),
  payment_reference text,
  flutterwave_transaction_id text,
  amount numeric default 10000,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists registrations_registration_id_idx on public.registrations (registration_id);
create index if not exists registrations_payment_status_idx on public.registrations (payment_status);
create index if not exists registrations_event_slug_idx on public.registrations (event_slug);
create index if not exists registrations_created_at_idx on public.registrations (created_at desc);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_registrations_updated_at on public.registrations;
create trigger set_registrations_updated_at
before update on public.registrations
for each row
execute function public.set_updated_at();

alter table public.registrations enable row level security;

-- Public users should not read registrations directly. Inserts are handled through a server action
-- using the Supabase service-role key. Admin read/update policies will be added in later phases.

-- If you already created the table before event-based registration, run:
-- alter table public.registrations add column if not exists event_title text;
-- alter table public.registrations add column if not exists event_slug text;
-- create index if not exists registrations_event_slug_idx on public.registrations (event_slug);
