/**
 * Contato e links centralizados do site Kangaroo.
 *
 * Toda a comunicação por WhatsApp passa por aqui: o número e as mensagens
 * pré-preenchidas de cada botão ficam num único lugar, fáceis de revisar e
 * editar sem caçar string espalhada pelos componentes.
 *
 * Quem mantém: para trocar o número, edite `WHATSAPP_NUMBER`. Para ajustar o
 * texto de qualquer botão, edite `WHATSAPP_MESSAGES` (ou `produtoMessage`).
 */

/** Número no formato wa.me: 55 (Brasil) + 51 (DDD Porto Alegre) + assinante. */
export const WHATSAPP_NUMBER = "5551996752150";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

export const INSTAGRAM_HANDLE = "@kangaroo.totens";
export const INSTAGRAM_URL = "https://instagram.com/kangaroo.totens";

/**
 * Mensagens pré-preenchidas por contexto. Cada botão do site abre o WhatsApp
 * com a mensagem do seu lugar — assim a Kangaroo já sabe de onde veio o lead
 * e o cliente começa a conversa com a intenção certa.
 */
// Toda mensagem abre com "vim pelo site" para a Kangaroo identificar de cara
// que o lead chegou pelo site.
export const WHATSAPP_MESSAGES = {
  /** Fallback genérico, para qualquer botão sem contexto próprio. */
  default: "Olá Kangaroo! Vim pelo site e quero um orçamento para o meu evento.",
  /** CTA do topo (header). */
  header: "Olá Kangaroo! Vim pelo site e quero um orçamento. Pode me ajudar?",
  /** CTA principal do hero. */
  hero: "Olá Kangaroo! Vim pelo site e quero deixar meu evento marcante. Pode me passar um orçamento?",
  /** Botão "Falar agora" da seção de contato (atalho do formulário). */
  ctaDireto: "Olá Kangaroo! Vim pelo site e prefiro falar direto por aqui antes de preencher o formulário.",
  /** CTA da seção de tipos de evento. */
  eventos: "Olá Kangaroo! Vim pelo site, tenho um evento chegando e quero conhecer as opções de vocês.",
  /** Botão flutuante fixo no canto da tela. */
  flutuante: "Olá Kangaroo! Tudo bem? Vim pelo site e quero saber mais sobre os equipamentos para o meu evento.",
} as const;

/** Monta o link do WhatsApp com a mensagem (já codificada) opcional. */
export function whatsappUrl(message: string = WHATSAPP_MESSAGES.default): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

/** Mensagem de interesse num equipamento específico (cards de produto). */
export function produtoMessage(nome: string): string {
  return `Olá Kangaroo! Vim pelo site e tenho interesse no ${nome} para o meu evento. Pode me passar um orçamento?`;
}
