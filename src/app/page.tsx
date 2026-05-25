import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LogoBar } from "@/components/LogoBar";
import { Equipamentos } from "@/components/Equipamentos";
import { Diferenciais } from "@/components/Diferenciais";
import { ComoFunciona } from "@/components/ComoFunciona";
import { Depoimentos } from "@/components/Depoimentos";
import { TiposDeEvento } from "@/components/TiposDeEvento";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <LogoBar />
        <Equipamentos />
        <Diferenciais />
        <ComoFunciona />
        <Depoimentos />
        <TiposDeEvento />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
