"use client";

import { Reveal } from "./Reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { Zap, Sparkles, Users, BarChart3 } from "lucide-react";

const items: BentoItem[] = [
  {
    title: "Engajamento real",
    meta: "fila no stand",
    description:
      "Cada totem é desenhado pra criar fila, fazer o público parar, interagir e compartilhar. O efeito não termina quando a foto sai da impressora.",
    icon: <Zap className="w-4 h-4" />,
    accent: "var(--c-orange)",
    status: "Em todo evento",
    tags: ["Interação", "Conexão"],
    colSpan: 2,
  },
  {
    title: "Personalização total",
    meta: "moldura exclusiva",
    description:
      "Moldura exclusiva, identidade visual aplicada na cabine, vídeo com a sua trilha.",
    icon: <Sparkles className="w-4 h-4" />,
    accent: "var(--c-orange)",
    tags: ["Branding"],
  },
  {
    title: "Equipe especializada",
    meta: "montagem inclusa",
    description:
      "Chegamos antes, montamos com cuidado, operamos com sorriso e desmontamos sem você perceber. Suporte completo do briefing à última foto.",
    icon: <Users className="w-4 h-4" />,
    accent: "var(--c-orange)",
    status: "Padrão",
    tags: ["Operação", "Suporte"],
    colSpan: 2,
  },
  {
    title: "Dados e insights",
    meta: "relatório pós-evento",
    description:
      "Métricas de engajamento, lista de leads e relatório completo após cada evento.",
    icon: <BarChart3 className="w-4 h-4" />,
    accent: "var(--c-orange)",
    tags: ["Métricas", "Leads"],
  },
];

export function Diferenciais() {
  return (
    <section
      id="diferenciais"
      className="pt-16 sm:pt-24 pb-16 sm:pb-24"
      style={{ background: "var(--c-canvas)" }}
    >
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
              Por que Kangaroo
            </p>
            <TextReveal
              as="h2"
              text="Quatro coisas que mudam quando a Kangaroo está no seu evento."
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
              Engajamento, personalização, operação e dados. Não é só foto.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <BentoGrid items={items} />
        </Reveal>
      </div>
    </section>
  );
}
