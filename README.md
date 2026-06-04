# Know It Africa Platform

Know It Africa is a standalone production-ready Next.js platform for African AI education, digital skills, bootcamps, and innovation programs.

**Brand motto:** Positioning Africans for global relevance.

The app includes a premium public website, event-based registration, server-side Flutterwave checkout, Supabase persistence/auth, payment verification, and an authenticated admin console.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4-style global design tokens
- Framer Motion and Lucide React
- React Hook Form + Zod
- Supabase Database + Supabase Auth
- Flutterwave payment initialization, verification, and webhook route
- Vercel deployment

## What is included

- Public pages: `/`, `/events`, `/contact`, `/registration`, `/payment/success`, `/payment/failed`
- Admin pages: `/admin`, `/admin/dashboard`, `/admin/registrations`, `/admin/registrations/[id]`, `/admin/events`, `/admin/events/new`, `/admin/events/[id]/edit`, `/admin/payments`, `/admin/testimonials`, `/admin/partners`, `/admin/settings`, `/admin/activity`
- Dynamic event/program management with safe fallback content when Supabase is not configured
- Event-based registration with `KIA-[YEAR]-[SHORT_RANDOM]` registration IDs
- Payment status tracking: `pending`, `paid`, `failed`, `cancelled`, `manually_confirmed`
- Flutterwave server-side checkout creation and transaction verification
- Supabase Row Level Security schema in `database/schema.sql`
- SEO metadata, robots, sitemap, loading/error pages, favicon and brand assets

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The homepage and public fallback pages can run without Supabase/Flutterwave keys. Registration, payment, and admin functionality require environment variables.

## Environment variables

Set these in `.env.local` for local development and in Vercel Project Settings for production:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_EMAILS=owner@example.com
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST_or_LIVE_public_key
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST_or_LIVE_secret_key
FLUTTERWAVE_WEBHOOK_SECRET=your_flutterwave_webhook_secret
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=2349033222589
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` or `FLUTTERWAVE_SECRET_KEY` in browser/client code.

## Supabase setup

1. Create a Supabase project.
2. Go to **SQL Editor**.
3. Copy and run all SQL in `database/schema.sql`.
4. Confirm these tables exist: `events`, `event_modules`, `registrations`, `testimonials`, `partners`, `site_settings`, `admin_activity_logs`.
5. Go to **Authentication → Users** and create the first admin user.
6. Copy the admin user UUID and insert it into `public.admin_users` with the same email.
7. Add that email to `ADMIN_EMAILS` in `.env.local` and Vercel.
8. Copy your project URL, anon key, and service-role key into `.env.local` and Vercel.

The schema enables Row Level Security. Public users do not read private registration records; server actions use the service-role key to create and update registration/payment records.

## Flutterwave setup

1. Create/login to Flutterwave.
2. Use test keys first.
3. Set `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY` and `FLUTTERWAVE_SECRET_KEY`.
4. Set your redirect URL to:
   - `https://your-domain.com/payment/success`
5. Set failed/cancel redirect to:
   - `https://your-domain.com/payment/failed`
6. Set webhook URL to:
   - `https://your-domain.com/api/webhooks/flutterwave`
7. If you configure a webhook secret/hash in Flutterwave, set the same value as `FLUTTERWAVE_WEBHOOK_SECRET` in Vercel.

Payment amount is taken from the selected event record on the server, not trusted from the client form.

## Admin login setup

1. Create a Supabase Auth user from the Supabase dashboard.
2. Insert that user into `public.admin_users` using the SQL comment in `database/schema.sql`.
3. Add the same email to `ADMIN_EMAILS` in Vercel, for example `owner@example.com,operations@example.com`.
4. Visit `/admin` and login with the Supabase Auth email/password.
5. Use the admin console to view registrations, payments, events, activity logs, settings, testimonials, and partners.

Protected admin routes are enforced by middleware and server-side session checks.

## Vercel deployment

1. Push the code to GitHub `main`.
2. Import the repo into Vercel.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Output directory: leave blank or `.next`. Do not set `public`.
6. Add all environment variables from `.env.example`.
7. Deploy.
8. After deployment, set `NEXT_PUBLIC_SITE_URL` to the final Vercel or custom-domain URL and redeploy.

## Custom domain

1. In Vercel, go to **Project → Settings → Domains**.
2. Add your domain.
3. Follow Vercel DNS instructions.
4. Update `NEXT_PUBLIC_SITE_URL` to `https://your-domain.com`.
5. Update Flutterwave redirect/webhook URLs to the same domain.
6. Redeploy.

## Testing checklist

Before launch, test:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Homepage loads on desktop/mobile
- `/events` shows real events and empty future-events state
- `/registration` loads a current registration-open event
- Registration creates a Supabase record with `payment_status = pending`
- Flutterwave redirects to checkout
- Successful payment updates `payment_status = paid`
- Failed payment shows retry/support options
- `/admin` login works
- Admin routes are blocked when logged out
- Admin can search/export registrations
- Admin can update payment status and admin notes
- Admin can create/edit events and modules
- Footer social/contact links open correctly

## Switching to production payments

1. Finish test-mode payment checks.
2. Replace Flutterwave test keys with live keys in Vercel.
3. Confirm live Flutterwave redirect/webhook URLs.
4. Redeploy.
5. Perform one small live transaction and verify Supabase status updates.

## Common errors

### Vercel says “No Output Directory named public”
This is a Next.js app. Output directory should be blank or `.next`, not `public`.

### `NEXT_PUBLIC_SUPABASE_URL is not configured`
Add Supabase variables to `.env.local` and Vercel, then restart/redeploy.

### Admin login says not configured
Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### Admin login says unauthorized
Add the email to `ADMIN_EMAILS`, insert the Auth user into `public.admin_users`, and redeploy/relogin.

### Registration saves but payment does not start
Check `FLUTTERWAVE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`, selected event status, and event price.

### Vercel warns about vulnerable Next.js
Confirm `package.json` uses a patched Next.js version and Vercel is deploying the latest commit from `main`.

## Security notes

- Keep service-role and payment secret keys server-only.
- Do not publish WhatsApp group links publicly.
- Use Supabase Auth for admin access.
- Keep Row Level Security enabled.
- Use server-side payment verification before marking records paid.
