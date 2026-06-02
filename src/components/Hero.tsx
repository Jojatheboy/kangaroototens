"use client";

import { LayoutGroup, motion } from "framer-motion";
import { TextRotate } from "@/components/ui/text-rotate";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ButtonSecondary } from "@/components/ui/button-secondary";
import { HeroGallery } from "@/components/HeroGallery";
import { whatsappUrl, WHATSAPP_MESSAGES } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-label="Kangaroo, tecnologia interativa para eventos"
      className="w-full h-[122vh] overflow-hidden flex flex-col items-center justify-start pt-[8vh] relative"
      style={{ background: "var(--c-canvas)" }}
    >
      {/* Base escura */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "var(--c-ink)" }}
      />

      {/* Parede de imagens (parallax no scroll) — faixa inferior */}
      <HeroGallery />

      {/* Degradê no rodapé — dissolve as imagens no fundo, sem linha de emenda */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{
          height: "26%",
          background:
            "linear-gradient(to bottom, rgba(var(--c-ink-rgb),0) 0%, rgba(var(--c-ink-rgb),0.6) 55%, var(--c-ink) 100%)",
        }}
      />

      <div className="flex flex-col justify-center items-center w-[300px] sm:w-[440px] md:w-[640px] lg:w-[820px] max-w-[92vw] z-30 pointer-events-auto">
        {/* Announcement pill */}
        <motion.a
          href="#equipamentos"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full no-underline mb-6 sm:mb-9 transition-colors max-w-[88vw]"
          style={{
            background: "rgba(var(--c-ink-rgb), 0.55)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "3px 12px 3px 3px",
          }}
        >
          <span
            className="inline-flex items-center justify-center rounded-full font-bold shrink-0"
            style={{
              background: "var(--c-orange)",
              color: "var(--c-ink)",
              padding: "3px 9px",
              fontSize: 9.5,
              letterSpacing: "0.06em",
              fontFamily: "var(--font-display)",
            }}
          >
            KANGAROO
          </span>
          <span
            className="truncate"
            style={{
              fontSize: 11.5,
              color: "var(--c-text-secondary)",
              fontFamily: "var(--font-geist)",
              letterSpacing: "-0.005em",
            }}
          >
            <span className="sm:hidden">Eternizando lembranças</span>
            <span className="hidden sm:inline">Eternizando suas lembranças</span>
          </span>
        </motion.a>

        <motion.h1
          className="text-[44px] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-[0.95]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "var(--c-text-primary)",
            letterSpacing: "-0.04em",
          }}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span>Deixe seu </span>
          <LayoutGroup>
            <motion.span layout className="flex whitespace-pre">
              <motion.span
                layout
                className="flex whitespace-pre"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                evento{" "}
              </motion.span>
              <TextRotate
                texts={[
                  "vivo",
                  "viral",
                  "marcante",
                  "memorável",
                  "inesquecível",
                  "compartilhável",
                  "épico",
                  "lendário",
                ]}
                mainClassName="overflow-hidden pr-3 text-[color:var(--c-orange)] py-0 rounded-xl"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>

        <motion.p
          className="text-[13.5px] sm:text-base md:text-lg text-center mt-4 sm:mt-6 md:mt-7 max-w-[44ch] sm:max-w-[52ch] px-4 sm:px-0"
          style={{ color: "var(--c-text-secondary)", lineHeight: 1.5 }}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          Totens, plataformas 360°, cabines e mais. Tecnologia interativa para
          eventos em Porto Alegre.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-3 mt-7 sm:mt-10 md:mt-12 z-20"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
        >
          <div className="order-2 sm:order-1">
            <ButtonSecondary href="#equipamentos" size="default">
              Ver equipamentos
            </ButtonSecondary>
          </div>
          <div className="order-1 sm:order-2">
            <ShinyButton
              href={whatsappUrl(WHATSAPP_MESSAGES.hero)}
              target="_blank"
              rel="noopener noreferrer"
              size="default"
            >
              Solicitar orçamento
            </ShinyButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#equipamentos"
        aria-label="Rolar para próxima seção"
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 no-underline pointer-events-auto group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 9.5,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--c-text-mute)",
          }}
        >
          arraste
        </span>
        <motion.div
          className="relative flex items-start justify-center rounded-full"
          style={{
            width: 22,
            height: 34,
            border: "1px solid var(--c-line-strong)",
            background: "rgba(var(--c-ink-rgb), 0.45)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.span
            aria-hidden="true"
            className="block rounded-full"
            style={{ width: 3, height: 6, background: "var(--c-orange)", marginTop: 6 }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.a>
    </section>
  );
}
