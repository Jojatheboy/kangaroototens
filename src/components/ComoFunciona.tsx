"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  eyebrowStyle,
  sectionLeadStyle,
  sectionTitleStyle,
} from "@/lib/section-styles";
import {
  AnimatedList,
  type AnimatedListItem,
} from "@/components/ui/animated-list";
import { Folder } from "@/components/ui/folder";
import { RadialBackdrop } from "@/components/ui/radial-backdrop";
import {
  Camera,
  Disc3,
  Disc,
  Gift,
  Frame,
  Mic,
  Check,
  Heart,
  PartyPopper,
  Building2,
  Sparkles,
  Share2,
} from "lucide-react";

/* ============ MINI MOCKUPS ============ */

const CONVERSA: { side: "user" | "kang"; text: string }[] = [
  { side: "user", text: "Oi! Casamento dia 12/07, 150 pessoas 🎉" },
  { side: "kang", text: "Perfeito! Pensei em totem + 360°" },
  { side: "user", text: "Pode mandar a proposta 🙌" },
];

function MockConversa() {
  // o chat se "digita" sozinho, em loop
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c >= CONVERSA.length ? 0 : c + 1));
    }, 1300);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col gap-2.5 px-6 pr-20 pt-24 pb-6 justify-end">
      <AnimatePresence mode="popLayout">
        {CONVERSA.slice(0, count).map((b, i) => (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 0, y: 14, scale: 0.9, x: b.side === "user" ? 22 : -22 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 460, damping: 26, mass: 0.7 }}
            className={
              b.side === "user"
                ? "self-end max-w-[78%] rounded-2xl rounded-tr-md px-4 py-2.5"
                : "self-start max-w-[80%] rounded-2xl rounded-tl-md px-4 py-2.5"
            }
            style={
              b.side === "user"
                ? {
                    background: "#25D366",
                    color: "#0F1A0F",
                    fontFamily: "var(--font-geist)",
                    fontSize: 14.5,
                    lineHeight: 1.4,
                    boxShadow: "0 4px 12px -6px rgba(37, 211, 102, 0.4)",
                  }
                : {
                    background: "var(--c-surface-2)",
                    border: "1px solid var(--c-line)",
                    color: "var(--c-text-primary)",
                    fontFamily: "var(--font-geist)",
                    fontSize: 14.5,
                    lineHeight: 1.4,
                  }
            }
          >
            {b.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Typing indicator — enquanto ainda "faltam" mensagens */}
      {count < CONVERSA.length && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="self-start inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full"
          style={{
            background: "var(--c-surface-2)",
            border: "1px solid var(--c-line)",
            width: "fit-content",
          }}
        >
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              className="block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--c-orange)" }}
              animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: d * 0.15,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

function MockCuradoria() {
  const equipamentos: {
    Icon: typeof Camera;
    label: string;
    accent: string;
    selected: boolean;
  }[] = [
    { Icon: Camera, label: "Totem Fotográfico", accent: "var(--c-blue)", selected: true },
    { Icon: Disc3, label: "Plataforma 360°", accent: "var(--c-orange)", selected: true },
    { Icon: Disc, label: "Plataforma 180°", accent: "var(--c-blue)", selected: false },
    { Icon: Frame, label: "Cabine Fotográfica", accent: "var(--c-orange)", selected: false },
    { Icon: Gift, label: "Cabine de Prêmios", accent: "var(--c-yellow)", selected: true },
    { Icon: Mic, label: "Audio Book", accent: "var(--c-orange)", selected: false },
  ];

  const items: AnimatedListItem[] = equipamentos.map((eq, i) => {
    const Icon = eq.Icon;
    return {
      id: String(i),
      selected: eq.selected,
      content: (
        <div className="flex items-center gap-3.5">
          <span
            className="inline-flex items-center justify-center rounded-lg shrink-0"
            style={{
              width: 34,
              height: 34,
              background: "var(--c-canvas)",
              border: `1px solid ${eq.accent}33`,
              color: eq.accent,
            }}
          >
            <Icon size={18} strokeWidth={2} />
          </span>
          <span
            className="flex-1 truncate"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 15,
              color: eq.selected
                ? "var(--c-text-primary)"
                : "var(--c-text-secondary)",
            }}
          >
            {eq.label}
          </span>
          {eq.selected ? (
            <span
              className="inline-flex items-center justify-center rounded-full shrink-0"
              style={{
                width: 22,
                height: 22,
                background: "var(--c-orange)",
                color: "var(--c-ink)",
              }}
            >
              <Check size={13} strokeWidth={3} />
            </span>
          ) : (
            <span
              className="inline-block rounded-full shrink-0"
              style={{
                width: 22,
                height: 22,
                border: "1px solid var(--c-line-strong)",
              }}
            />
          )}
        </div>
      ),
    };
  });

  return (
    <div className="absolute inset-0 px-5 sm:px-6 pt-5 pb-2">
      <AnimatedList
        items={items}
        showGradients={true}
        maxHeight="100%"
      />
    </div>
  );
}

