"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-light-bg px-4 py-16">
      <section className="max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-luxury">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-4xl font-black text-royal">Something went wrong</h1>
        <p className="mt-4 text-sm font-semibold leading-7 text-muted-text">
          We could not load this page. Please try again, or contact Know It Africa if the issue continues.
        </p>
        {error.digest ? <p className="mt-3 text-xs font-bold text-muted-text">Error reference: {error.digest}</p> : null}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-royal shadow-gold">
            <RefreshCcw className="h-4 w-4" /> Try again
          </button>
          <Button href="/" variant="navy">Back Home</Button>
        </div>
      </section>
    </main>
  );
}
