"use client";

import { Reveal } from "./Reveal";
import { ShinyButton } from "@/components/ui/shiny-button";
import { BorderGlow } from "@/components/ui/border-glow";
import { Brackets } from "@/components/ui/brackets";
import { TextReveal } from "@/components/ui/text-reveal";
import { HeartHandshake, Briefcase, Trophy } from "lucide-react";

const WHATSAPP =
  "https://wa.me/5551996752150?text=Olá%20Kangaroo,%20quero%20um%20orçamento%20para%20o%20meu%20evento.";

const tipos = [
  {
    Icon: HeartHandshake,
    title: "Sociais",
    desc: "Casamentos, aniversários, formaturas e aniversários de 15. Cada momento eternizado.",
  },
  {
    Icon: Briefcase,
    title: "Corporativos",
    desc: "Lançamentos, inaugurações, ativações de marca e stands de feira. Marca presente em cada clique.",
  },
  {
    Icon: Trophy,
    title: "Esportivos & Culturais",
    desc: "Festivais, campeonatos, premiações e eventos de grande porte. Ritmo e energia capturados.",
  },
];

export function TiposDeEvento() {
  return (
    <section id="eventos" className="pt-16 sm:pt-24 pb-16 sm:pb-24">
      <div
        className="px-4 sm:px-6"
        style={{
          maxWidth: 1220,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <BorderGlow
            glowColor="14 100 58"
            backgroundColor="#0F0906"
            borderRadius={24}
            glowRadius={48}
            glowIntensity={1.2}
            coneSpread={25}
            edgeSensitivity={28}
            fillOpacity={0.4}
            colors={["#FF5A2A", "#F5A623", "#9A6BE0"]}
          >
            <div
              className="relative overflow-hidden px-4 sm:px-6"
              style={{ paddingTop: 64, paddingBottom: 64, borderRadius: 24 }}
            >
              <Brackets size={22} thickness={1} offset={20} />
              {/* Degrade laranja nas bordas superior + inferior, centro escuro */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255, 90, 42, 0.28) 0%, transparent 32%, transparent 68%, rgba(255, 90, 42, 0.28) 100%)",
                  borderRadius: 28,
                }}
              />
              <div className="relative z-10">
                {/* Pill "Eventos" */}
            <div className="flex justify-center">
              <span
                className="inline-flex items-center rounded-full"
                style={{
                  background: "var(--c-canvas)",
                  border: "1px solid var(--c-line-strong)",
                  padding: "5px 14px",
                  fontSize: 12,
                  color: "var(--c-text-secondary)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                Eventos
              </span>
            </div>

            {/* Headline + sub */}
            <div className="text-center mx-auto mt-7" style={{ maxWidth: 720 }}>
              <TextReveal
                as="h2"
                text="Pra qualquer evento."
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 5.5vw, 56px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                  color: "var(--c-text-primary)",
                  marginBottom: 16,
                  display: "block",
                }}
              />
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "var(--c-text-secondary)",
                  maxWidth: "48ch",
                  margin: "0 auto",
                }}
              >
                Casamento, corporativo, esportivo. Mesmo padrão Kangaroo de
                tecnologia, operação e entrega.
              </p>
            </div>

            {/* Grid de tipos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 mt-16 sm:mt-20 max-w-5xl mx-auto">
              {tipos.map((tipo, i) => {
                const Icon = tipo.Icon;
                return (
                  <Reveal key={tipo.title} delay={i * 0.08}>
                    <div className="flex flex-col items-center text-center px-2">
                      {/* Icon container com glow */}
                      <div
                        className="relative inline-flex items-center justify-center mb-7"
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 20,
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          color: "var(--c-text-primary)",
                        }}
                      >
                        <Icon size={32} strokeWidth={1.6} />
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: 22,
                          letterSpacing: "-0.02em",
                          color: "var(--c-text-primary)",
                          marginBottom: 12,
                          lineHeight: 1.1,
                        }}
                      >
                        {tipo.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 14.5,
                          lineHeight: 1.7,
                          color: "var(--c-text-secondary)",
                          maxWidth: "28ch",
                        }}
                      >
                        {tipo.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

                {/* CTA centralizado embaixo */}
                <Reveal delay={0.3}>
                  <div className="flex justify-center mt-14 sm:mt-20">
                    <ShinyButton
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                    >
                      Solicitar orçamento
                    </ShinyButton>
                  </div>
                </Reveal>
              </div>
            </div>
          </BorderGlow>
        </Reveal>
      </div>
    </section>
  );
}