function MockPersonalizacao() {
  const [activeIndex, setActiveIndex] = useState(0);

  const eventos = [
    {
      icon: Heart,
      title: "Festa do Lucas",
      subtitle: "Casamento · 2026",
      accent: "var(--c-orange)",
    },
    {
      icon: PartyPopper,
      title: "Aniversário da Mari",
      subtitle: "15 anos · 2026",
      accent: "var(--c-yellow)",
    },
    {
      icon: Building2,
      title: "Lançamento H&M",
      subtitle: "Inauguração · Iguatemi",
      accent: "var(--c-blue)",
    },
  ];

  // Card extra (só desktop) — completa o leque sem estourar a altura do card
  const extraEventos = [
    {
      icon: Building2,
      title: "Confraternização TechCorp",
      subtitle: "Fim de ano · 2025",
      accent: "var(--c-blue)",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % eventos.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [eventos.length]);

  return (
    <div className="flex flex-col items-center w-full max-w-[380px] gap-0">
      {/* Pill "Kangaroo" no topo */}
      <div
        className="inline-flex items-center gap-2 rounded-lg"
        style={{
          background: "rgba(255, 90, 42, 0.1)",
          border: "1px solid rgba(255, 90, 42, 0.32)",
          padding: "6px 12px",
        }}
      >
        <div
          className="w-3.5 h-3.5 rounded-sm flex items-center justify-center"
          style={{ background: "var(--c-orange)" }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            style={{ stroke: "var(--c-ink)" }}
            strokeWidth="3"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 13,
            color: "var(--c-orange)",
            letterSpacing: "-0.01em",
          }}
        >
          Kangaroo
        </span>
      </div>

      {/* Linha tracejada conectando */}
      <div
        aria-hidden="true"
        style={{
          width: 1,
          height: 28,
          background:
            "repeating-linear-gradient(to bottom, rgba(255, 90, 42, 0.45) 0 4px, transparent 4px 8px)",
        }}
      />

      {/* Stack de cards (rotativo) — só no mobile */}
      <div className="relative w-full md:hidden" style={{ height: 120 }}>
        {eventos.map((ev, i) => {
          const offset = (i - activeIndex + eventos.length) % eventos.length;
          const Icon = ev.icon;
          return (
            <motion.div
              key={i}
              animate={{
                y: offset * 12,
                scale: 1 - offset * 0.04,
                opacity: offset === 0 ? 1 : offset === 1 ? 0.7 : 0.4,
                zIndex: eventos.length - offset,
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute left-0 right-0 flex items-center gap-3 px-4 py-3.5 rounded-xl"
              style={{
                background: "var(--c-surface)",
                border: "1px solid var(--c-line)",
                boxShadow: offset === 0 ? "0 8px 24px -10px rgba(0,0,0,0.5)" : "none",
              }}
            >
              <div
                className="inline-flex items-center justify-center rounded-lg shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--c-surface-2)",
                  border: `1px solid ${ev.accent}33`,
                  color: ev.accent,
                }}
              >
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="truncate"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--c-text-primary)",
                    letterSpacing: "-0.01em",
                    marginBottom: 2,
                  }}
                >
                  {ev.title}
                </p>
                <p
                  className="truncate"
                  style={{
                    fontFamily: "var(--font-geist)",
                    fontSize: 12,
                    color: "var(--c-text-mute)",
                  }}
                >
                  {ev.subtitle}
                </p>
              </div>
              <div
                className="inline-flex items-center gap-1 shrink-0"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  color: "var(--c-text-mute)",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="var(--c-orange)"
                >
                  <path d="M13 2L4 14h7v8l9-12h-7z" />
                </svg>
                {i + 1}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop: leque completo abrindo em cascata (todos os eventos) */}
      <div className="hidden md:flex flex-col w-full gap-2">
        {[...eventos, ...extraEventos].map((ev, i) => {
          const Icon = ev.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              whileInView={{
                opacity: i === 0 ? 1 : Math.max(0.4, 0.84 - i * 0.12),
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
              style={{
                background: "var(--c-surface)",
                border: "1px solid var(--c-line)",
                boxShadow: i === 0 ? "0 8px 24px -10px rgba(0,0,0,0.5)" : "none",
              }}
            >
              <div
                className="inline-flex items-center justify-center rounded-lg shrink-0"
                style={{
                  width: 32,
                  height: 32,
                  background: "var(--c-surface-2)",
                  border: `1px solid ${ev.accent}33`,
                  color: ev.accent,
                }}
              >
                <Icon size={16} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="truncate"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 13.5,
                    color: "var(--c-text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {ev.title}
                </p>
                <p
                  className="truncate"
                  style={{
                    fontFamily: "var(--font-geist)",
                    fontSize: 11.5,
                    color: "var(--c-text-mute)",
                  }}
                >
                  {ev.subtitle}
                </p>
              </div>
              <div
                className="inline-flex items-center gap-1 shrink-0"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  color: "var(--c-text-mute)",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--c-orange)">
                  <path d="M13 2L4 14h7v8l9-12h-7z" />
                </svg>
                {i + 1}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const EVT_FLOATERS: {
  Icon: typeof Camera;
  pos: CSSProperties;
  sx: string;
  sy: string;
  tint: string;
  size: number;
  dur: string;
  d: string;
}[] = [
  { Icon: Camera, pos: { left: "8%", top: "44%" }, sx: "-28px", sy: "-6px", tint: "#FF5A2A", size: 44, dur: "4.2s", d: "0s" },
  { Icon: Share2, pos: { right: "8%", top: "44%" }, sx: "28px", sy: "-6px", tint: "#4FB4F5", size: 42, dur: "4.4s", d: "0.5s" },
  { Icon: Sparkles, pos: { left: "13%", top: "77%" }, sx: "-30px", sy: "18px", tint: "#F5A623", size: 42, dur: "5s", d: "0.3s" },
  { Icon: Heart, pos: { right: "13%", top: "77%" }, sx: "30px", sy: "18px", tint: "#9A6BE0", size: 40, dur: "4.6s", d: "0.7s" },
];

function MockEvento() {
  /* 3 papéis: fotos, relatório, hashtag */
  const paperFotos = (
    <div className="w-full h-full flex flex-col p-2 gap-1.5">
      <div
        className="flex-1 rounded-sm"
        style={{
          background:
            "linear-gradient(135deg, var(--c-orange) 0%, var(--c-yellow) 100%)",
        }}
      />
      <div className="flex items-center justify-between">
        <span
          className="block w-3 h-3 rounded-full"
          style={{ background: "#FF5A2A" }}
        />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 6,
            color: "var(--c-ink)",
            letterSpacing: "0.06em",
          }}
        >
          KANGAROO
        </span>
      </div>
    </div>
  );

  const paperRelatorio = (
    <div className="w-full h-full flex flex-col p-2.5 gap-1.5">
      <div className="flex items-center justify-between">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 7,
            color: "var(--c-ink)",
          }}
        >
          Relatório
        </span>
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 6,
            color: "#8A7D70",
          }}
        >
          PDF
        </span>
      </div>
      {/* Mini bars chart */}
      <div className="flex items-end gap-1 h-8 mt-1">
        {[40, 80, 60, 95, 70, 85].map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background: i % 2 === 0 ? "#FF5A2A" : "#FFB48E",
            }}
          />
        ))}
      </div>
      {/* Faux text lines */}
      <div className="flex flex-col gap-0.5 mt-auto">
        <span className="block h-1 w-full rounded-full" style={{ background: "#D8D2C8" }} />
        <span className="block h-1 w-3/4 rounded-full" style={{ background: "#D8D2C8" }} />
      </div>
    </div>
  );

  const paperHashtag = (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 gap-1">
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 18,
          color: "#FF5A2A",
          lineHeight: 1,
        }}
      >
        #
      </span>
      <span
        className="text-center"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 7,
          color: "var(--c-ink)",
          lineHeight: 1.2,
        }}
      >
        FestaLucas
        <br />2026
      </span>
    </div>
  );

  return (
    <>
      {/* MagicRings (WebGL/THREE.js) removido — causava travamento */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,90,42,0.18), transparent 60%)",
        }}
      />
      {/* Ícones flutuando ao redor — se espalham (saem) no hover do card */}
      <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
        {EVT_FLOATERS.map((f, i) => {
          const Icon = f.Icon;
          return (
            <div
              key={i}
              className="evt-folder-floater absolute"
              style={{ ...f.pos, "--sx": f.sx, "--sy": f.sy } as CSSProperties}
            >
              <div
                className="evt-folder-floater__inner"
                style={{ "--dur": f.dur, "--d": f.d } as CSSProperties}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: f.size,
                    height: f.size,
                    borderRadius: f.size * 0.28,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
                  }}
                >
                  <Icon size={f.size * 0.42} strokeWidth={1.7} style={{ color: f.tint }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Folder por cima — elevada do fundo, papéis abrem pra cima sem cortar */}
      <div className="relative z-10 flex items-end justify-center w-full h-full pb-10">
        <Folder
          color="#FF5A2A"
          size={2}
          items={[paperFotos, paperRelatorio, paperHashtag]}
        />
      </div>
    </>
  );
}

