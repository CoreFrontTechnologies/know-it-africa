# Know It Africa

Know It Africa is a premium standalone Next.js web platform for an African AI education and digital innovation brand with the motto: **Positioning Africans for global relevance.**

This repository is being built in phases. The current implementation includes **Phase 1 and Phase 2**: project foundation, Tailwind design system, reusable homepage components, responsive layout, Framer Motion animations, and a premium `/registration` page with React Hook Form + Zod validation. Supabase, Flutterwave payment, and admin functionality are planned for later phases and are not wired yet.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hook Form
- Zod
- Planned later: Supabase and Flutterwave integration

## Local Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` when later phases are implemented:

```bash
cp .env.example .env.local
```

Phase 1 and Phase 2 do not require environment variables to run the homepage or registration form preview.

## Current Scope

- Premium homepage for Know It Africa
- Sticky responsive header with mobile menu
- Animated hero section with glow and digital grid styling
- About, programs, bootcamp, audience, partnerships, registration-flow explainer, contact, and footer sections
- Premium `/registration` page with multi-section student, contact, and program-detail form
- React Hook Form + Zod validation with friendly error messages and loading state
- Reusable components for buttons, cards, badges, layout shells, form inputs, selects, textareas, and site sections
- Brand color palette implemented in Tailwind theme tokens

## Planned Supabase Setup

Later phases will add Supabase Auth and database persistence. The registration form currently validates input only and does not save records yet. The intended registrations table is:

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

## Planned Flutterwave Setup

Later phases will create server-only payment initialization and verification routes. The `/registration` submit button currently validates the form and shows a preview confirmation only; it does not redirect to payment yet. Keep `FLUTTERWAVE_SECRET_KEY` server-side only and use `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY` only in safe public contexts.

## Vercel Deployment Notes

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add environment variables from `.env.example` when payment, registration, and admin features are implemented.
4. Run the default Vercel Next.js build command: `npm run build`.

## Admin Login Setup Notes

Admin authentication is planned for a later phase using Supabase Auth. Once implemented, create admin users in the Supabase dashboard and protect admin routes server-side.

## Security Notes

- Do not expose `SUPABASE_SERVICE_ROLE_KEY` in client components.
- Do not expose `FLUTTERWAVE_SECRET_KEY` in frontend code.
- Verify Flutterwave transactions server-side only.
- Keep WhatsApp group links private; only send them after verified payment.
