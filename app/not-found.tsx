import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-light-bg px-4 py-16">
      <section className="max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-luxury">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
          <SearchX className="h-8 w-8" />
        </div>
        <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-primary-blue">404</p>
        <h1 className="mt-3 text-4xl font-black text-royal">Page not found</h1>
        <p className="mt-4 text-sm font-semibold leading-7 text-muted-text">The page you are looking for does not exist or may have moved.</p>
        <Button href="/" className="mt-7">Back to Home</Button>
      </section>
    </main>
  );
}
