# Know It Africa

Know It Africa is a premium standalone Next.js web platform for an African AI education and digital innovation brand with the motto: **Positioning Africans for global relevance.**

This repository is being built in phases. The current implementation includes **Phases 1-7**: project foundation, Tailwind design system, reusable homepage components, responsive layout, Framer Motion animations, a premium `/registration` page with React Hook Form + Zod validation, Supabase persistence for registration submissions, server-side Flutterwave payment initialization, payment success/failed pages with server-side verification, and a protected Supabase Auth admin area for dashboard stats and registration management.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hook Form
- Zod
- Supabase
- Flutterwave
- Supabase Auth admin login

## Local Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

The homepage can run without environment variables. Live registration, checkout, payment verification, and admin login require the Supabase and Flutterwave variables in `.env.local` or Vercel Project Settings.

## Current Scope

- Premium homepage for Know It Africa
- Sticky responsive header with mobile menu
- Animated hero section with glow and digital grid styling
- About, programs, bootcamp, audience, partnerships, registration-flow explainer, contact, and footer sections
- Premium `/registration` page with multi-section student, contact, and program-detail form
- React Hook Form + Zod validation with friendly error messages and loading state
- Server-side Supabase insert for registrations with generated `KIA-[YEAR]-[SHORT_RANDOM]` registration IDs
- New registrations are saved with `payment_status = pending`
- Server-side Flutterwave checkout initialization after the registration record is created
- Learners are redirected to Flutterwave checkout without exposing `FLUTTERWAVE_SECRET_KEY`
- `/payment/success` verifies Flutterwave transactions server-side and updates paid registrations
- `/payment/failed` gives learners retry/support options for incomplete payments
- Supabase Auth admin login at `/admin`
- Protected admin dashboard, registrations table with search/status filter, detail page, manual payment status updates, and settings placeholder
- Reusable components for buttons, cards, badges, layout shells, form inputs, selects, textareas, and site sections
- Brand color palette implemented in Tailwind theme tokens

## Planned Supabase Setup

Phase 3 added Supabase persistence for public registration submissions. Run `database/schema.sql` in the Supabase SQL editor before submitting the live form. The intended registrations table is:

```sql
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  registration_id text unique not null,
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
  payment_status text default 'pending',
  payment_reference text,
  flutterwave_transaction_id text,
  amount numeric default 10000,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```


## Supabase Registration Setup

1. Create a Supabase project.
2. Run `database/schema.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local`.
4. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
5. Add `FLUTTERWAVE_SECRET_KEY` and `NEXT_PUBLIC_SITE_URL` for checkout initialization.
6. Restart `npm run dev`.

The service-role key is used only by server-side code to insert registration records. Never expose it in client components.

## Flutterwave Setup

Phase 4 creates Flutterwave checkout links server-side after the registration record is saved. The `/registration` submit button saves the registration, keeps payment status as pending, creates a Flutterwave payment session, and redirects the learner to checkout. Phase 5 adds `/payment/success` and `/payment/failed`; the success page verifies Flutterwave transactions server-side, updates valid records to `paid`, saves `flutterwave_transaction_id`, and shows a WhatsApp confirmation button. Keep `FLUTTERWAVE_SECRET_KEY` server-side only and use `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY` only in safe public contexts.

## Vercel Deployment Notes

1. Push the repository to GitHub.
2. Import the project into Vercel as a Next.js project.
3. In Vercel Project Settings, set the Framework Preset to `Next.js` and ensure the Output Directory is `.next` (or leave the dashboard field empty so the committed `vercel.json` value is used). Do not set the Output Directory to `public`; this app is a Next.js application, not a static export.
4. Add all required environment variables from `.env.example` in Vercel Project Settings when you are ready to test registration, payments, and admin login. You may deploy the homepage first without keys.
5. Set `NEXT_PUBLIC_SITE_URL` to your production domain, for example `https://www.knowitafrica.com`.
6. Run `database/schema.sql` in Supabase before testing the live registration form.
7. Create Supabase Auth admin users before testing `/admin`.
8. Deploy with the default Vercel build command: `npm run build`.

Production readiness checklist:

- Confirm `SUPABASE_SERVICE_ROLE_KEY` and `FLUTTERWAVE_SECRET_KEY` are server-only Vercel environment variables.
- Confirm Flutterwave is using the correct test/live keys for the deployment environment.
- Confirm payment redirects point to `/payment/success` on the production domain.
- Confirm the WhatsApp group link is never published in the UI; send it privately after verified payment.
- Run `npm run typecheck`, `npm run lint`, and `npm run build` before production deployment.

## Admin Login Setup Notes

Admin authentication uses Supabase Auth. Create admin users in the Supabase dashboard under Authentication, then sign in at `/admin`. Protected admin pages call server-side session checks before loading registration data. Current admin routes include:

- `/admin` — login page
- `/admin/dashboard` — total, paid, pending, failed, and recent registrations
- `/admin/registrations` — searchable/filterable registration table with CSV export
- `/admin/registrations/[id]` — detailed record page with manual payment update actions
- `/admin/settings` — placeholder settings page backed by config constants

## Security Notes

- Do not expose `SUPABASE_SERVICE_ROLE_KEY` in client components.
- Do not expose `FLUTTERWAVE_SECRET_KEY` in frontend code.
- Verify Flutterwave transactions server-side only.
- Keep WhatsApp group links private; only send them after verified payment.
