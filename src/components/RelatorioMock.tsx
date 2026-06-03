"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

/**
 * Mock de "Relatório pós-evento" — dashboard dark na identidade da Kangaroo.
 * Gráfico de linha profissional: curva suave, eixo Y, grid sutil, tooltip no
 * hover. Largura medida (sem distorção). SVG puro, sem libs de chart.
 */

// série densa e determinística (sem random → sem mismatch de hidratação)
const N = 25;
const MAX_DOMAIN = 2000;
const SERIE = Array.from({ length: N }, (_, i) => {
  const t = i / (N - 1);
  const base = 1842 * Math.pow(t, 1.55);
  const wiggle = Math.sin(i * 1.25) * 16 + Math.sin(i * 0.6) * 10;
  return Math.max(0, Math.round(base + (i === 0 ? 0 : wiggle)));
});
const Y_TICKS = [0, 500, 1000, 1500, 2000];
const X_TICKS = [
  { i: 0, l: "18h" },
  { i: 6, l: "20h" },
  { i: 12, l: "22h" },
  { i: 18, l: "00h" },
  { i: 24, l: "02h" },
];

const KPIS = [
  { k: "Fotos no evento", v: "1.842", up: "+38%" },
  { k: "Leads captados", v: "318", up: "+24%" },
  { k: "Compartilhamentos", v: "4,7 mil", up: "+61%" },
];

const BARRAS = [
  { l: "Totem Fotográfico", v: 720 },
  { l: "Plataforma 360°", v: 540 },
  { l: "Cabine de Prêmios", v: 380 },
  { l: "Audiobook", v: 202 },
];

const H = 210;
const PT = 14; // padding top
const PB = 24; // padding bottom (labels x)
const PL = 40; // padding left (labels y)
const PR = 14; // padding right

function fmt(v: number) {
  return v.toLocaleString("pt-BR");
}

