"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  TestimonialsColumn,
  type TestimonialItem,
} from "@/components/ui/testimonials-columns-1";

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
  return (
    <section id="depoimentos" className="pt-16 sm:pt-24 pb-16 sm:pb-24 relative">
      <div className="px-4 sm:px-6" style={{ maxWidth: 1220, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center mx-auto"
          style={{ maxWidth: 720 }}
        >
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
            Depoimentos
          </p>

          <TextReveal
            as="h2"
            text="Quem usou, recomenda."
            className="text-center"
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
            className="text-center"
            style={{
              fontSize: 16,
              lineHeight: 1.55,
              color: "var(--c-text-secondary)",
              maxWidth: "48ch",
            }}
          >
            Casais, marcas e produtores que confiaram na Kangaroo pra
            transformar seus eventos.
          </p>
        </motion.div>

        <div
          className="flex justify-center gap-6 mt-14"
          style={{
            maxHeight: 720,
            overflow: "hidden",
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          }}
        >
          <TestimonialsColumn testimonials={col1} duration={20} />
          <TestimonialsColumn
            testimonials={col2}
            className="hidden md:block"
            duration={26}
          />
          <TestimonialsColumn
            testimonials={col3}
            className="hidden lg:block"
            duration={22}
          />
        </div>
      </div>
    </section>
  );
}
