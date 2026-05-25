/* Radial spotlight gradient — inspirado no fundo do Stripe / cobalt */

interface RadialBackdropProps {
  color?: string;
  highlight?: string;
  opacity?: number;
  position?: "top" | "bottom";
  /** Cobre 100% do parent (sem margins) — útil dentro de cards */
  fitParent?: boolean;
  /** Altura. Default 100% se fitParent, senão "560px" */
  height?: string;
  className?: string;
}

export function RadialBackdrop({
  color = "#FF5A2A",
  highlight = "#FFB48E",
  opacity = 0.55,
  position = "bottom",
  fitParent = false,
  height,
  className = "",
}: RadialBackdropProps) {
  const origin = position === "bottom" ? "100%" : "0%";
  const computedHeight = height ?? (fitParent ? "100%" : "560px");
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-x-0 pointer-events-none ${className}`}
      style={{
        [position]: 0,
        height: computedHeight,
        background: `radial-gradient(120% 120% at 50% ${origin}, transparent 40%, ${color} 75%, ${highlight} 100%)`,
        opacity,
        zIndex: 0,
        borderRadius: fitParent ? "inherit" : 48,
        margin: fitParent ? 0 : "0 24px",
        maxWidth: fitParent ? "100%" : "calc(100% - 48px)",
      }}
    />
  );
}
