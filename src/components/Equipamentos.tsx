"use client";

import { Reveal } from "./Reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { FeatureCarousel } from "@/components/ui/feature-carousel";

export function Equipamentos() {
  return (
    <section id="equipamentos" className="pt-16 sm:pt-24 pb-16 sm:pb-24 relative">
      <div className="px-4 sm:px-6" style={{ maxWidth: 1220, margin: "0 auto" }}>
        <Reveal>
          <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--c-text-mute)",
                marginBottom: 14,
              }}
            >
              Equipamentos
            </p>
            <TextReveal
              as="h2"
              text="Seis formas de transformar seu evento."
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px, 4.2vw, 44px)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "var(--c-text-primary)",
                marginBottom: 14,
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
                marginBottom: 56,
              }}
            >
              Escolha um ou combine quantos quiser. Cada equipamento entrega
              uma sensação diferente. Juntos, viram experiência inesquecível.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <FeatureCarousel />
        </Reveal>
      </div>
    </section>
  );
}
