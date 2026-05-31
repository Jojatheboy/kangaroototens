"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_BASE } from "@/lib/site";

const equipamentos = [
  { l: "Totem Fotográfico", h: "#equipamentos" },
  { l: "Totem Slim", h: "#equipamentos" },
  { l: "Plataforma 360°", h: "#equipamentos" },
  { l: "Plataforma 180°", h: "#equipamentos" },
  { l: "Cabine de Prêmios", h: "#equipamentos" },
  { l: "Cabine de Prêmios Pocket", h: "#equipamentos" },
  { l: "Totem de Carregamento", h: "#equipamentos" },
  { l: "Cabine Telefônica", h: "#equipamentos" },
];

const empresa = [
  { l: "Como funciona", h: "#como-funciona" },
  { l: "Eventos", h: "#eventos" },
  { l: "Depoimentos", h: "#depoimentos" },
  { l: "FAQ", h: "#faq" },
];

const contato = [
  { l: "(51) 99675-2150", h: WHATSAPP_BASE, external: true },
  {
    l: INSTAGRAM_HANDLE,
    h: INSTAGRAM_URL,
    external: true,
  },
];

const sections = [
  { title: "Equipamentos", items: equipamentos },
  { title: "Empresa", items: empresa },
  { title: "Contato", items: contato },
];

export function Footer() {
  return (
    <footer
      id="footer"
      style={{ background: "var(--c-canvas)" }}
      className="relative w-full overflow-hidden"
    >
      <div
        className="relative px-4 sm:px-6"
        style={{ maxWidth: 1280, margin: "0 auto", paddingTop: 24, paddingBottom: 24 }}
      >
        {/* Logo + tagline (sempre visível, em cima de tudo no mobile) */}
        <div className="mb-6 sm:mb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8 sm:gap-y-8">
          <div className="sm:row-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kangaroo-logo.svg"
              alt="Kangaroo"
              style={{
                height: 28,
                width: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
            <p
              className="mt-4"
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--c-text-mute)",
                maxWidth: 240,
              }}
            >
              Tecnologia interativa para eventos em Porto Alegre e região. Cada
              clique vira lembrança.
            </p>
          </div>

          {/* DESKTOP: colunas */}
          {sections.map((s) => (
            <div key={s.title} className="hidden sm:block">
              <FooterColumn title={s.title} items={s.items} />
            </div>
          ))}
        </div>

        {/* MOBILE: accordions */}
        <nav aria-label="Navegação do rodapé" className="sm:hidden">
          <Accordion
            type="single"
            collapsible
            variant="ghost"
            className="w-full max-w-none"
          >
            {sections.map((s) => (
              <AccordionItem
                key={s.title}
                value={s.title}
                variant="ghost"
                className="border-b border-white/[0.06] last:border-b-0"
              >
                <AccordionTrigger
                  variant="ghost"
                  className="hover:no-underline py-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[color:var(--c-text-mute)]"
                >
                  {s.title}
                </AccordionTrigger>
                <AccordionContent variant="ghost" className="pt-0">
                  <ul className="flex flex-col gap-2 pb-3" style={{ fontSize: 13.5 }}>
                    {s.items.map((a) => {
                      const external = (a as { external?: boolean }).external;
                      return (
                        <li key={a.l}>
                          <a
                            href={a.h}
                            {...(external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="no-underline"
                            style={{
                              color: "var(--c-text-secondary)",
                              opacity: 0.8,
                            }}
                          >
                            {a.l}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </nav>

        <div
          className="mt-6 sm:mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 11,
              color: "var(--c-text-mute)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Kangaroo Totens · Porto Alegre · RS
          </p>
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 11,
              color: "var(--c-text-mute)",
              letterSpacing: "0.04em",
            }}
          >
            Eternizando suas lembranças em um clique.
          </p>
        </div>
      </div>

      {/* Wordmark gigante outline — só as linhas (estático) */}
      <div
        aria-hidden="true"
        className="relative w-full overflow-hidden mt-10 sm:mt-14 pointer-events-none select-none"
      >
        <div
          className="flex items-end justify-center leading-[0.78] kangaroo-wordmark"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "min(23vw, 520px)",
            letterSpacing: "-0.055em",
            color: "transparent",
            whiteSpace: "nowrap",
            transform: "translateY(20%)",
            WebkitTextStrokeWidth: "1.5px",
          }}
        >
          kangaroo
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { l: string; h: string; external?: boolean }[];
}) {
  return (
    <nav aria-label={title}>
      <h4
        className="mb-4"
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "var(--c-text-mute)",
        }}
      >
        {title}
      </h4>
      <ul className="space-y-2.5" style={{ fontSize: 13.5 }}>
        {items.map((a) => (
          <li key={a.l}>
            <a
              href={a.h}
              {...(a.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="no-underline transition-opacity hover:opacity-100"
              style={{
                color: "var(--c-text-secondary)",
                opacity: 0.75,
              }}
            >
              {a.l}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
