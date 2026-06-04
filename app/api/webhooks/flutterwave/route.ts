import { NextResponse } from "next/server";
import { verifyRegistrationPayment } from "@/lib/payments/verification";

function hasValidSignature(request: Request) {
  const configuredSecret = process.env.FLUTTERWAVE_WEBHOOK_SECRET;
  if (!configuredSecret) return true;

  const signature = request.headers.get("verif-hash");
  return signature === configuredSecret;
}

export async function POST(request: Request) {
  if (!hasValidSignature(request)) {
    return NextResponse.json({ ok: false, message: "Invalid webhook signature." }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const transactionId = payload?.data?.id ? String(payload.data.id) : undefined;
    const txRef = payload?.data?.tx_ref ? String(payload.data.tx_ref) : undefined;
    const gatewayStatus = payload?.data?.status ? String(payload.data.status) : payload?.event;

    const result = await verifyRegistrationPayment({ transactionId, txRef, gatewayStatus });
    return NextResponse.json({ ok: true, state: result.state });
  } catch (error) {
    console.error("Flutterwave webhook failed", error);
    return NextResponse.json({ ok: false, message: "Webhook processing failed." }, { status: 500 });
  }
}
