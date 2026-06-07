# Database setup

Use `database/schema.sql` as the **single source of truth** for Supabase. It is the full production schema, not the old registrations-only snippet.

## What the schema creates

Run the SQL file in the Supabase SQL editor before enabling live registration submissions. It creates and configures:

- `events` — public/admin-managed events and programs.
- `event_modules` — modules attached to each event.
- `registrations` — student registrations and payment status records.
- `testimonials` — public testimonials managed from admin.
- `partners` — public partner records managed from admin.
- `site_settings` — editable site/contact/payment settings.
- `admin_activity_logs` — admin activity history.
- `admin_users` — approved Supabase Auth users who can access the admin panel.

## If you already ran the old schema

An earlier setup snippet only created `registrations` with `amount default 10000`. The current `schema.sql` is migration-safe for that case: it adds the missing event/admin/payment columns, updates the amount default to `12250`, and expands the allowed payment statuses.

If Supabase reports that a column or policy already exists, copy the exact error and compare it with the current `database/schema.sql`; do not continue using the old registrations-only schema.

## Admin setup reminder

After creating your first user in **Supabase Authentication → Users**, insert the user UUID into `public.admin_users` using the SQL comment near the bottom of `database/schema.sql`, then add that same email to `ADMIN_EMAILS` in `.env.local` and Vercel.

## Security reminder

Private registration records are not publicly readable. Registrations are created and updated by server actions/API routes using `SUPABASE_SERVICE_ROLE_KEY`, while admin read/update access is controlled by Supabase Auth and the `admin_users` table.
