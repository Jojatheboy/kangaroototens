"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

/**
 * Carrossel de produtos estilo Apple: cards dark com a imagem grande do
 * equipamento, fade no rodapé e a copy + botão por cima. Loop infinito
 * (lista triplicada + reposição sem emenda). Setas + paginação.
 * Copy mantida exatamente como estava no FeatureCarousel.
 */

type Produto = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  accent: string;
};

const produtos: Produto[] = [
  {
    id: "totem-fotografico",
    eyebrow: "Foto na hora",
    title: "Totem Fotográfico",
    description:
      "Fotos instantâneas profissionais com câmera HD, moldura personalizada e envio digital na hora.",
    image: "/images/equipamentos/totem-fotografico.webp",
    accent: "#4FB4F5",
  },
  {
    id: "totem-slim",
    eyebrow: "Discreto",
    title: "Totem Slim",
    description:
      "A versão slim do totem. Fotos ilimitadas, impressa ou por QR code e moldura do evento, num formato leve e discreto.",
    image: "/images/equipamentos/totem-slim-v2.webp",
    accent: "#4FB4F5",
  },
  {
    id: "plataforma-360",
    eyebrow: "Vídeo viral",
    title: "Plataforma 360°",
    description:
      "Vídeo dinâmico que gira em torno do convidado, com edição automática pronta pra postar.",
    image: "/images/equipamentos/plataforma-360.webp",
    accent: "#FF5A2A",
  },
  {
    id: "plataforma-180",
    eyebrow: "Premium",
    title: "Plataforma 180°",
    description:
      "Versão mais rápida e elegante da 360. Estética premium e captura imediata pro fluxo do evento.",
    image: "/images/equipamentos/plataforma-180.webp",
    accent: "#4FB4F5",
  },
  {
    id: "cabine-premios",
    eyebrow: "Ativação",
    title: "Cabine de Prêmios",
    description:
      "Convidados entram, interagem e ganham. Gera curiosidade, fila no stand e movimento orgânico.",
    image: "/images/equipamentos/cabine-premios.webp",
    accent: "#F5A623",
  },
  {
    id: "cabine-premios-pocket",
    eyebrow: "Compacta",
    title: "Cabine de Prêmios Pocket",
    description:
      "A diversão da Cabine de Prêmios num formato compacto. O público entra, interage e sai com o prêmio. Mesmo efeito, menos espaço.",
    image: "/images/equipamentos/cabine-premios-pocket-v2.webp",
    accent: "#F5A623",
  },
  {
    id: "totem-carregamento",
    eyebrow: "Energia",
    title: "Totem de Carregamento",
    description:
      "Estação vertical que recarrega vários celulares ao mesmo tempo. Mantém o público no stand, conectado e por perto.",
    image: "/images/equipamentos/totem-carregamento-v2.webp",
    accent: "#4FB4F5",
  },
  {
    id: "audio-book",
    eyebrow: "Recordação",
    title: "Cabine Telefônica · Audio Book",
    description:
      "Cabine vintage onde convidados gravam mensagens de voz. Registro emocional único, entregue digital.",
    image: "/images/equipamentos/audio-book.webp",
    accent: "#FF5A2A",
  },
];

const BASE = produtos.length;
// triplicado: o set do meio é o "ativo"; pulamos pra ele quando chega nas pontas
const items = [...produtos, ...produtos, ...produtos];

const waLink = (title: string) =>
  whatsappUrl(`Olá Kangaroo, tenho interesse no ${title} para o meu evento.`);

