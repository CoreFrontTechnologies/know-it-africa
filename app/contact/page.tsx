import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export const metadata = {
  title: "Contact | Know It Africa",
  description: "Contact Know It Africa for event registration, partnerships, sponsorship, payment confirmation, and support.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-light-bg">
        <section className="pattern-grid bg-royal px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Official Contact Channels</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl">Reach Know It Africa directly.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">Speak with us about event registration, school programs, partnerships, sponsorship, payment confirmation, or general support.</p>
          </div>
        </section>
        <Contact compact />
      </main>
      <Footer />
    </>
  );
}
