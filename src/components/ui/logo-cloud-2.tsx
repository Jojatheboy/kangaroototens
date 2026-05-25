import Image from "next/image";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  /** Altura em px (mobile e desktop usam mesmo valor proporcional). */
  height?: number;
  /** Inverter cor pra logos monocromáticos pretos aparecerem em bg dark. */
  invert?: boolean;
  /** Forçar bg claro no card (pra logos que têm texto preto sobre transparente). */
  lightBg?: boolean;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
  /** Indices (0-based) que recebem bg "tinted" pra alternância. Ex: [0,2,5,7]. */
  tintedIndices?: number[];
};

export function LogoCloud({
  className,
  logos,
  tintedIndices = [],
  ...props
}: LogoCloudProps) {
  const tinted = new Set(tintedIndices);
  const cols = 4;
  const total = logos.length;

  return (
    <div
      className={cn(
        "relative grid grid-cols-2 md:grid-cols-4",
        className
      )}
      style={{ borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)" }}
      {...props}
    >
      <div
        className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen"
        style={{ borderTop: "1px solid var(--c-line)" }}
      />

      {logos.map((logo, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        const totalRows = Math.ceil(total / cols);
        const isLastRow = row === totalRows - 1;
        const isLastCol = col === cols - 1;

        return (
          <LogoCard
            key={logo.alt}
            logo={logo}
            tinted={tinted.has(idx)}
            className={cn(
              !isLastCol && "md:[border-right-style:solid] md:[border-right-width:1px]",
              !isLastRow && "[border-bottom-style:solid] [border-bottom-width:1px]"
            )}
          >
            {/* Plus decorativo no canto inferior-direito (exceto última coluna/última linha) */}
            {!isLastCol && !isLastRow && (
              <PlusIcon
                aria-hidden="true"
                className="-right-[12.5px] -bottom-[12.5px] absolute z-10 hidden md:block size-6"
                strokeWidth={1}
                style={{ color: "var(--c-text-mute)", opacity: 0.5 }}
              />
            )}
          </LogoCard>
        );
      })}

      <div
        className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen"
        style={{ borderBottom: "1px solid var(--c-line)" }}
      />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
  tinted?: boolean;
};

function LogoCard({
  logo,
  className,
  children,
  tinted = false,
  ...props
}: LogoCardProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center px-4 py-10 md:p-12",
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
      {children}
    </div>
  );
}
