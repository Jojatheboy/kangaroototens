/**
 * Dados de contato / site centralizados.
 * Evita repetir o número e a URL do WhatsApp espalhados pelos componentes.
 */

export const WHATSAPP_NUMBER = "5551996752150";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

export const INSTAGRAM_HANDLE = "@kangaroo.totens";
export const INSTAGRAM_URL = "https://instagram.com/kangaroo.totens";

const DEFAULT_WHATSAPP_MESSAGE =
  "Olá Kangaroo, quero um orçamento para o meu evento.";

/** Monta o link do WhatsApp com a mensagem (já codificada) opcional. */
export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}
