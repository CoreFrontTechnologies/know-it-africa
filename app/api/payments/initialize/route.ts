import { NextResponse } from "next/server";
import { initializeFlutterwavePayment } from "@/lib/flutterwave";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { RegistrationRecord } from "@/types/registration";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { registrationId?: string };
    const registrationId = body.registrationId?.trim();

    if (!registrationId) {
      return NextResponse.json({ ok: false, message: "registrationId is required." }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const { data: registration, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("registration_id", registrationId)
      .maybeSingle<RegistrationRecord>();

    if (error || !registration) {
      return NextResponse.json({ ok: false, message: "Registration not found." }, { status: 404 });
    }

    const reference = `${registration.registration_id}-${Date.now()}`;
    const { error: updateError } = await supabase
      .from("registrations")
      .update({ payment_reference: reference, payment_status: "pending" })
      .eq("id", registration.id);

    if (updateError) {
      return NextResponse.json({ ok: false, message: "Could not prepare payment." }, { status: 500 });
    }

    const payment = await initializeFlutterwavePayment({
      amount: Number(registration.amount),
      txRef: reference,
      registrationId: registration.registration_id,
      studentName: registration.full_name,
      studentPhone: registration.student_phone ?? "",
      guardianEmail: registration.guardian_email ?? "contact@knowitafrica.com.ng",
      programTitle: registration.event_title ?? "AI & Software Development Bootcamp",
    });

    return NextResponse.json({ ok: true, checkoutUrl: payment.checkoutUrl, paymentReference: payment.paymentReference });
  } catch (error) {
    console.error("Payment initialize API failed", error);
    return NextResponse.json({ ok: false, message: "Payment initialization failed." }, { status: 500 });
  }
}
