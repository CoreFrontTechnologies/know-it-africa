# Database

Phase 3 adds the Supabase registrations schema in `database/schema.sql`.

Run the SQL file in the Supabase SQL editor before using the live `/registration` form. The form writes through a server action with the Supabase service-role key and stores each record with `payment_status = 'pending'` until Flutterwave is connected in the next phase.
