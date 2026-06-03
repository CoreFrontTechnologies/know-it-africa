import { AlertTriangle, Home, MessageCircle, RotateCcw } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";
import { retryRegistrationPayment } from "@/app/payment/actions";
import { verifyRegistrationPayment } from "@/lib/payments/verification";

type PaymentFailedPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function normalize(value?: string | string[]) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function supportLink(registrationId?: string) {
  const message = `Hello Know It Africa, I need help with my AI & Software Development Bootcamp payment.\n\nRegistration ID: ${registrationId ?? "Not available"}\n\nPlease help me confirm or retry my payment.`;

  return `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Payment Not Completed | Know It Africa",
  description: "Get help if your Know It Africa bootcamp payment was not completed.",
};

export default async function PaymentFailedPage({ searchParams }: PaymentFailedPageProps) {
  const params = (await searchParams) ?? {};
  const result = await verifyRegistrationPayment({
    registrationId: normalize(params.registration_id),
    txRef: normalize(params.tx_ref),
    gatewayStatus: normalize(params.status) ?? "failed",
  });
  const registrationId = result.registration?.registration_id ?? result.registrationId ?? normalize(params.registration_id);

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-light-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-luxury">
          <div className="pattern-grid bg-slate-950 px-6 py-12 text-center text-white sm:px-10">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/10 backdrop-blur">
              <AlertTriangle className="h-11 w-11 text-gold" />
            </div>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-gold">Payment Support</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Payment Not Completed</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/76">
              Your registration may have been saved, but payment was not completed or could not be verified. You can try again or contact Know It Africa for support.
            </p>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="rounded-[1.5rem] border border-red-100 bg-red-50 p-5 text-sm font-semibold leading-7 text-red-700">
              {result.message}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-soft-blue p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-blue">Registration ID</p>
                <p className="mt-2 break-all text-xl font-black text-royal">{registrationId ?? "Not available"}</p>
              </div>
              <div className="rounded-2xl bg-soft-blue p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-blue">Payment Status</p>
                <p className="mt-2 text-xl font-black capitalize text-royal">{result.state}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {registrationId ? (
                <form action={retryRegistrationPayment}>
                  <input type="hidden" name="registrationId" value={registrationId} />
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-royal shadow-gold transition hover:-translate-y-0.5 sm:w-auto">
                    <RotateCcw className="h-4 w-4" /> Try Payment Again
                  </button>
                </form>
              ) : (
                <Button href="/registration" showArrow>
                  <RotateCcw className="h-4 w-4" /> Start Registration Again
                </Button>
              )}
              <Button href={supportLink(registrationId)} variant="navy" external>
                <MessageCircle className="h-4 w-4" /> Contact Support on WhatsApp
              </Button>
              <Button href="/" variant="ghost">
                <Home className="h-4 w-4" /> Back Home
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
