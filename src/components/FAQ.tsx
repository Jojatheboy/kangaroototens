"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "A Kangaroo atende fora de Porto Alegre?",
    answer:
      "Atendemos toda Porto Alegre e região metropolitana. Para eventos mais distantes (litoral, interior, serra), pedimos um adicional de deslocamento que é informado direto no orçamento.",
  },
  {
    question: "Com quanto tempo de antecedência preciso contratar?",
    answer:
      "O ideal é fechar com 30 a 60 dias antes do evento, principalmente em alta temporada (novembro a março). Em datas mais tranquilas conseguimos atender em prazos menores. Sempre vale chamar pra confirmar disponibilidade.",
  },
  {
    question: "Quantas fotos os convidados podem tirar?",
    answer:
      "Em todos os equipamentos, fotos e vídeos são ilimitados durante o tempo contratado. A impressão também é ilimitada nos pacotes padrão, então cada convidado leva quantas quiser.",
  },
  {
    question: "Preciso ter internet no local do evento?",
    answer:
      "Não. Trabalhamos com nossa própria estrutura de rede pra envio digital e backup das fotos. Internet do local é bem-vinda, mas não obrigatória.",
  },
  {
    question: "Vocês entregam os arquivos depois?",
    answer:
      "Sim. Todo arquivo digital fica disponível em galeria online no dia seguinte ao evento. Cliente recebe link e pode compartilhar com convidados. Arquivos ficam disponíveis por 60 dias.",
  },
  {
    question: "Como funciona a personalização da moldura?",
    answer:
      "Você nos envia logo, tema do evento, paleta ou referências visuais. Nossa equipe cria 2 ou 3 propostas de moldura pra você escolher, e ainda dá pra ajustar até a versão final. Sem custo extra na maioria dos pacotes.",
  },
  {
    question: "E se algum equipamento der defeito durante o evento?",
    answer:
      "Sempre trabalhamos com backup. Nosso operador fica no local durante todo o evento e tem peças e equipamentos reserva. Em 100+ eventos não tivemos uma única interrupção significativa.",
  },
  {
    question: "Qual a forma de pagamento?",
    answer:
      "Trabalhamos com sinal (30 a 50% pra travar a data) + saldo na semana do evento. Aceitamos PIX, transferência e cartão (com parcelamento). Combinamos tudo direto com você no orçamento.",
  },
];

export function FAQ() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(FAQS[0].question);

  const filtered = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="faq" aria-label="Perguntas frequentes" className="pt-10 sm:pt-14 pb-10 sm:pb-14">
      <div
        className="px-4 sm:px-6"
        style={{
          maxWidth: 1220,
          margin: "0 auto",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 lg:mb-0 lg:w-[340px] shrink-0"
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(36px, 6vw, 52px)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "var(--c-text-primary)",
              }}
            >
              Perguntas
              <br />
              frequentes.
            </h2>
            <p
              className="mt-4"
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--c-text-secondary)",
                maxWidth: 300,
              }}
            >
              Não achou sua dúvida? Chama no WhatsApp que respondemos rápido.
            </p>

            <div className="relative mt-6">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--c-text-mute)" }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Buscar pergunta..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md py-3 pl-10 pr-4 outline-none transition-colors"
                style={{
                  border: "1px solid var(--c-line)",
                  background: "var(--c-surface)",
                  color: "var(--c-text-primary)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 13,
                }}
              />
            </div>
          </motion.div>

          <div className="flex-1">
            {filtered.length === 0 ? (
              <p
                className="py-12 text-center"
                style={{ color: "var(--c-text-secondary)", fontSize: 15 }}
              >
                Nenhuma pergunta encontrada. Fale com a Kangaroo no WhatsApp.
              </p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {filtered.map((faq, idx) => {
                  const isOpen = open === faq.question;
                  return (
                    <motion.div
                      key={faq.question}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="rounded-2xl overflow-hidden transition-colors duration-300"
                      style={{
                        background: isOpen
                          ? "var(--c-surface)"
                          : "rgba(26, 18, 11, 0.45)",
                        border: isOpen
                          ? "1px solid rgba(255, 90, 42, 0.35)"
                          : "1px solid var(--c-line)",
                      }}
                    >
                      <button
                        onClick={() =>
                          setOpen(isOpen ? null : faq.question)
                        }
                        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left transition-colors"
                        style={{
                          background: "none",
                          border: "none",
                          padding: "18px 20px",
                          fontSize: 16,
                          fontWeight: 600,
                          color: "var(--c-text-primary)",
                          lineHeight: 1.4,
                          fontFamily: "var(--font-display)",
                          letterSpacing: "-0.01em",
                        }}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <span
                          className="inline-flex items-center justify-center shrink-0 rounded-full"
                          style={{
                            width: 28,
                            height: 28,
                            background: isOpen
                              ? "var(--c-orange)"
                              : "rgba(255, 90, 42, 0.12)",
                            border: isOpen
                              ? "none"
                              : "1px solid rgba(255, 90, 42, 0.3)",
                            transition: "background 0.3s ease",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              transform: isOpen
                                ? "rotate(45deg)"
                                : "rotate(0deg)",
                              transition:
                                "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                              color: isOpen
                                ? "var(--c-ink)"
                                : "var(--c-orange)",
                            }}
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.32,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ overflow: "hidden" }}
                          >
                            <p
                              className="px-5 pb-5"
                              style={{
                                fontSize: 15,
                                lineHeight: 1.65,
                                color: "var(--c-text-secondary)",
                                maxWidth: "65ch",
                              }}
                            >
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