/* ============ DADOS ============ */

const steps = [
  {
    num: "01",
    tag: "Conversa",
    title: "Você conta o evento",
    text: "Chama no WhatsApp e diz o que vai rolar. Em até 2 horas a gente volta com a melhor pegada e o valor.",
    Mockup: MockConversa,
    noise: true,
  },
  {
    num: "02",
    tag: "Curadoria",
    title: "A gente monta o combo",
    text: "Sugerimos os equipamentos que geram o efeito que você quer no seu público. Você ajusta o que quiser.",
    Mockup: MockCuradoria,
    noise: true,
  },
  {
    num: "03",
    tag: "Personalização",
    title: "Tudo com a cara do evento",
    text: "Moldura e identidade visual exclusivas. Cada foto sai com a marca e o clima da sua festa.",
    Mockup: MockPersonalizacao,
    noise: true,
  },
  {
    num: "04",
    tag: "No evento",
    title: "Foto na hora, galeria depois",
    text: "No dia, cada convidado sai com a foto na mão. Depois, você recebe a galeria completa e o relatório.",
    Mockup: MockEvento,
    noise: true,
  },
];

/* ============ SECTION ============ */

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      aria-label="Como funciona"
      className="pt-10 sm:pt-14 pb-20 sm:pb-28"
    >
      <div
        className="px-4 sm:px-6"
        style={{
          maxWidth: 1220,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
            <p style={eyebrowStyle}>Como funciona</p>
            <TextReveal
              as="h2"
              text="Da primeira mensagem ao último flash."
              style={sectionTitleStyle}
            />
            <p style={{ ...sectionLeadStyle, marginBottom: 56 }}>
              Quatro passos. Sem complicação, sem você ter que aprender nada de
              tecnologia. A gente cuida do resto.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {steps.map((step, i) => {
            const Mockup = step.Mockup;
            return (
              <Reveal key={step.num} delay={i * 0.08}>
                <article
                  className="group relative h-full overflow-hidden flex flex-col transition-all duration-300 will-change-transform hover:-translate-y-1 min-h-[360px] sm:min-h-[460px]"
                  style={{
                    background: "var(--c-surface)",
                    border: "1px solid var(--c-line)",
                    borderRadius: 16,
                  }}
                >
                  {/* Glow no hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(ellipse 500px 300px at 50% 0%, rgba(255,90,42,0.10), transparent 70%)",
                    }}
                  />

                  {/* Número no canto */}
                  <div
                    className="absolute top-5 right-5 z-10 transition-all duration-300 group-hover:scale-105"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 14,
                      letterSpacing: "0.04em",
                      color: "var(--c-orange)",
                      background: "var(--c-canvas)",
                      border: "1px solid var(--c-line-strong)",
                      borderRadius: 999,
                      padding: "4px 12px",
                    }}
                  >
                    {step.num}
                  </div>

                  {/* Mockup area */}
                  <div
                    className="relative flex items-center justify-center px-6 py-8 sm:py-12 overflow-hidden h-[270px] sm:h-[380px] shrink-0"
                    style={{
                      borderBottom: "1px solid var(--c-line)",
                    }}
                  >
                    <RadialBackdrop
                      color="#FF5A2A"
                      highlight="#FFB48E"
                      opacity={0.45}
                      position={i % 2 === 0 ? "top" : "bottom"}
                      fitParent
                    />
                    <div className="relative z-10 flex items-center justify-center w-full h-full">
                      <Mockup />
                    </div>
                    {/* Noise (canvas redesenhado a cada 3 frames ×4) removido — causava travamento */}
                  </div>

                  {/* Texto */}
                  <div className="flex-1 p-6 sm:p-7 flex flex-col relative">
                    <p
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 10.5,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "var(--c-text-mute)",
                        marginBottom: 10,
                      }}
                    >
                      {step.tag}
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "clamp(20px, 2.2vw, 24px)",
                        letterSpacing: "-0.022em",
                        color: "var(--c-text-primary)",
                        lineHeight: 1.18,
                        marginBottom: 10,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14.5,
                        lineHeight: 1.55,
                        color: "var(--c-text-secondary)",
                      }}
                    >
                      {step.text}
                    </p>
                  </div>

                  {/* Border highlight no hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: "inset 0 0 0 1px rgba(255, 90, 42, 0.35)",
                      borderRadius: 16,
                    }}
                  />
                </article>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
