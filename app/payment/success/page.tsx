import { CheckCircle2, Clock3, Home, MessageCircle, ShieldCheck, XCircle } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";
import { verifyRegistrationPayment } from "@/lib/payments/verification";

type PaymentSuccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};


function normalize(value?: string | string[]) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function formatNaira(amount?: number | null) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount ?? 0);
}

function createWhatsAppConfirmationLink({ fullName, registrationId }: { fullName: string; registrationId: string }) {
  const message = `Hello Know It Africa, I have completed my registration and payment for the AI & Software Development Bootcamp.\n\nName: ${fullName}\nRegistration ID: ${registrationId}\n\nPlease confirm my payment and send me the official WhatsApp group access.`;

  return `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const metadata = {
  title: "Payment Confirmation | Know It Africa",
  description: "Confirm your Know It Africa bootcamp payment and get WhatsApp confirmation instructions.",
};

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const params = (await searchParams) ?? {};
  const result = await verifyRegistrationPayment({
    transactionId: normalize(params.transaction_id),
    txRef: normalize(params.tx_ref),
    registrationId: normalize(params.registration_id),
    gatewayStatus: normalize(params.status),
  });

  const isPaid = result.state === "paid";
  const isFailed = result.state === "failed";
  const registration = result.registration;
  const registrationId = registration?.registration_id ?? result.registrationId ?? "Pending verification";
  const studentName = registration?.full_name ?? "Student";
  const whatsappLink = registration
    ? createWhatsAppConfirmationLink({ fullName: registration.full_name, registrationId: registration.registration_id })
    : siteConfig.whatsapp;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-light-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-luxury">
          <div className={`pattern-grid px-6 py-12 text-white sm:px-10 ${isPaid ? "bg-royal" : isFailed ? "bg-slate-950" : "bg-primary-blue"}`}>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/10 backdrop-blur">
                {isPaid ? (
                  <CheckCircle2 className="h-11 w-11 text-success" />
                ) : isFailed ? (
                  <XCircle className="h-11 w-11 text-red-300" />
                ) : (
                  <Clock3 className="h-11 w-11 text-gold" />
                )}
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-gold">
                {isPaid ? "Verified Payment" : isFailed ? "Payment Not Completed" : "Verification Pending"}
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                {isPaid ? "Payment Successful" : isFailed ? "Payment Could Not Be Confirmed" : "We are verifying your payment"}
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/78">{result.message}</p>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:p-10">
            <div className="rounded-[1.5rem] border border-slate-100 bg-light-bg p-6">
              <h2 className="text-2xl font-black text-royal">Registration details</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-blue">Registration ID</p>
                  <p className="mt-2 break-all text-xl font-black text-royal">{registrationId}</p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-blue">Student Name</p>
                  <p className="mt-2 text-xl font-black text-royal">{studentName}</p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-blue">Payment Status</p>
                  <p className="mt-2 text-xl font-black capitalize text-royal">{result.state}</p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-blue">Amount Paid</p>
                  <p className="mt-2 text-xl font-black text-royal">{isPaid ? formatNaira(result.amountPaid) : formatNaira(registration?.amount)}</p>
                </div>
              </div>
            </div>

            <aside className="rounded-[1.5rem] bg-royal p-6 text-white pattern-grid">
              <ShieldCheck className="h-10 w-10 text-gold" />
              <h2 className="mt-5 text-2xl font-black">Next step</h2>
              <p className="mt-3 text-sm leading-7 text-white/74">
                {isPaid
                  ? "Send your registration ID to Know It Africa on WhatsApp so the team can privately confirm your access. The official WhatsApp group link is not shown publicly."
                  : "If you believe payment was completed, contact Know It Africa with your registration ID and payment reference for manual review."}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href={whatsappLink} external>
                  <MessageCircle className="h-4 w-4" /> Confirm on WhatsApp
                </Button>
                <Button href="/" variant="outline">
                  <Home className="h-4 w-4" /> Back to Home
                </Button>
                {!isPaid ? (
                  <Link href="/payment/failed" className="text-center text-sm font-bold text-white/70 underline decoration-gold underline-offset-4">
                    Open payment support page
                  </Link>
                ) : null}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