function fmtTime(i: number) {
  const min = 18 * 60 + (i / (N - 1)) * 8 * 60;
  const h = Math.floor(min / 60) % 24;
  const m = Math.round((min % 60) / 5) * 5;
  const mm = m === 60 ? 0 : m;
  const hh = m === 60 ? (h + 1) % 24 : h;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

// curva suave (Catmull-Rom → bézier)
function smooth(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function LineChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(560);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const yOf = (v: number) => PT + (1 - v / MAX_DOMAIN) * (H - PT - PB);
  const xOf = (i: number) => PL + (i / (N - 1)) * (w - PL - PR);

  const { line, area } = useMemo(() => {
    const pts = SERIE.map((v, i) => ({ x: xOf(i), y: yOf(v) }));
    const line = smooth(pts);
    const area = `${line} L${pts[N - 1].x.toFixed(1)} ${H - PB} L${pts[0].x.toFixed(1)} ${H - PB} Z`;
    return { line, area };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const i = Math.round(((relX - PL) / (w - PL - PR)) * (N - 1));
    setHover(Math.max(0, Math.min(N - 1, i)));
  };

  const hx = hover != null ? xOf(hover) : 0;
  const hy = hover != null ? yOf(SERIE[hover]) : 0;

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      style={{ height: H }}
      onPointerMove={onMove}
      onPointerLeave={() => setHover(null)}
    >
      <svg width="100%" height={H} viewBox={`0 0 ${w} ${H}`} className="block">
        <defs>
          <linearGradient id="rel-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,90,42,0.18)" />
            <stop offset="100%" stopColor="rgba(255,90,42,0)" />
          </linearGradient>
        </defs>

        {/* grid + labels Y */}
        {Y_TICKS.map((t) => (
          <g key={t}>
            <line
              x1={PL}
              x2={w - PR}
              y1={yOf(t)}
              y2={yOf(t)}
              stroke="rgba(255,255,255,0.055)"
              strokeWidth={1}
            />
            <text
              x={PL - 8}
              y={yOf(t) + 3}
              textAnchor="end"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 9.5,
                fill: "var(--c-text-mute)",
              }}
            >
              {t >= 1000 ? `${t / 1000}k` : t}
            </text>
          </g>
        ))}

        {/* labels X */}
        {X_TICKS.map((t) => (
          <text
            key={t.l}
            x={xOf(t.i)}
            y={H - 6}
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 9.5,
              fill: "var(--c-text-mute)",
            }}
          >
            {t.l}
          </text>
        ))}

        <motion.path
          d={area}
          fill="url(#rel-fill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="var(--c-orange)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />

        {hover != null && (
          <g>
            <line
              x1={hx}
              x2={hx}
              y1={PT}
              y2={H - PB}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={1}
            />
            <circle cx={hx} cy={hy} r={4} fill="var(--c-orange)" stroke="#0A0908" strokeWidth={2} />
          </g>
        )}
      </svg>

      {/* tooltip */}
      {hover != null && (
        <div
          className="pointer-events-none absolute z-10"
          style={{
            left: hx,
            top: hy,
            transform: `translate(${hx > w * 0.7 ? "calc(-100% - 12px)" : "12px"}, -50%)`,
          }}
        >
          <div
            style={{
              background: "rgba(20,18,17,0.92)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 9,
              padding: "7px 10px",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10,
                color: "var(--c-text-mute)",
                marginBottom: 2,
              }}
            >
              {fmtTime(hover)}
            </div>
            <div
              className="tabular-nums"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 14,
                color: "var(--c-text-primary)",
              }}
            >
              {fmt(SERIE[hover])} fotos
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function RelatorioMock() {
  const maxBar = Math.max(...BARRAS.map((b) => b.v));

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(95% 65% at 60% 18%, rgba(255,90,42,0.10) 0%, rgba(10,9,8,0.55) 50%, #0A0908 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0.75px, transparent 0.75px)",
          backgroundSize: "6px 6px",
          opacity: 0.5,
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-between gap-4 p-5 sm:p-10">
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
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block rounded-full"
              style={{ width: 6, height: 6, background: "var(--c-orange)" }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10.5,
                letterSpacing: "0.1em",
                color: "var(--c-text-secondary)",
              }}
            >
              AO VIVO
            </span>
          </span>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {KPIS.map((s) => (
            <div
              key={s.k}
              className="min-w-0 p-2.5 sm:p-[15px]"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
              }}
            >
              <span
                className="tabular-nums block"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(18px, 5vw, 27px)",
                  letterSpacing: "-0.02em",
                  color: "var(--c-text-primary)",
                  lineHeight: 1,
                }}
              >
                {s.v}
              </span>
              <span
                className="inline-flex items-center gap-0.5 mt-1.5 [&_svg]:w-3 [&_svg]:h-3"
                style={{
                  color: "var(--c-orange)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 10.5,
                  fontWeight: 600,
                }}
              >
                <TrendingUp />
                {s.up}
              </span>
              <div
                style={{
                  fontSize: "clamp(10px, 2.7vw, 11.5px)",
                  lineHeight: 1.25,
                  color: "var(--c-text-mute)",
                  marginTop: 8,
                  overflowWrap: "anywhere",
                }}
              >
                {s.k}
              </div>
            </div>
          ))}
        </div>

        {/* gráfico */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10.5,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--c-text-mute)",
              marginBottom: 6,
            }}
          >
            Fotos ao longo do evento
          </p>
          <LineChart />
        </div>

        {/* barras por equipamento */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10.5,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--c-text-mute)",
              marginBottom: 12,
            }}
          >
            Fotos por equipamento
          </p>
          <div className="flex flex-col gap-2.5">
            {BARRAS.map((b, i) => (
              <div key={b.l} className="flex items-center gap-3">
                <span
                  className="shrink-0"
                  style={{ width: 132, fontSize: 12.5, color: "var(--c-text-secondary)" }}
                >
                  {b.l}
                </span>
                <div
                  className="relative flex-1 overflow-hidden rounded-full"
                  style={{ height: 7, background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: "var(--c-orange)" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(b.v / maxBar) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span
                  className="shrink-0 tabular-nums"
                  style={{
                    width: 42,
                    textAlign: "right",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 12,
                    color: "var(--c-text-primary)",
                  }}
                >
                  {b.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
