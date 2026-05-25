"use client";

import { Sparkles } from "@/components/ui/sparkles";
import { LogoCloud } from "@/components/ui/logo-cloud-2";
import { Reveal } from "./Reveal";

const brands = [
  { src: "/images/logos/south-summit.webp", alt: "South Summit", height: 36 },
  { src: "/images/logos/sanremo.webp", alt: "Sanremo", height: 44 },
  { src: "/images/logos/alfa.webp", alt: "Alfa", height: 24, invert: true },
  { src: "/images/logos/docile.webp", alt: "Docile", height: 40 },
  { src: "/images/logos/92.webp", alt: "92.", height: 44 },
  { src: "/images/logos/planeta-atlantida.webp", alt: "Planeta Atlântida", height: 52 },
  { src: "/images/logos/ulbra.webp", alt: "Ulbra", height: 36, invert: true },
  { src: "/images/logos/banrisul.webp", alt: "Banrisul", height: 40, invert: true },
];

export function LogoBar() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--c-canvas)",
        borderTop: "1px solid var(--c-line)",
      }}
    >
      <div
        className="relative mx-auto w-full px-4 sm:px-6"
        style={{
          maxWidth: 1220,
          paddingTop: 80,
        }}
      >
        <Reveal>
          <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px, 4.2vw, 44px)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "var(--c-text-primary)",
                marginBottom: 14,
              }}
            >
              Marcas que já viveram a experiência Kangaroo.
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                color: "var(--c-text-secondary)",
                maxWidth: "48ch",
                margin: "0 auto",
              }}
            >
              Marcas grandes e eventos íntimos confiam na Kangaroo pra
              transformar cada clique em lembrança.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 sm:mt-14">
            <LogoCloud
              logos={brands}
              tintedIndices={[0, 3, 5, 6]}
            />
          </div>
        </Reveal>
      </div>

      {/* Sparkles + curve below */}
      <div
        className="relative -mt-16 sm:-mt-20 h-80 sm:h-96 w-full overflow-hidden"
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
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full"
          color="var(--sparkles-color)"
        />
      </div>
    </section>
  );
}
