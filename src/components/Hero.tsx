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

      <div className="flex flex-col justify-center items-center w-[92vw] sm:w-[440px] md:w-[640px] lg:w-[900px] xl:w-[1020px] max-w-[92vw] z-30 pointer-events-auto">
        {/* Announcement pill */}
        <motion.a
          href="#equipamentos"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full no-underline mb-3 sm:mb-4 transition-colors max-w-[88vw]"
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
          className="text-[36px] sm:text-[44px] md:text-6xl lg:text-[76px] xl:text-[88px] text-center w-full justify-center items-center flex-col flex leading-[0.95]"
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
          {/* 2 linhas em todos os tamanhos: "Deixe seu evento" + a palavra que
              gira. Antes virava 3 linhas no mobile (evento e a palavra
              empilhados num container estreito de 300px). */}
          <span className="whitespace-nowrap">Deixe seu evento</span>
          <LayoutGroup>
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
              mainClassName="overflow-hidden px-1 text-[color:var(--c-orange)] py-0 rounded-xl justify-center"
              staggerDuration={0.03}
              staggerFrom="last"
              rotationInterval={3000}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            />
          </LayoutGroup>
        </motion.h1>

        <motion.p
          className="text-[13.5px] sm:text-base md:text-lg lg:text-xl text-center mt-4 sm:mt-6 md:mt-7 max-w-[44ch] sm:max-w-[52ch] px-4 sm:px-0"
          style={{ color: "var(--c-text-secondary)", lineHeight: 1.5, textWrap: "balance" }}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          Totens, plataformas 360°, cabines e mais. Tecnologia interativa para
          eventos em Porto Alegre.
        </motion.p>

        <motion.div
          className="flex flex-row flex-wrap justify-center items-center gap-2.5 sm:gap-3 mt-7 sm:mt-9 md:mt-10 z-20"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
        >
          <div className="order-2 sm:order-1">
            <ButtonSecondary
              href="#equipamentos"
              size="default"
              className="!px-4 !py-2.5 !text-[13px] sm:!px-[26px] sm:!py-3.5 sm:!text-[15px]"
            >
              Ver equipamentos
            </ButtonSecondary>
          </div>
          <div className="order-1 sm:order-2">
            <ShinyButton
              href={whatsappUrl(WHATSAPP_MESSAGES.hero)}
              target="_blank"
              rel="noopener noreferrer"
              size="default"
              className="!px-4 !py-2.5 !text-[13px] sm:!px-7 sm:!py-3.5 sm:!text-[15px]"
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
