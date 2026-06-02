import "server-only";
function getFlutterwaveSecretKey() {
  const key = process.env.FLUTTERWAVE_SECRET_KEY;

  if (!key) {
    throw new Error("FLUTTERWAVE_SECRET_KEY is not configured.");
  }

  return key;
}

function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return siteUrl.replace(/\/$/, "");
}

type InitializeFlutterwavePaymentInput = {
  amount: number;
  txRef: string;
  registrationId: string;
  studentName: string;
  studentPhone: string;
  guardianEmail: string;
  programTitle: string;
};

type FlutterwaveInitializeResponse = {
  status: string;
  message: string;
  data?: {
    link?: string;
  };
};

export async function initializeFlutterwavePayment({
  amount,
  txRef,
  registrationId,
  studentName,
  studentPhone,
  guardianEmail,
  programTitle,
}: InitializeFlutterwavePaymentInput) {
  const siteUrl = getSiteUrl();
  const response = await fetch("https://api.flutterwave.com/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getFlutterwaveSecretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: txRef,
      amount,
      currency: "NGN",
      redirect_url: `${siteUrl}/payment/success?registration_id=${encodeURIComponent(registrationId)}`,
      customer: {
        email: guardianEmail,
        phonenumber: studentPhone,
        name: studentName,
      },
      customizations: {
        title: "Know It Africa Bootcamp Registration",
        description: programTitle,
        logo: `${siteUrl}/favicon.ico`,
      },
      meta: {
        registration_id: registrationId,
        program_title: programTitle,
      },
    }),
  });

  let payload: FlutterwaveInitializeResponse | null = null;

  try {
    payload = (await response.json()) as FlutterwaveInitializeResponse;
  } catch {
    payload = null;
  }

  if (!response.ok || payload?.status !== "success" || !payload.data?.link) {
    throw new Error(payload?.message || "Flutterwave checkout could not be created.");
  }

  return {
    checkoutUrl: payload.data.link,
    paymentReference: txRef,
  };
}
