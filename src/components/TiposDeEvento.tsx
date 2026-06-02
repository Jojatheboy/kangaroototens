"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Briefcase,
  Trophy,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "./Reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { whatsappUrl } from "@/lib/site";

type Evento = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  quote: string;
  video?: string;
  poster?: string;
  image?: string;
  images?: string[];
};

const eventos: Evento[] = [
  {
    icon: HeartHandshake,
    title: "Sociais",
    subtitle: "Casamentos · Aniversários · Formaturas",
    quote:
      "Casamentos, aniversários, formaturas e aniversários de 15. Cada momento eternizado com a tecnologia e a operação da Kangaroo.",
    video: "/videos/sociais.mp4",
    poster: "/videos/sociais-poster.webp",
  },
  {
    icon: Briefcase,
    title: "Corporativos",
    subtitle: "Lançamentos · Ativações · Feiras",
    quote:
      "Lançamentos, inaugurações, ativações de marca e stands de feira. Marca presente em cada clique, com dados e leads no fim.",
    images: [
      "/images/eventos/corporativos-1.jpg",
      "/images/eventos/corporativos-2.jpg",
      "/images/eventos/corporativos-3.jpg",
    ],
  },
  {
    icon: Trophy,
    title: "Esportivos & Culturais",
    subtitle: "Festivais · Campeonatos · Prêmios",
    quote:
      "Festivais, campeonatos, premiações e eventos de grande porte. Ritmo e energia capturados na velocidade do evento.",
    images: ["/images/eventos/esportivos.jpg", "/images/eventos/esportivos-2.jpg"],
  },
  {
    icon: Sparkles,
    title: "Você personaliza",
    subtitle: "Sua ideia · Sob medida · Do zero",
    quote:
      "Tem uma ideia que não está no catálogo? Você traz o conceito e a gente constrói do zero, sob medida pro seu evento.",
    images: [
      "/images/eventos/personaliza-1.jpg",
      "/images/eventos/personaliza-2.jpg",
      "/images/eventos/personaliza-3.jpg",
      "/images/eventos/personaliza-4.jpg",
    ],
  },
];

const BASE = eventos.length;
// triplicado: o set do meio é o ativo; reposicionamos sem emenda nas pontas
const loop = [...eventos, ...eventos, ...eventos];

/* vídeo do card — loop mudo, sem controles, autoplay só ao entrar na tela */
function CardVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
      onContextMenu={(e) => e.preventDefault()}
      aria-hidden="true"
    />
  );
}

/* slideshow do card — troca sozinho (crossfade), pausa fora da tela */
function CardSlideshow({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    const id = setInterval(() => {
      if (visible.current) setIdx((i) => (i + 1) % images.length);
    }, 2800);
    return () => {
      obs.disconnect();
      clearInterval(id);
    };
  }, [images.length]);

  return (
    <div ref={ref} className="relative min-h-[240px] md:min-h-0 overflow-hidden">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="(min-width: 768px) 480px, 86vw"
          className="object-cover transition-opacity duration-[900ms] ease-out"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === idx ? 16 : 6,
              height: 6,
              background: i === idx ? "var(--c-orange)" : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* lado direito do card: vídeo, slideshow, imagem ou placeholder */
function CardVisual({ ev }: { ev: Evento }) {
  if (ev.images && ev.images.length > 1) {
    return <CardSlideshow images={ev.images} />;
  }
  if (ev.video) {
    return (
      <div className="relative min-h-[240px] md:min-h-0 overflow-hidden">
        <CardVideo src={ev.video} poster={ev.poster} />
      </div>
    );
  }
  if (ev.image) {
    return (
      <div className="relative min-h-[240px] md:min-h-0 overflow-hidden">
        <Image
          src={ev.image}
          alt={ev.title}
          fill
          sizes="(min-width: 768px) 480px, 86vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className="relative min-h-[240px] md:min-h-0 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(80% 75% at 50% 40%, rgba(255,90,42,0.20) 0%, rgba(26,18,8,0.65) 45%, #0a0705 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 0.75px, transparent 0.75px)",
          backgroundSize: "6px 6px",
          opacity: 0.5,
        }}
      />
      <span
        className="relative"
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: 11.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--c-text-mute)",
          border: "1px dashed rgba(255,255,255,0.22)",
          borderRadius: 999,
          padding: "7px 16px",
        }}
      >
        Imagem em breve
      </span>
    </div>
  );
}

