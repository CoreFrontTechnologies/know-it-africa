-- Know It Africa production schema
-- Run this SQL in the Supabase SQL editor before enabling live registration submissions.

create extension if not exists pgcrypto;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  short_description text,
  full_description text,
  category text,
  status text default 'draft' check (status in ('draft', 'published', 'registration_open', 'registration_closed', 'completed', 'archived')),
  price numeric default 10000,
  currency text default 'NGN',
  start_date date,
  end_date date,
  registration_deadline date,
  venue text,
  delivery_mode text,
  whatsapp_group_note text,
  certificate_available boolean default true,
  featured boolean default false,
  max_students integer,
  cover_image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.event_modules (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  title text not null,
  description text,
  sort_order integer default 0,
  activity text,
  created_at timestamptz default now()
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  registration_id text unique not null,
  event_id uuid references public.events(id),
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
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'cancelled', 'manually_confirmed')),
  payment_reference text,
  flutterwave_transaction_id text,
  amount numeric default 10000,
  currency text default 'NGN',
  admin_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  content text not null,
  image_url text,
  rating integer default 5,
  status text default 'published',
  created_at timestamptz default now()
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  logo_url text,
  website_url text,
  status text default 'published',
  created_at timestamptz default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid,
  action text not null,
  entity_type text,
  entity_id text,
  details jsonb,
  created_at timestamptz default now()
);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text unique not null,
  role text default 'admin',
  active boolean default true,
  created_at timestamptz default now()
);

create index if not exists events_slug_idx on public.events (slug);
create index if not exists events_status_featured_idx on public.events (status, featured);
create index if not exists event_modules_event_sort_idx on public.event_modules (event_id, sort_order);
create index if not exists registrations_registration_id_idx on public.registrations (registration_id);
create index if not exists registrations_payment_status_idx on public.registrations (payment_status);
create index if not exists registrations_event_id_idx on public.registrations (event_id);
create index if not exists registrations_event_slug_idx on public.registrations (event_slug);
create index if not exists registrations_created_at_idx on public.registrations (created_at desc);
create index if not exists testimonials_status_idx on public.testimonials (status);
create index if not exists partners_status_idx on public.partners (status);
create index if not exists admin_activity_logs_created_at_idx on public.admin_activity_logs (created_at desc);
create index if not exists admin_users_email_idx on public.admin_users (lower(email));
create index if not exists admin_users_user_id_idx on public.admin_users (user_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at before update on public.events for each row execute function public.set_updated_at();

drop trigger if exists set_registrations_updated_at on public.registrations;
create trigger set_registrations_updated_at before update on public.registrations for each row execute function public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

alter table public.events enable row level security;
alter table public.event_modules enable row level security;
alter table public.registrations enable row level security;
alter table public.testimonials enable row level security;
alter table public.partners enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_activity_logs enable row level security;
alter table public.admin_users enable row level security;

-- Public read-only content policies.
drop policy if exists "Public can read published events" on public.events;
create policy "Public can read published events" on public.events for select using (status in ('published', 'registration_open', 'completed'));

drop policy if exists "Public can read event modules for public events" on public.event_modules;
create policy "Public can read event modules for public events" on public.event_modules for select using (
  exists (select 1 from public.events where events.id = event_modules.event_id and events.status in ('published', 'registration_open', 'completed'))
);

drop policy if exists "Public can read published testimonials" on public.testimonials;
create policy "Public can read published testimonials" on public.testimonials for select using (status = 'published');

drop policy if exists "Public can read published partners" on public.partners;
create policy "Public can read published partners" on public.partners for select using (status = 'published');

-- Admin policies. Add approved users to public.admin_users after creating them in Supabase Auth.
create or replace function public.is_active_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
      and active = true
  );
$$;

drop policy if exists "Admins can read own admin profile" on public.admin_users;
create policy "Admins can read own admin profile" on public.admin_users for select using (user_id = auth.uid() or public.is_active_admin());

drop policy if exists "Active admins can manage admin users" on public.admin_users;
create policy "Active admins can manage admin users" on public.admin_users for all using (public.is_active_admin()) with check (public.is_active_admin());

drop policy if exists "Authenticated admins can manage events" on public.events;
create policy "Authenticated admins can manage events" on public.events for all using (public.is_active_admin()) with check (public.is_active_admin());

drop policy if exists "Authenticated admins can manage event modules" on public.event_modules;
create policy "Authenticated admins can manage event modules" on public.event_modules for all using (public.is_active_admin()) with check (public.is_active_admin());

drop policy if exists "Authenticated admins can manage registrations" on public.registrations;
create policy "Authenticated admins can manage registrations" on public.registrations for all using (public.is_active_admin()) with check (public.is_active_admin());

drop policy if exists "Authenticated admins can manage testimonials" on public.testimonials;
create policy "Authenticated admins can manage testimonials" on public.testimonials for all using (public.is_active_admin()) with check (public.is_active_admin());

drop policy if exists "Authenticated admins can manage partners" on public.partners;
create policy "Authenticated admins can manage partners" on public.partners for all using (public.is_active_admin()) with check (public.is_active_admin());

drop policy if exists "Authenticated admins can manage settings" on public.site_settings;
create policy "Authenticated admins can manage settings" on public.site_settings for all using (public.is_active_admin()) with check (public.is_active_admin());

drop policy if exists "Authenticated admins can read activity logs" on public.admin_activity_logs;
create policy "Authenticated admins can read activity logs" on public.admin_activity_logs for select using (public.is_active_admin());


-- After creating the first Supabase Auth admin user, insert the user here manually:
-- insert into public.admin_users (user_id, email, role)
-- values ('AUTH_USER_UUID_HERE', 'admin@yourdomain.com', 'owner');

-- Registrations are inserted by server actions/API routes using SUPABASE_SERVICE_ROLE_KEY.
-- Do not create a public SELECT policy for registrations.

insert into public.site_settings (key, value)
values
  ('general', '{"siteName":"Know It Africa","motto":"Positioning Africans for global relevance."}'::jsonb),
  ('contact', '{"whatsapp":"2349033222589","email":"info@knowitafrica.com","venue":"Event venues are announced per program"}'::jsonb),
  ('payment', '{"currency":"NGN","defaultFee":10000}'::jsonb),
  ('registration', '{"open":true}'::jsonb)
on conflict (key) do nothing;

insert into public.events (
  title, slug, short_description, full_description, category, status, price, currency, start_date, venue,
  delivery_mode, whatsapp_group_note, certificate_available, featured, max_students
) values (
  'AI & Software Development Bootcamp',
  'ai-software-development-bootcamp',
  'A practical 5-week AI and software development bootcamp for young Africans.',
  'Learners will cover AI literacy, prompt engineering, software development foundations, content creation with AI, no-code tools, practical projects, and certificate preparation.',
  'Bootcamp',
  'registration_open',
  10000,
  'NGN',
  '2026-06-13',
  'Dependable International School, Dakwa',
  'Physical',
  'The official WhatsApp group link should only be sent privately after verified payment.',
  true,
  true,
  50
)
on conflict (slug) do nothing;
