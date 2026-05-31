import Image from "next/image";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  /** Altura em px. */
  height?: number;
  /** Inverter cor pra logos monocromáticos pretos aparecerem em bg dark. */
  invert?: boolean;
  /** Forçar bg claro no card (pra logos com tinta escura sobre transparente). */
  lightBg?: boolean;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
  /** Indices (0-based) que recebem bg "tinted" pra alternância. */
  tintedIndices?: number[];
};

export function LogoCloud({
  className,
  logos,
  tintedIndices = [],
  ...props
}: LogoCloudProps) {
  const tinted = new Set(tintedIndices);

  return (
    <div
      className={cn("flex flex-wrap justify-center", className)}
      style={{
        borderTop: "1px solid var(--c-line)",
        borderBottom: "1px solid var(--c-line)",
      }}
      {...props}
    >
      {logos.map((logo, idx) => (
        <LogoCard
          key={logo.alt}
          logo={logo}
          tinted={tinted.has(idx)}
          className="basis-1/3 sm:basis-1/5 lg:basis-[14.2857%]"
        />
      ))}
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
  tinted?: boolean;
};

function LogoCard({ logo, className, tinted = false, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center px-3 py-7 md:px-4 md:py-9",
        className
      )}
      style={{
        background: logo.lightBg
          ? "#F5F5F0"
          : tinted
          ? "var(--c-surface)"
          : "transparent",
        borderColor: "var(--c-line)",
      }}
      {...props}
    >
      <Image
        alt={logo.alt}
        src={logo.src}
        width={(logo.height ?? 40) * 6}
        height={logo.height ?? 40}
        className="pointer-events-none select-none h-auto w-auto object-contain"
        style={{
          maxHeight: logo.height ?? 40,
          filter: logo.invert ? "brightness(0) invert(1)" : undefined,
          opacity: logo.invert ? 0.85 : 1,
        }}
      />
    </div>
  );
}
