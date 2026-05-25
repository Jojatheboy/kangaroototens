"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Disc3,
  Disc,
  Frame,
  Gift,
  Mic,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselFeature = {
  id: string;
  label: string;
  icon: LucideIcon;
  image: string;
  description: string;
  accent: string;
  accentFg: string;
  badge: string;
};

/* Defaults: 6 equipamentos da Kangaroo */
const DEFAULT_FEATURES: CarouselFeature[] = [
  {
    id: "totem-fotografico",
    label: "Totem Fotográfico",
    icon: Camera,
    image: "/images/equipamentos/totem-fotografico.webp",
    description:
      "Fotos instantâneas profissionais com câmera HD, moldura personalizada e envio digital na hora.",
    accent: "#4FB4F5",
    accentFg: "#FFFFFF",
    badge: "Foto na hora",
  },
  {
    id: "plataforma-360",
    label: "Plataforma 360°",
    icon: Disc3,
    image: "/images/equipamentos/plataforma-360.webp",
    description:
      "Vídeo dinâmico que gira em torno do convidado, com edição automática pronta pra postar.",
    accent: "#FF5A2A",
    accentFg: "#0F0906",
    badge: "Vídeo viral",
  },
  {
    id: "plataforma-180",
    label: "Plataforma 180°",
    icon: Disc,
    image: "/images/equipamentos/plataforma-180.webp",
    description:
      "Versão mais rápida e elegante da 360. Estética premium e captura imediata pro fluxo do evento.",
    accent: "#4FB4F5",
    accentFg: "#FFFFFF",
    badge: "Premium",
  },
  {
    id: "cabine-fotografica",
    label: "Cabine Fotográfica",
    icon: Frame,
    image: "/images/equipamentos/cabine-fotografica.webp",
    description:
      "Cabine física totalmente customizada com a identidade do evento. Foto impressa exclusiva pra cada convidado.",
    accent: "#FF5A2A",
    accentFg: "#0F0906",
    badge: "Marca presente",
  },
  {
    id: "cabine-premios",
    label: "Cabine de Prêmios",
    icon: Gift,
    image: "/images/equipamentos/cabine-premios.webp",
    description:
      "Convidados entram, interagem e ganham. Gera curiosidade, fila no stand e movimento orgânico.",
    accent: "#F5A623",
    accentFg: "#0F0906",
    badge: "Ativação",
  },
  {
    id: "audio-book",
    label: "Cabine Telefônica · Audio Book",
    icon: Mic,
    image: "/images/equipamentos/audio-book.webp",
    description:
      "Cabine vintage onde convidados gravam mensagens de voz. Registro emocional único, entregue digital.",
    accent: "#FF5A2A",
    accentFg: "#0F0906",
    badge: "Recordação",
  },
];

const AUTO_PLAY_INTERVAL = 3500;
const ITEM_HEIGHT = 62;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel({
  features = DEFAULT_FEATURES,
}: {
  features?: CarouselFeature[];
}) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % features.length) + features.length) % features.length;
  const active = features[currentIndex];

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-2">
      <motion.div
        className="relative overflow-hidden rounded-3xl flex flex-col lg:flex-row min-h-[600px] lg:aspect-[16/8.5]"
        style={{
          border: "1px solid var(--c-line)",
          background: "var(--c-surface)",
        }}
      >
        {/* PAINEL ESQUERDO — chips com cor dinâmica */}
        <motion.div
          className="w-full lg:w-[42%] min-h-[360px] md:min-h-[420px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-12 lg:pl-14"
          animate={{ backgroundColor: active.accent }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* fade nas bordas pra disfarçar o stack de chips */}
          <motion.div
            className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 z-40 pointer-events-none"
            animate={{
              background: `linear-gradient(to bottom, ${active.accent} 0%, ${active.accent}cc 60%, transparent 100%)`,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 z-40 pointer-events-none"
            animate={{
              background: `linear-gradient(to top, ${active.accent} 0%, ${active.accent}cc 60%, transparent 100%)`,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(features.length / 2),
                features.length / 2,
                distance
              );
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.28,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-3 px-5 md:px-7 lg:px-6 py-3 md:py-4 lg:py-3.5 rounded-full transition-colors duration-500 text-left border whitespace-nowrap",
                      isActive
                        ? "bg-white border-white z-10 shadow-lg"
                        : "bg-transparent border-white/25 hover:border-white/55 hover:text-white"
                    )}
                    style={{
                      color: isActive ? active.accent : "rgba(255,255,255,0.65)",
                    }}
                  >
                    <Icon size={18} strokeWidth={2} />
                    <span
                      className="font-semibold text-sm md:text-[15px] tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* PAINEL DIREITO — carousel de imagens */}
        <div
          className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative flex items-center justify-center py-14 md:py-20 lg:py-14 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l"
          style={{
            background: "var(--c-canvas)",
            borderColor: "var(--c-line)",
          }}
        >
          {/* Halftone sutil */}
          <div
            aria-hidden="true"
            className="absolute inset-0 halftone pointer-events-none"
            style={{ opacity: 0.15 }}
          />

          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden"
                  style={{
                    border: "6px solid var(--c-surface)",
                    background: "var(--c-surface)",
                  }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.label}
                    fill
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 380px, 90vw"
                    className={cn(
                      "object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0"
                        : "grayscale blur-[2px] brightness-75"
                    )}
                  />

                  {/* Topo: indicator EM AÇÃO + badge numerado */}
                  <div
                    className={cn(
                      "absolute top-5 left-5 right-5 flex items-start justify-between gap-3 z-10 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: "#FFFFFF",
                          boxShadow: "0 0 10px rgba(255,255,255,0.9)",
                        }}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      />
                      <span
                        className="text-white/85 text-[10px] uppercase tracking-[0.28em]"
                        style={{ fontFamily: "var(--font-geist-mono)" }}
                      >
                        Em ação
                      </span>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] shadow-lg whitespace-nowrap"
                      style={{
                        background: active.accent,
                        color: active.accentFg,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")} · {feature.badge}
                    </div>
                  </div>

                  {/* Bottom: nome grande + descrição menor */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 px-6 md:px-8 pt-24 pb-6 md:pb-8 flex flex-col justify-end pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(15,9,6,0.96) 0%, rgba(15,9,6,0.65) 45%, transparent 100%)",
                        }}
                      >
                        <h3
                          className="text-white leading-[1.05] tracking-tight mb-2"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: "clamp(22px, 2.2vw, 30px)",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {feature.label}
                        </h3>
                        <p
                          className="text-white/75 leading-snug"
                          style={{
                            fontFamily: "var(--font-geist)",
                            fontWeight: 400,
                            fontSize: "clamp(13px, 1.05vw, 14.5px)",
                            maxWidth: "44ch",
                          }}
                        >
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default FeatureCarousel;
