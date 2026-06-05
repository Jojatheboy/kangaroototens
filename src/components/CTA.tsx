"use client";

import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  FormEvent,
  type ReactElement,
} from "react";
import { motion } from "framer-motion";
import { ShinyButton } from "@/components/ui/shiny-button";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  whatsappUrl,
  WHATSAPP_MESSAGES,
} from "@/lib/site";

const tiposEvento = [
  "Casamento",
  "Evento corporativo",
  "Inauguração de loja",
  "Stand de feira",
  "Ativação de marca",
  "Evento esportivo",
  "Aniversário",
  "Formatura",
  "Outro",
];

function buildWhatsAppLink(data: {
  nome: string;
  whatsapp: string;
  tipo: string;
  data: string;
  mensagem: string;
}) {
  const lines = [
    `Olá Kangaroo! Vim pelo site e quero um orçamento.`,
    ``,
    `Nome: ${data.nome}`,
    `WhatsApp: ${data.whatsapp}`,
    `Tipo de evento: ${data.tipo}`,
    `Data prevista: ${data.data || "ainda definindo"}`,
    data.mensagem ? `Detalhes: ${data.mensagem}` : "",
  ].filter(Boolean);
  return whatsappUrl(lines.join("\n"));
}

export function CTA() {
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    tipo: tiposEvento[0],
    data: "",
    mensagem: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = buildWhatsAppLink(form);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <section
      id="contato"
      aria-label="Solicitar orçamento"
      className="pt-12 sm:pt-16 pb-6 sm:pb-8 relative"
      style={{ background: "var(--c-canvas)" }}
    >
      <div className="px-4 sm:px-6">
        <div
          className="relative overflow-hidden px-4 sm:px-10 py-10 sm:py-14"
          style={{
            background: "var(--c-canvas)",
            borderRadius: "24px 24px 0 0",
          }}
        >
          {/* Border top com fade nas laterais */}
          <div
            aria-hidden="true"
            className="absolute top-0 inset-x-0 pointer-events-none"
            style={{
              height: 1,
              background: "rgba(255, 255, 255, 0.12)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          />
          {/* Border left com fade vertical */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 pointer-events-none"
            style={{
              width: 1,
              background: "rgba(255, 255, 255, 0.12)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 6%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 6%, black 100%)",
            }}
          />
          {/* Border right com fade vertical */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 right-0 pointer-events-none"
            style={{
              width: 1,
              background: "rgba(255, 255, 255, 0.12)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 6%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 6%, black 100%)",
            }}
          />

          {/* Degrade laranja só no topo */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: "55%",
              background:
                "linear-gradient(to bottom, rgba(255, 90, 42, 0.22) 0%, transparent 100%)",
            }}
          />

          <div
            className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_460px] lg:grid-rows-[auto_1fr] gap-10 lg:gap-14 items-start"
            style={{ maxWidth: 1280, margin: "0 auto" }}
          >
          {/* Coluna texto (topo) */}
          <div className="text-center lg:text-left lg:col-start-1 lg:row-start-1">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(32px, 5.4vw, 56px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--c-text-primary)",
                marginBottom: 18,
              }}
            >
              Pronto pra transformar seu evento?
            </motion.h2>
            <p
              className="mx-auto lg:mx-0"
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                color: "var(--c-text-secondary)",
                maxWidth: "50ch",
                marginBottom: 24,
              }}
            >
              Preenche o formulário ao lado ou chama direto no WhatsApp. A
              resposta vem em até 2h em horário comercial.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <ShinyButton
                href={whatsappUrl(WHATSAPP_MESSAGES.ctaDireto)}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                Falar agora no WhatsApp
              </ShinyButton>
            </div>

          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative px-4 sm:px-7 py-7 sm:py-8 lg:col-start-2 lg:row-start-1 lg:row-span-2"
            style={{
              background: "var(--c-surface)",
              border: "1px solid var(--c-line-strong)",
              borderRadius: 24,
            }}
          >
            <p
              className="text-center lg:text-left"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 22,
                color: "var(--c-text-primary)",
                marginBottom: 6,
              }}
            >
              Quero um orçamento
            </p>
            <p
              className="text-center lg:text-left"
              style={{
                fontSize: 13.5,
                color: "var(--c-text-mute)",
                marginBottom: 22,
              }}
            >
              Preenche que mandamos as opções e o valor no WhatsApp.
            </p>

            <Field label="Seu nome" required>
              <input
                type="text"
                required
                value={form.nome}
                onChange={(e) => update("nome", e.target.value)}
                placeholder="Como podemos te chamar"
                className="w-full"
                style={inputStyle}
              />
            </Field>

            <Field label="WhatsApp" required>
              <input
                type="tel"
                required
                value={form.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
                placeholder="(51) 99999-9999"
                className="w-full"
                style={inputStyle}
              />
            </Field>

            <Field label="Tipo de evento" required>
              <select
                required
                value={form.tipo}
                onChange={(e) => update("tipo", e.target.value)}
                className="w-full"
                style={selectStyle}
              >
                {tiposEvento.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Data prevista">
              <input
                type="date"
                value={form.data}
                onChange={(e) => update("data", e.target.value)}
                className="w-full"
                style={inputStyle}
              />
            </Field>

            <Field label="Conta um pouco mais (opcional)">
              <textarea
                value={form.mensagem}
                onChange={(e) => update("mensagem", e.target.value)}
                placeholder="Local, número de convidados, equipamentos que tem interesse..."
                rows={3}
                className="w-full resize-none"
                style={{ ...inputStyle, paddingTop: 10 }}
              />
            </Field>

            <div className="mt-2 [&>button]:w-full">
              <ShinyButton type="submit">
                Enviar pelo WhatsApp
              </ShinyButton>
            </div>
          </motion.form>

          {/* Instagram — embaixo (mobile) / coluna esquerda abaixo do texto (desktop) */}
          <div
            className="pt-8 flex justify-center lg:justify-start lg:col-start-1 lg:row-start-2"
            style={{ borderTop: "1px solid var(--c-line)" }}
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 no-underline transition-opacity hover:opacity-80"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                style={{ color: "var(--c-text-secondary)" }}
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span
                style={{
                  fontSize: 15,
                  color: "var(--c-text-primary)",
                  fontFamily: "var(--font-geist)",
                }}
              >
                {INSTAGRAM_HANDLE}
              </span>
            </a>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--c-canvas)",
  border: "1px solid var(--c-line)",
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 14,
  color: "var(--c-text-primary)",
  fontFamily: "var(--font-geist)",
  outline: "none",
  width: "100%",
  minWidth: 0,
  maxWidth: "100%",
  boxSizing: "border-box",
  // renderiza os controles nativos (placeholder do type=date, seta do
  // select) em tons claros sobre o fundo escuro.
  colorScheme: "dark",
  // CRÍTICO p/ iOS Safari: sem resetar o appearance, o iPhone ignora
  // width:100% no <input type=date> e no <select> e usa a largura
  // intrínseca nativa — que vaza pra fora do card. No Chrome/Android não
  // acontece, por isso o bug só aparecia no iPhone.
  WebkitAppearance: "none",
  appearance: "none",
};

// O select perde a seta nativa ao zerar o appearance — devolvemos uma seta
// própria (chevron) como background, mantendo o controle dentro do card.
const selectStyle: React.CSSProperties = {
  ...inputStyle,
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  paddingRight: 40,
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const id = useId();
  // associa o <label> ao controle injetando o mesmo id (sem mudar o layout)
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<{ id?: string }>, { id })
    : children;

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-1.5"
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "var(--c-text-secondary)",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--c-orange)", marginLeft: 4 }}>*</span>
        )}
      </label>
      {control}
    </div>
  );
}
