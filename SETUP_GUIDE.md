# Know It Africa Beginner Setup Guide

This guide walks you from a fresh GitHub/Vercel project to a working production platform.

## 1. Install locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## 2. Create Supabase project

1. Go to Supabase and create a new project.
2. Open **SQL Editor**.
3. Open this repo file: `database/schema.sql`.
4. Copy everything and run it in Supabase.
5. Confirm all tables were created:
   - `events`
   - `event_modules`
   - `registrations`
   - `testimonials`
   - `partners`
   - `site_settings`
   - `admin_activity_logs`

## 3. Get Supabase keys

In Supabase, go to **Project Settings → API** and copy:

- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- Anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Service role key → `SUPABASE_SERVICE_ROLE_KEY`

Add them to `.env.local` and Vercel.

## 4. Create first admin user

1. In Supabase, open **Authentication → Users**.
2. Click **Add user**.
3. Enter your admin email and password.
4. Confirm the user if Supabase asks for confirmation.
5. Copy the user UUID from Supabase.
6. Run this in SQL Editor, replacing the values:

```sql
insert into public.admin_users (user_id, email, role)
values ('AUTH_USER_UUID_HERE', 'owner@example.com', 'owner');
```

7. Add `ADMIN_EMAILS=owner@example.com` in Vercel and `.env.local`.
8. Visit `/admin` and login.

## 5. Create/manage events

1. Login at `/admin`.
2. Open **Events & Programs**.
3. Create an event.
4. Use status `registration_open` to make it available on `/registration`.
5. Set price, date, venue, max students, and modules.
6. Mark one event as featured.

If no database keys are configured, the app shows safe fallback event content. Real registration/payment needs Supabase.

## 6. Flutterwave setup

1. Open Flutterwave dashboard.
2. Copy test public key and test secret key.
3. Add them to `.env.local` and Vercel:

```env
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST...
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST...
```

4. Set redirect URLs:

```text
https://your-domain.com/payment/success
https://your-domain.com/payment/failed
```

5. Set webhook URL:

```text
https://your-domain.com/api/webhooks/flutterwave
```

6. If Flutterwave gives you a webhook hash/secret, add it as:

```env
FLUTTERWAVE_WEBHOOK_SECRET=your_secret
```

## 7. Vercel environment variables

In Vercel, go to **Project → Settings → Environment Variables** and add:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=owner@example.com
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=
FLUTTERWAVE_SECRET_KEY=
FLUTTERWAVE_WEBHOOK_SECRET=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=2349033222589
```

Use `https://your-domain.com` for `NEXT_PUBLIC_SITE_URL` in production.

## 8. Deploy to Vercel

1. Push code to GitHub `main`.
2. Import repository in Vercel.
3. Choose Framework: **Next.js**.
4. Build command: `npm run build`.
5. Output directory: blank or `.next`.
6. Deploy.

## 9. Add custom domain

1. In Vercel, open **Domains**.
2. Add your domain.
3. Follow Vercel DNS instructions.
4. Update `NEXT_PUBLIC_SITE_URL` to the new domain.
5. Update Flutterwave redirect and webhook URLs.
6. Redeploy.

## 10. Test registration

1. Open `/registration`.
2. Fill every required field.
3. Submit.
4. Confirm a row appears in Supabase `registrations`.
5. Confirm `payment_status` starts as `pending`.
6. Confirm Flutterwave checkout opens.

## 11. Test payment

1. Use Flutterwave test cards/test flow.
2. Complete payment.
3. Return to `/payment/success`.
4. Confirm the page shows the registration ID and WhatsApp confirmation button.
5. Confirm Supabase updates to `paid`.

## 12. Production launch checklist

- Supabase schema installed
- Admin user created in Supabase Auth
- Admin user inserted into `public.admin_users`
- `ADMIN_EMAILS` set in Vercel
- Current event created with `registration_open`
- Flutterwave test payment passed
- Live Flutterwave keys added
- `NEXT_PUBLIC_SITE_URL` is production domain
- Footer contact/social links verified
- WhatsApp group link is not public
- `npm run typecheck`, `npm run lint`, and `npm run build` pass

## 13. Common fixes

- **404 on Vercel:** confirm production branch is `main` and output directory is not `public`.
- **Admin login fails:** check Supabase URL/anon key and admin user password.
- **Admin unauthorized:** add the email to `ADMIN_EMAILS` and insert the user into `public.admin_users`.
- **Registration unavailable:** create an event with status `registration_open`.
- **Payment mismatch:** ensure event price in admin is correct; amount is server-controlled.
- **Webhook not updating:** confirm webhook URL and `FLUTTERWAVE_WEBHOOK_SECRET`.
