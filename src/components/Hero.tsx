"use client";

import { LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import { TextRotate } from "@/components/ui/text-rotate";
import { Grainient } from "@/components/ui/Grainient";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ButtonSecondary } from "@/components/ui/button-secondary";
import Floating, {
  FloatingElement,
} from "@/components/ui/parallax-floating";

const WHATSAPP =
  "https://wa.me/5551996752150?text=Olá%20Kangaroo,%20quero%20um%20orçamento%20para%20o%20meu%20evento.";

const exampleImages = [
  {
    url: "/images/hero/hero-record.webp",
    title: "Stand Record Guaíba",
  },
  {
    url: "/images/post4-hm-03.jpg",
    title: "Cabine H&M Iguatemi Porto Alegre",
  },
  {
    url: "/images/hero/hero-cabine-premios.webp",
    title: "Cabine de prêmios Kangaroo em evento",
  },
  {
    url: "/images/hero/hero-docile.webp",
    title: "Plataforma 360° no stand da Docile",
  },
  {
    url: "/images/hero/hero-equipe.webp",
    title: "Equipe Kangaroo em ativação",
  },
];

/* Mac window mockup wrapper */
function PhotoCard({
  src,
  alt,
  className,
  rotation,
  delay,
  sizes,
  priority,
  opacity,
}: {
  src: string;
  alt: string;
  className: string;
  rotation: string;
  delay: number;
  sizes: string;
  priority?: boolean;
  opacity?: number;
}) {
  return (
    <motion.div
      className={`${className} relative overflow-hidden rounded-xl shadow-2xl cursor-pointer hover:scale-[1.03] transition-transform duration-200 flex flex-col`}
      style={{
        transform: rotation,
        background: "var(--c-surface)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: opacity ?? 1 }}
      transition={{ delay }}
    >
      {/* Mac titlebar */}
      <div
        className="flex items-center gap-1.5 px-2.5 shrink-0"
        style={{
          height: 22,
          background: "rgba(20, 14, 10, 0.95)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <span
          className="rounded-full"
          style={{ width: 8, height: 8, background: "#ED6A5E" }}
        />
        <span
          className="rounded-full"
          style={{ width: 8, height: 8, background: "#F5BF4F" }}
        />
        <span
          className="rounded-full"
          style={{ width: 8, height: 8, background: "#62C554" }}
        />
      </div>

      {/* Image area */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      className="w-full h-screen overflow-hidden flex flex-col items-center justify-center relative"
      style={{ background: "var(--c-canvas)" }}
    >
      {/* Grainient WebGL background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Grainient
          color1="#090909"
          color2="#5f3c25"
          color3="#000000"
          timeSpeed={0.25}
          colorBalance={0.0}
          warpStrength={1.0}
          warpFrequency={5.0}
          warpSpeed={2.0}
          warpAmplitude={50.0}
          blendAngle={0.0}
          blendSoftness={0.05}
          rotationAmount={500.0}
          noiseScale={2.0}
          grainAmount={0.1}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.0}
          saturation={1.0}
          centerX={0.0}
          centerY={0.0}
          zoom={0.9}
        />
      </div>

      <Floating sensitivity={-0.5} className="h-full">
        {/* ESQUERDA — topo (visível em todas as telas) */}
        <FloatingElement
          depth={1}
          className="top-[7%] left-[2%] sm:top-[10%] sm:left-[4%] md:top-[12%] md:left-[7%]"
        >
          <PhotoCard
            src={exampleImages[1].url}
            alt={exampleImages[1].title}
            className="w-32 h-28 sm:w-36 sm:h-28 md:w-60 md:h-48 lg:w-72 lg:h-56"
            rotation="rotate(-6deg)"
            delay={0.5}
            sizes="(min-width: 1024px) 288px, (min-width: 768px) 240px, (min-width: 640px) 144px, 128px"
            priority
          />
        </FloatingElement>

        {/* DIREITA — topo (visível em todas as telas) */}
        <FloatingElement
          depth={2}
          className="top-[7%] right-[2%] sm:top-[10%] sm:right-[4%] md:top-[12%] md:right-[7%]"
        >
          <PhotoCard
            src={exampleImages[3].url}
            alt={exampleImages[3].title}
            className="w-32 h-28 sm:w-36 sm:h-28 md:w-60 md:h-52 lg:w-72 lg:h-60"
            rotation="rotate(6deg)"
            delay={0.9}
            sizes="(min-width: 1024px) 288px, (min-width: 768px) 240px, (min-width: 640px) 144px, 128px"
            priority
          />
        </FloatingElement>

        {/* ESQUERDA — base */}
        <FloatingElement
          depth={3}
          className="top-[70%] left-[2%] sm:top-[60%] sm:left-[3%] md:top-[54%] md:left-[5%]"
        >
          <PhotoCard
            src={exampleImages[2].url}
            alt={exampleImages[2].title}
            className="w-32 h-32 sm:w-44 sm:h-44 md:w-64 md:h-64 lg:w-80 lg:h-80"
            rotation="rotate(-3deg)"
            delay={0.7}
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, (min-width: 640px) 176px, 128px"
          />
        </FloatingElement>

        {/* DIREITA — base */}
        <FloatingElement
          depth={1}
          className="top-[70%] right-[2%] sm:top-[60%] sm:right-[3%] md:top-[54%] md:right-[5%]"
        >
          <PhotoCard
            src={exampleImages[4].url}
            alt={exampleImages[4].title}
            className="w-32 h-32 sm:w-44 sm:h-44 md:w-64 md:h-64 lg:w-80 lg:h-80"
            rotation="rotate(3deg)"
            delay={1.1}
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, (min-width: 640px) 176px, 128px"
          />
        </FloatingElement>

        {/* CENTRO — pequena, atrás (decorativa) — só md+ */}
        <FloatingElement
          depth={0.5}
          className="hidden md:block top-[5%] left-1/2 -translate-x-1/2"
        >
          <PhotoCard
            src={exampleImages[0].url}
            alt={exampleImages[0].title}
            className="md:w-28 md:h-24 lg:w-32 lg:h-28"
            rotation="rotate(-10deg)"
            delay={1.3}
            sizes="(min-width: 1024px) 128px, 112px"
            opacity={0.9}
          />
        </FloatingElement>
      </Floating>

      <div className="flex flex-col justify-center items-center w-[300px] sm:w-[440px] md:w-[640px] lg:w-[820px] max-w-[92vw] z-30 pointer-events-auto">
        {/* Announcement pill */}
        <motion.a
          href="#equipamentos"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full no-underline mb-6 sm:mb-9 transition-colors max-w-[88vw]"
          style={{
            background: "rgba(15, 9, 6, 0.55)",
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
              color: "#0F0906",
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
              href={WHATSAPP}
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
            background: "rgba(15, 9, 6, 0.45)",
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
