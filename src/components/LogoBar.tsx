"use client";

import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "./Reveal";
import { sectionLeadStyle, sectionTitleStyle } from "@/lib/section-styles";

const brands = [
  { src: "/images/logos/south-summit.webp", alt: "South Summit", height: 32 },
  { src: "/images/logos/sanremo.webp", alt: "Sanremo", height: 38 },
  { src: "/images/logos/alfa.webp", alt: "Alfa", height: 22, invert: true },
  { src: "/images/logos/docile.webp", alt: "Docile", height: 34 },
  { src: "/images/logos/92.webp", alt: "92.", height: 38 },
  { src: "/images/logos/planeta-atlantida.webp", alt: "Planeta Atlântida", height: 44 },
  { src: "/images/logos/ulbra.webp", alt: "Ulbra", height: 32, invert: true },
  { src: "/images/logos/banrisul.webp", alt: "Banrisul", height: 34, invert: true },
  { src: "/images/logos/internacional.webp", alt: "Internacional", height: 44 },
  { src: "/images/logos/hm.webp", alt: "H&M", height: 32 },
  { src: "/images/logos/recordtv.webp", alt: "RecordTV", height: 42 },
  { src: "/images/logos/petrobras.webp", alt: "Petrobras", height: 24 },
  { src: "/images/logos/rbs.webp", alt: "Grupo RBS", height: 28 },
];

export function LogoBar() {
  return (
    <section
      aria-label="Marcas que confiam na Kangaroo"
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--c-canvas)",
      }}
    >
      <div
        className="relative mx-auto w-full px-4 sm:px-6"
        style={{
          maxWidth: 1220,
          paddingTop: 40,
        }}
      >
        <Reveal>
          <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
            <h2 style={sectionTitleStyle}>
              Marcas que já viveram a experiência Kangaroo.
            </h2>
            <p style={sectionLeadStyle}>
              Marcas grandes e eventos íntimos confiam na Kangaroo pra
              transformar cada clique em lembrança.
            </p>
          </div>
        </Reveal>

      </div>

      {/* esteira de logos — full-bleed, rola em loop, com blur nas pontas */}
      <Reveal delay={0.1}>
        <div className="relative mt-12 sm:mt-14">
          {/* blur/fade esquerda */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-10 w-20 sm:w-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--c-canvas) 10%, transparent)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              maskImage: "linear-gradient(to right, black 30%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, black 30%, transparent)",
            }}
          />
          {/* blur/fade direita */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 z-10 w-20 sm:w-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, var(--c-canvas) 10%, transparent)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              maskImage: "linear-gradient(to left, black 30%, transparent)",
              WebkitMaskImage: "linear-gradient(to left, black 30%, transparent)",
            }}
          />
          <Marquee duration={50} gap={72} pauseOnHover>
            {brands.map((b) => (
              <div
                key={b.alt}
                className="flex items-center shrink-0"
                style={{ height: 56 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.src}
                  alt={b.alt}
                  style={{
                    maxHeight: b.height,
                    width: "auto",
                    objectFit: "contain",
                    filter: b.invert ? "brightness(0) invert(1)" : undefined,
                    opacity: b.invert ? 0.85 : 1,
                  }}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </Reveal>

      {/* Sparkles + curve below */}
      <div
        className="relative -mt-16 sm:-mt-20 h-40 sm:h-52 w-full overflow-hidden"
        style={{
          maskImage:
            "radial-gradient(50% 50% at 50% 50%, white, transparent)",
          WebkitMaskImage:
            "radial-gradient(50% 50% at 50% 50%, white, transparent)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at bottom center, var(--c-orange), transparent 70%)",
            opacity: 0.28,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%]"
          style={{
            borderTop: "1px solid var(--c-line-strong)",
            background: "var(--c-surface)",
          }}
        />
        {/* Sparkles (1200 partículas tsparticles) removido — causava travamento */}
      </div>
    </section>
  );
}