export function TiposDeEvento() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(0);
  const [pos, setPos] = useState(BASE); // índice no array triplicado
  const [anim, setAnim] = useState(true);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setVw(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // reativa a transição depois de um reposicionamento sem emenda
  useEffect(() => {
    if (anim) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnim(true))
    );
    return () => cancelAnimationFrame(id);
  }, [anim, pos]);

  const active = ((pos % BASE) + BASE) % BASE;
  const isMobile = vw > 0 && vw < 768;
  const cardW = vw === 0 ? 0 : isMobile ? vw * 0.86 : Math.min(940, vw * 0.78);
  const gap = isMobile ? 16 : 28;
  const tx = vw === 0 ? 0 : vw / 2 - cardW / 2 - pos * (cardW + gap);

  const next = useCallback(() => setPos((p) => p + 1), []);
  const prev = useCallback(() => setPos((p) => p - 1), []);

  const onTransitionEnd = useCallback(() => {
    setPos((p) => {
      if (p < BASE) {
        setAnim(false);
        return p + BASE;
      }
      if (p >= 2 * BASE) {
        setAnim(false);
        return p - BASE;
      }
      return p;
    });
  }, []);

  const goToTab = (i: number) => {
    let delta = i - active;
    if (delta > BASE / 2) delta -= BASE;
    if (delta < -BASE / 2) delta += BASE;
    setPos((p) => p + delta);
  };

  return (
    <section
      id="eventos"
      aria-label="Tipos de evento"
      className="pt-20 sm:pt-28 pb-10 sm:pb-14 overflow-hidden"
    >
      <div className="px-4 sm:px-6" style={{ maxWidth: 1220, margin: "0 auto" }}>
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div style={{ maxWidth: 640 }}>
              <span
                className="inline-flex items-center rounded-full mb-5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
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
              <TextReveal
                as="h2"
                text="Pra qualquer evento, do seu jeito."
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 5vw, 52px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.035em",
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
                  maxWidth: "46ch",
                }}
              >
                Casamento, corporativo, esportivo. Mesmo padrão Kangaroo de
                tecnologia, operação e entrega.
              </p>
            </div>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline whitespace-nowrap transition-colors hover:opacity-80"
              style={{
                color: "var(--c-orange)",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Solicitar orçamento →
            </a>
          </div>
        </Reveal>
      </div>

      {/* carrossel infinito: card central + vizinhos espiando dos dois lados */}
      <div ref={viewportRef} className="relative w-full overflow-hidden mt-12">
        <div
          className="flex"
          onTransitionEnd={onTransitionEnd}
          style={{
            gap,
            transform: `translateX(${tx}px)`,
            transition: anim ? "transform 0.6s cubic-bezier(0.4,0,0.2,1)" : "none",
          }}
        >
          {loop.map((ev, j) => {
            const Icon = ev.icon;
            const isActive = j === pos;
            return (
              <article
                key={`${ev.title}-${j}`}
                onClick={() => setPos(j)}
                className="shrink-0 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 cursor-pointer"
                style={{
                  width: cardW || undefined,
                  height: isMobile ? undefined : "clamp(440px, 56vh, 560px)",
                  background: "var(--c-surface)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  opacity: isActive ? 1 : 0.45,
                  transform: isActive ? "scale(1)" : "scale(0.94)",
                  transformOrigin: "center",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                {/* esquerda: copy */}
                <div className="flex flex-col p-8 md:p-10">
                  <span
                    className="inline-flex items-center justify-center rounded-xl mb-7"
                    style={{
                      width: 52,
                      height: 52,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "var(--c-text-primary)",
                    }}
                  >
                    <Icon size={24} strokeWidth={1.7} />
                  </span>

                  <p
                    className="flex-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "clamp(19px, 1.9vw, 26px)",
                      lineHeight: 1.32,
                      letterSpacing: "-0.02em",
                      color: "var(--c-text-primary)",
                    }}
                  >
                    “{ev.quote}”
                  </p>

                  <div className="flex items-center gap-3 mt-8">
                    <span
                      className="inline-flex items-center justify-center rounded-full shrink-0"
                      style={{
                        width: 44,
                        height: 44,
                        background: "var(--c-orange)",
                        color: "#0F0906",
                      }}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: 16,
                          color: "var(--c-text-primary)",
                        }}
                      >
                        {ev.title}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--c-text-mute)" }}>
                        {ev.subtitle}
                      </div>
                    </div>
                  </div>
                </div>

                {/* direita: vídeo / imagem / placeholder */}
                <CardVisual ev={ev} />
              </article>
            );
          })}
        </div>
      </div>

      {/* controles: abas (nomes) + setas — alinhados ao container */}
      <div
        className="px-4 sm:px-6"
        style={{
          maxWidth: 1220,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 88,
        }}
      >
        <div className="relative flex items-center justify-center">
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {eventos.map((ev, i) => (
              <button
                key={ev.title}
                type="button"
                onClick={() => goToTab(i)}
                className="relative pb-1.5 transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 15,
                  color:
                    i === active ? "var(--c-text-primary)" : "var(--c-text-mute)",
                }}
              >
                {ev.title}
                <span
                  className="absolute left-0 bottom-0 rounded-full transition-all duration-300"
                  style={{
                    height: 2,
                    width: i === active ? "100%" : 0,
                    background: "var(--c-orange)",
                  }}
                />
              </button>
            ))}
          </div>

          <div className="absolute right-0 hidden sm:flex items-center gap-3">
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
    </section>
  );
}
