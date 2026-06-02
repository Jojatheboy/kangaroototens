"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  TestimonialsColumn,
  type TestimonialItem,
} from "@/components/ui/testimonials-columns-1";
import { eyebrowStyle, sectionTitleStyle } from "@/lib/section-styles";

// tema claro aplicado quando a seção entra na tela (sobrescreve os tokens)
const lightVars: CSSProperties = {
  ["--c-canvas" as string]: "#FBF8F3",
  ["--c-surface" as string]: "#FFFFFF",
  ["--c-line" as string]: "rgba(0,0,0,0.08)",
  ["--c-line-strong" as string]: "rgba(0,0,0,0.16)",
  ["--c-text-primary" as string]: "#1A120B",
  ["--c-text-secondary" as string]: "#5A5048",
  ["--c-text-mute" as string]: "#9A9088",
};

const testimonials: TestimonialItem[] = [
  {
    text: "A cabine de áudio book bombou no nosso casamento. Recebemos mais de 80 mensagens dos convidados. É a lembrança que mais carregamos.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Mariana Costa",
    role: "Casamento · Porto Alegre",
  },
  {
    text: "Levamos o totem pro stand da Record no South Summit. Foi o stand mais visitado do evento, fila do começo ao fim. Equipe nota 10.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Ricardo Mendes",
    role: "Marketing · Record Guaíba",
  },
  {
    text: "A plataforma 360 captou o público dançando no festival. Os vídeos com a moldura circularam nas redes a semana inteira. Alcance gigante.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Fernanda Ribeiro",
    role: "Produção · Planeta Atlântida",
  },
  {
    text: "Totem fotográfico foi o ponto alto da nossa festa. Todo mundo passou ali e até hoje meus amigos mostram a foto com a moldura personalizada.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    name: "Pedro Lima",
    role: "Casamento · Canoas",
  },
  {
    text: "Personalizaram a cabine na inauguração da loja H&M no Iguatemi. Cada visitante saiu com a foto física e a marca presente. Parceria de verdade.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Juliana Schmitt",
    role: "Coord. Eventos · H&M",
  },
  {
    text: "Totem fotográfico funcionou perfeito no estádio do Inter, mesmo com 5 mil pessoas circulando. Operação impecável, zero pausa.",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    name: "Lucas Bertoldo",
    role: "Coord. Eventos Esportivos",
  },
  {
    text: "Os 15 anos da minha filha viraram virais. A plataforma 360 deixou todo mundo encantado e os vídeos rodaram no Instagram da noite.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Camila Tavares",
    role: "Festa de 15 anos · Gravataí",
  },
  {
    text: "Ativação com a cabine de prêmios viralizou. Gerou tráfego no stand e métricas de engajamento que cumpriram as metas em 2 dias.",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    name: "Bruno Almeida",
    role: "Gerente Marketing · Bauducco",
  },
  {
    text: "Trabalhei com várias empresas de totem. A Kangaroo é a única que entrega relatório pós-evento de verdade. Mudou meu jogo como wedding planner.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    name: "Patrícia Vasconcellos",
    role: "Wedding Planner",
  },
];

const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(3, 6);
const col3 = testimonials.slice(6, 9);

export function Depoimentos() {
  const ref = useRef<HTMLElement>(null);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setLight(e.isIntersecting),
      { rootMargin: "-25% 0px -25% 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="depoimentos"
      aria-label="Depoimentos de clientes"
      className="pt-10 sm:pt-14 pb-10 sm:pb-14 relative"
      style={{
        background: "var(--c-canvas)",
        transition: "background-color 0.7s ease",
        ...(light ? lightVars : {}),
      }}
    >
      {/* divisor curvo no topo — acompanha o tema da seção */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="absolute left-0 w-full pointer-events-none z-10"
        style={{ top: -55, height: 56 }}
      >
        <path
          d="M0,56 L0,34 C420,4 1020,4 1440,34 L1440,56 Z"
          style={{ fill: "var(--c-canvas)", transition: "fill 0.7s ease" }}
        />
      </svg>

      {/* divisor curvo na base */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="absolute left-0 w-full pointer-events-none z-10"
        style={{ bottom: -55, height: 56, transform: "rotate(180deg)" }}
      >
        <path
          d="M0,56 L0,34 C420,4 1020,4 1440,34 L1440,56 Z"
          style={{ fill: "var(--c-canvas)", transition: "fill 0.7s ease" }}
        />
      </svg>

      <div className="px-4 sm:px-6" style={{ maxWidth: 1220, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center mx-auto"
          style={{ maxWidth: 720 }}
        >
          {/* eyebrow/título compartilhados; o transition acompanha a virada
              de tema (escuro → claro) quando a seção entra na viewport */}
          <p style={{ ...eyebrowStyle, transition: "color 0.7s ease" }}>
            Depoimentos
          </p>

          <TextReveal
            as="h2"
            text="Quem escolheu, recomenda."
            className="text-center"
            style={{ ...sectionTitleStyle, transition: "color 0.7s ease" }}
          />
          <p
            className="text-center"
            style={{
              fontSize: 16,
              lineHeight: 1.55,
              color: "var(--c-text-secondary)",
              maxWidth: "48ch",
              transition: "color 0.7s ease",
            }}
          >
            Casais, marcas e produtores que confiaram na Kangaroo pra
            transformar seus eventos.
          </p>
        </motion.div>

        <div
          className="flex gap-6 mt-14"
          style={{
            maxHeight: 720,
            overflow: "hidden",
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          }}
        >
          <TestimonialsColumn testimonials={col1} duration={20} className="flex-1" />
          <TestimonialsColumn
            testimonials={col2}
            className="flex-1 hidden md:block"
            duration={26}
          />
          <TestimonialsColumn
            testimonials={col3}
            className="flex-1 hidden lg:block"
            duration={22}
          />
        </div>
      </div>
    </section>
  );
}
