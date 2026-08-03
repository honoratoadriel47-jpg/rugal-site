import { SITE, WHATSAPP_MESSAGES } from "@/data/store";

/**
 * Monta a URL do WhatsApp com mensagem pré-preenchida.
 * O número fica centralizado em SITE.whatsappNumber (fácil de trocar).
 */
export function whatsappLink(message = WHATSAPP_MESSAGES.general) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}

export function openWhatsApp(message) {
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
}

export const brl = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
