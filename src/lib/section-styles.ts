import type { CSSProperties } from "react";

/**
 * Estilos compartilhados do cabeçalho de seção (eyebrow + título + lead).
 * Vários blocos usavam exatamente os mesmos valores inline — centralizamos
 * aqui pra reuso e manutenção, sem alterar a aparência.
 */

/** Rótulo pequeno em maiúsculas acima do título (ex: "Equipamentos"). */
export const eyebrowStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 500,
  fontSize: 13,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "var(--c-text-mute)",
  marginBottom: 14,
};

/** Título h2 de seção (clamp responsivo). */
export const sectionTitleStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "clamp(28px, 4.2vw, 44px)",
  lineHeight: 1.08,
  letterSpacing: "-0.03em",
  color: "var(--c-text-primary)",
  marginBottom: 14,
  display: "block",
};

/** Parágrafo de apoio abaixo do título. */
export const sectionLeadStyle: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.55,
  color: "var(--c-text-secondary)",
  maxWidth: "48ch",
  margin: "0 auto",
};
