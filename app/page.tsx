import { About } from "@/components/site/About";
import { Audience } from "@/components/site/Audience";
import { Bootcamp } from "@/components/site/Bootcamp";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Partnerships } from "@/components/site/Partnerships";
import { PastEvents } from "@/components/site/PastEvents";
import { Programs } from "@/components/site/Programs";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Programs />
        <Bootcamp />
        <Audience />
        <PastEvents />
        <Partnerships />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
