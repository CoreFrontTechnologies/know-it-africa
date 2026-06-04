import { NextResponse } from "next/server";
import { verifyRegistrationPayment } from "@/lib/payments/verification";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      transactionId?: string;
      txRef?: string;
      registrationId?: string;
      gatewayStatus?: string;
    };

    const result = await verifyRegistrationPayment({
      transactionId: body.transactionId,
      txRef: body.txRef,
      registrationId: body.registrationId,
      gatewayStatus: body.gatewayStatus,
    });

    return NextResponse.json({ ok: result.state === "paid", result });
  } catch (error) {
    console.error("Payment verify API failed", error);
    return NextResponse.json({ ok: false, message: "Payment verification failed." }, { status: 500 });
  }
}