export function EquipamentosCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState(0);

  // índice (no array triplicado) do card alinhado à borda esquerda
  const currentChildIndex = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return BASE;
    const cards = Array.from(el.children) as HTMLElement[];
    const pad = cards[0] ? cards[0].offsetLeft : 0; // padding-left dinâmico
    const target = el.scrollLeft;
    let idx = 0;
    let best = Infinity;
    cards.forEach((c, i) => {
      const x = c.offsetLeft - pad;
      const d = Math.abs(x - target);
      if (d < best) {
        best = d;
        idx = i;
      }
    });
    return idx;
  }, []);

  const scrollToChild = useCallback((i: number, smooth: boolean) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    const first = el.children[0] as HTMLElement | undefined;
    if (card && first) {
      el.scrollTo({
        left: card.offsetLeft - first.offsetLeft,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  }, []);

  // começa no set do meio
  useEffect(() => {
    scrollToChild(BASE, false);
    setActive(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // quando o scroll para, reposiciona sem emenda se chegou numa ponta
  const handleSettle = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const i = currentChildIndex();
    if (i < BASE) scrollToChild(i + BASE, false);
    else if (i >= 2 * BASE) scrollToChild(i - BASE, false);
  }, [currentChildIndex, scrollToChild]);

  const onScroll = useCallback(() => {
    setActive(currentChildIndex() % BASE);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(handleSettle, 130);
  }, [currentChildIndex, handleSettle]);

  const prev = () => scrollToChild(currentChildIndex() - 1, true);
  const next = () => scrollToChild(currentChildIndex() + 1, true);
  const goToDot = (dot: number) => {
    const base = currentChildIndex() - (currentChildIndex() % BASE);
    scrollToChild(base + dot, true);
  };

  return (
    <div>
      {/* trilho full-bleed: alinhado à esquerda com o conteúdo, cards vazam à direita */}
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: "max(1.5rem, calc((100vw - 1180px) / 2))",
          paddingRight: "1.5rem",
          scrollPaddingLeft: "max(1.5rem, calc((100vw - 1180px) / 2))",
        }}
      >
        {items.map((p, i) => (
          <article
            key={`${p.id}-${i}`}
            className="snap-start shrink-0 relative overflow-hidden rounded-3xl"
            style={{
              width: "min(80vw, 360px)",
              aspectRatio: "3 / 4",
              background: "var(--c-surface)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="(min-width: 640px) 360px, 80vw"
              className="object-cover"
            />

            {/* fade no rodapé pra abrir espaço pra copy */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, #0B0805 6%, rgba(11,8,5,0.94) 30%, rgba(11,8,5,0.6) 52%, rgba(11,8,5,0) 74%)",
              }}
            />

            {/* copy + botão */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
              <p
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: p.accent,
                  marginBottom: 10,
                }}
              >
                {p.eyebrow}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 22,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--c-text-primary)",
                  marginBottom: 10,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--c-text-secondary)",
                  marginBottom: 18,
                }}
              >
                {p.description}
              </p>

              <a
                href={waLink(p.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full no-underline transition-colors hover:bg-white/10"
                style={{
                  padding: "9px 16px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  color: "var(--c-text-primary)",
                  fontFamily: "var(--font-geist)",
                  fontWeight: 600,
                  fontSize: 13.5,
                }}
              >
                Solicitar orçamento
                <ArrowRight className="size-4" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* controles: paginação + setas (alinhados ao trilho) */}
      <div
        className="flex items-center justify-between mt-7"
        style={{
          paddingLeft: "max(1.5rem, calc((100vw - 1180px) / 2))",
          paddingRight: "max(1.5rem, calc((100vw - 1180px) / 2))",
        }}
      >
        <div className="flex items-center gap-2">
          {produtos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Ir para ${p.title}`}
              onClick={() => goToDot(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 26 : 8,
                height: 8,
                background:
                  i === active ? "var(--c-orange)" : "rgba(255,255,255,0.16)",
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Anterior"
            onClick={prev}
            className="inline-flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
            style={{
              width: 44,
              height: 44,
              border: "1px solid rgba(255,255,255,0.16)",
              color: "var(--c-text-primary)",
            }}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Próximo"
            onClick={next}
            className="inline-flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
            style={{
              width: 44,
              height: 44,
              border: "1px solid rgba(255,255,255,0.16)",
              color: "var(--c-text-primary)",
            }}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
