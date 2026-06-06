"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Heart,
  Share2,
  QrCode,
  Image as ImageIcon,
  Sparkles,
  Smartphone,
  Download,
} from "lucide-react";

/**
 * Relatório pós-evento — V2.
 * Anéis concêntricos (top 3 equipamentos, total no centro) + barra segmentada
 * com a divisão completa de fotos por equipamento e legenda com %.
 * SVG/CSS puro, sem libs de chart. Cores nos tokens da marca.
 */

/* --------------------------------------------------------------- dados */

const SEGMENTS = [
  { l: "Totem Fotográfico", v: 720, color: "#FF5A2A" },
  { l: "Plataforma 360°", v: 540, color: "#F5A623" },
  { l: "Cabine de Prêmios", v: 380, color: "#4FB4F5" },
  { l: "Audiobook", v: 150, color: "#9A6BE0" },
  { l: "Outros", v: 52, color: "#7A7067", striped: true },
];
const TOTAL = SEGMENTS.reduce((a, s) => a + s.v, 0); // 1842

const STRIPES =
  "repeating-linear-gradient(45deg, rgba(255,255,255,0.22) 0 3px, transparent 3px 7px)";

/* --------------------------------------------------------------- anéis */

const C = 120; // centro do viewBox 240×240
const RADII = [104, 82, 60]; // outer → inner (mais espaçados)
const STROKE = 9;

function Rings() {
  const top = SEGMENTS.slice(0, 3);
  const MAX = Math.max(...top.map((t) => t.v));
  return (
    <div className="relative w-full mx-auto max-w-[250px] lg:max-w-[470px]">
      <svg viewBox="0 0 240 240" width="100%" className="block">

        {top.map((s, i) => {
          const r = RADII[i];
          const circ = 2 * Math.PI * r;
          // preenche em relação ao líder (Totem) p/ os anéis ficarem cheios
          const pct = (s.v / MAX) * 0.9;
          return (
            <g key={s.l}>
              <circle
                cx={C}
                cy={C}
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={STROKE}
              />
              <motion.circle
                cx={C}
                cy={C}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={circ}
                transform={`rotate(-90 ${C} ${C})`}
                initial={{ strokeDashoffset: circ }}
                whileInView={{ strokeDashoffset: circ * (1 - pct) }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.1,
                  delay: 0.15 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="tabular-nums"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(30px, 9vw, 44px)",
            letterSpacing: "-0.02em",
            color: "var(--c-text-primary)",
            lineHeight: 1,
          }}
        >
          {TOTAL.toLocaleString("pt-BR")}
        </span>
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 10.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--c-text-mute)",
            marginTop: 5,
          }}
        >
          fotos
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- barra */

function StackedBar() {
  return (
    <div>
      <div className="flex items-baseline justify-between" style={{ marginBottom: 11 }}>
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 10.5,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "var(--c-text-mute)",
          }}
        >
          Fotos por equipamento
        </span>
        <span
          className="tabular-nums"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 16,
            color: "var(--c-text-primary)",
          }}
        >
          {TOTAL.toLocaleString("pt-BR")}
        </span>
      </div>

      {/* barra segmentada */}
      <div className="flex w-full" style={{ height: 12, gap: 3 }}>
        {SEGMENTS.map((s, i) => (
          <motion.div
            key={s.l}
            style={{
              background: s.color,
              backgroundImage: s.striped ? STRIPES : undefined,
              borderRadius: 3,
              height: "100%",
            }}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: `${(s.v / TOTAL) * 100}%`, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>

      {/* legenda */}
      <div className="flex flex-col" style={{ marginTop: 13, gap: 8 }}>
        {SEGMENTS.map((s) => (
          <div key={s.l} className="flex items-center gap-2.5">
            <span
              className="shrink-0"
              style={{
                width: 11,
                height: 11,
                borderRadius: 3,
                background: s.color,
                backgroundImage: s.striped ? STRIPES : undefined,
              }}
            />
            <span style={{ fontSize: 13, color: "var(--c-text-secondary)" }}>
              {s.l}
            </span>
            <span
              className="flex-1"
              style={{
                borderBottom: "1px dotted rgba(255,255,255,0.16)",
                transform: "translateY(-3px)",
              }}
            />
            <span
              className="tabular-nums shrink-0 text-right"
              style={{
                width: 40,
                fontFamily: "var(--font-geist-mono)",
                fontSize: 12.5,
                color: "var(--c-text-primary)",
              }}
            >
              {Math.round((s.v / TOTAL) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------ ícones flutuantes (desktop) */

const FLOATERS = [
  { Icon: Camera, pos: { left: "4%", top: "12%" }, size: 56, tint: "#FF5A2A", dur: 4.4, d: 0.0 },
  { Icon: ImageIcon, pos: { left: "22%", top: "4%" }, size: 42, tint: "#4FB4F5", dur: 4.7, d: 0.3 },
  { Icon: Sparkles, pos: { left: "12%", top: "58%" }, size: 46, tint: "#F5A623", dur: 5.0, d: 0.5 },
  { Icon: QrCode, pos: { left: "3%", top: "84%" }, size: 48, tint: "#4FB4F5", dur: 4.6, d: 0.8 },
  { Icon: Heart, pos: { right: "5%", top: "12%" }, size: 50, tint: "#9A6BE0", dur: 4.8, d: 0.2 },
  { Icon: Share2, pos: { right: "12%", top: "56%" }, size: 52, tint: "#FF5A2A", dur: 5.2, d: 0.6 },
  { Icon: Smartphone, pos: { right: "4%", top: "84%" }, size: 44, tint: "#F5A623", dur: 4.3, d: 1.0 },
  { Icon: Download, pos: { right: "23%", top: "90%" }, size: 40, tint: "#9A6BE0", dur: 5.1, d: 0.9 },
];

function FloatingIcons() {
  return (
    <div
      className="hidden lg:block absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      {FLOATERS.map((f, i) => {
        const Icon = f.Icon;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={f.pos}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + f.d, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="flex items-center justify-center"
              style={{
                width: f.size,
                height: f.size,
                borderRadius: f.size * 0.28,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: f.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: f.d,
              }}
            >
              <Icon size={f.size * 0.42} strokeWidth={1.7} style={{ color: f.tint }} />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------- mock */

export function RelatorioMock() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* fundo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 70% at 50% 6%, rgba(255,90,42,0.12) 0%, rgba(10,9,8,0.6) 48%, #0A0908 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.045) 0.75px, transparent 0.75px)",
          backgroundSize: "7px 7px",
          opacity: 0.45,
        }}
      />

      <div className="absolute inset-0 flex flex-col gap-5 p-5 sm:p-8">
        {/* header */}
        <div className="flex items-center justify-between">
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--c-text-mute)",
            }}
          >
            Relatório do evento
          </span>
          <span
            className="inline-flex items-center gap-2"
            style={{
              padding: "5px 11px 5px 9px",
              borderRadius: 999,
              background: "rgba(255,90,42,0.08)",
              border: "1px solid rgba(255,90,42,0.22)",
            }}
          >
            <span
              className="inline-block rounded-full"
              style={{ width: 6, height: 6, background: "var(--c-orange)" }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--c-text-secondary)",
              }}
            >
              Kangaroo
            </span>
          </span>
        </div>

        {/* anel + ícones flutuando ao redor (desktop) */}
        <div className="relative flex-1 flex items-center justify-center min-h-0">
          <FloatingIcons />
          <Rings />
        </div>

        {/* barra + legenda */}
        <StackedBar />
      </div>
    </div>
  );
}
