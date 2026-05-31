"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION = 1800;
const HOLD = 300;

function FramerSpinner() {
  /* circumference de um circle r=7.25 → 2π × 7.25 ≈ 45.55 */
  const RADIUS = 7.25;
  const CIRC = 2 * Math.PI * RADIUS;
  const ARC = CIRC * 0.28; /* arc visível = 28% da circunferência */

  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter
          id="spinner-glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* Track circular sutil — sempre visível */}
      <circle
        cx="9"
        cy="9"
        r={RADIUS}
        stroke="rgba(251, 246, 241, 0.16)"
        strokeWidth="2"
        fill="none"
      />

      {/* Wrapper rotacionando */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          transformOrigin: "9px 9px",
          transformBox: "fill-box",
        }}
      >
        {/* Halo blur laranja — atrás do arc */}
        <circle
          cx="9"
          cy="9"
          r={RADIUS}
          stroke="rgba(255, 90, 42, 0.7)"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${ARC} ${CIRC}`}
          strokeDashoffset={0}
          filter="url(#spinner-glow)"
          transform="rotate(-90 9 9)"
        />
        {/* Arc nítido branco por cima */}
        <circle
          cx="9"
          cy="9"
          r={RADIUS}
          stroke="#FBF6F1"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${ARC} ${CIRC}`}
          strokeDashoffset={0}
          transform="rotate(-90 9 9)"
        />
      </motion.g>
    </svg>
  );
}

export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const lock = (v: string) => {
      document.documentElement.style.overflow = v;
      document.body.style.overflow = v;
    };
    lock("hidden");
    // garante que comece do topo enquanto a cortina está ativa
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      setDone(true);
      lock("");
    }, DURATION + HOLD);

    return () => {
      clearTimeout(t);
      lock("");
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "var(--c-canvas)" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Glow radial laranja sutil */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(255,90,42,0.12), transparent 70%)",
            }}
          />

          {/* Pill com spinner + Carregando... */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-flex items-center"
            style={{
              background: "#0F0906",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 999,
              padding: "6px 18px 6px 6px",
              gap: 10,
              boxShadow:
                "0 12px 32px -10px rgba(255,90,42,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <FramerSpinner />
            <span
              className="loader-shimmer"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 15.5,
                letterSpacing: "-0.01em",
                color: "var(--c-text-primary)",
              }}
            >
              Carregando...
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: 13.5,
              color: "var(--c-text-secondary)",
              marginTop: 22,
              letterSpacing: "-0.01em",
            }}
          >
            A melhor experiência para você.
          </motion.p>

          {/* Logo Kangaroo menorzinho */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ marginTop: 40 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kangaroo-logo.svg"
              alt="Kangaroo"
              style={{
                height: 18,
                width: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </motion.div>

          {/* Shimmer keyframes */}
          <style>{`
            .loader-shimmer {
              background: linear-gradient(
                90deg,
                var(--c-text-primary) 0%,
                var(--c-text-primary) 40%,
                rgba(251, 246, 241, 0.45) 50%,
                var(--c-text-primary) 60%,
                var(--c-text-primary) 100%
              );
              background-size: 200% 100%;
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: loader-shimmer-anim 2s linear infinite;
            }
            @keyframes loader-shimmer-anim {
              0% { background-position: 100% 0; }
              100% { background-position: -100% 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
