"use client";

import { Reveal } from "./Reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  eyebrowStyle,
  sectionLeadStyle,
  sectionTitleStyle,
} from "@/lib/section-styles";
import { EquipamentosCarousel } from "./EquipamentosCarousel";

export function Equipamentos() {
  return (
    <section
      id="equipamentos"
      aria-label="Equipamentos"
      className="pt-10 sm:pt-14 pb-10 sm:pb-14 relative overflow-hidden"
    >
      <div className="px-4 sm:px-6" style={{ maxWidth: 1220, margin: "0 auto" }}>
        <Reveal>
          <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
            <p style={eyebrowStyle}>Equipamentos</p>
            <TextReveal
              as="h2"
              text="Oito formas de transformar seu evento."
              style={sectionTitleStyle}
            />
            <p style={{ ...sectionLeadStyle, marginBottom: 56 }}>
              Escolha um ou combine quantos quiser. Cada equipamento entrega
              uma sensação diferente. Juntos, viram experiência inesquecível.
            </p>
          </div>
        </Reveal>
      </div>

      {/* carrossel full-bleed (cards sangram pela direita, sem corte) */}
      <Reveal delay={0.1}>
        <EquipamentosCarousel />
      </Reveal>
    </section>
  );
}
