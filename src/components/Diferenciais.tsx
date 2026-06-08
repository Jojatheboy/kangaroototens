"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Share2, Users, BarChart3 } from "lucide-react";

import { Reveal } from "./Reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  eyebrowStyle,
  sectionLeadStyle,
  sectionTitleStyle,
} from "@/lib/section-styles";
import { RelatorioMock } from "./RelatorioMock";

type Diferencial = {
  title: string;
  meta: string;
  description: string;
  icon: ReactNode;
  tags: string[];
  video?: string;
  poster?: string;
  mock?: "relatorio";
};

const items: Diferencial[] = [
  {
    title: "Engajamento real",
    meta: "fila no stand",
    description:
      "Cada totem é desenhado pra criar fila, fazer o público parar, interagir e compartilhar. O efeito não termina quando a foto sai da impressora.",
    icon: <Zap className="w-5 h-5" />,
    tags: ["Interação", "Conexão"],
    video: "/videos/engajamento.mp4",
    poster: "/videos/engajamento-poster.webp",
  },
  {
    title: "Pronto pra postar",
    meta: "vídeo e foto na hora",
    description:
      "Vídeo e foto saem na hora, com a sua moldura. O convidado já compartilha e leva alcance pro seu evento sem esforço.",
    icon: <Share2 className="w-5 h-5" />,
    tags: ["Na hora", "Redes"],
    video: "/videos/pronto-postar.mp4",
    poster: "/videos/pronto-postar-poster.webp",
  },
  {
    title: "Equipe especializada",
    meta: "montagem inclusa",
    description:
      "Chegamos antes, montamos com cuidado, operamos com sorriso e desmontamos sem você perceber. Suporte completo do briefing à última foto.",
    icon: <Users className="w-5 h-5" />,
    tags: ["Operação", "Suporte"],
    video: "/videos/equipe.mp4",
    poster: "/videos/equipe-poster.webp",
  },
  {
    title: "Relatório pós-evento",
    meta: "leads + métricas",
    description:
      "Métricas de engajamento, lista de leads e relatório completo depois de cada evento. Locadora nenhuma entrega isso.",
    icon: <BarChart3 className="w-5 h-5" />,
    tags: ["Métricas", "Leads"],
    mock: "relatorio",
  },
];

/* placeholder visual (trocável por imagem real depois) */
function Placeholder({ item }: { item: Diferencial }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 75% at 55% 40%, rgba(255,90,42,0.20) 0%, rgba(26,18,8,0.65) 45%, #0a0705 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 0.75px, transparent 0.75px)",
          backgroundSize: "6px 6px",
          opacity: 0.5,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-10 text-center">
        <div
          className="inline-flex items-center justify-center rounded-2xl [&_svg]:w-9 [&_svg]:h-9"
          style={{ width: 92, height: 92, background: "var(--c-orange)", color: "var(--c-ink)" }}
        >
          {item.icon}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: "-0.02em",
            color: "var(--c-text-primary)",
          }}
        >
          {item.title}
        </div>
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 11.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--c-text-mute)",
            border: "1px dashed rgba(255,255,255,0.22)",
            borderRadius: 999,
            padding: "7px 16px",
          }}
        >
          Imagem em breve
        </span>
      </div>
    </>
  );
}

/* vídeo do painel — loop mudo, sem controles, autoplay só ao entrar na tela */
function VideoPanel({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
      onContextMenu={(e) => e.preventDefault()}
      aria-hidden="true"
    />
  );
}

/* decide o visual do painel: vídeo (se houver) ou placeholder */
function Visual({ item }: { item: Diferencial }) {
  if (item.video) return <VideoPanel src={item.video} poster={item.poster} />;
  if (item.mock === "relatorio") return <RelatorioMock />;
  return <Placeholder item={item} />;
}

/* item da lista FIXA (esquerda) — ativo expande no lugar */
function ListItem({
  item,
  isActive,
  onClick,
}: {
  item: Diferencial;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left border-t transition-opacity duration-300"
      style={{
        borderColor: "rgba(255,255,255,0.10)",
        padding: "22px 0",
        opacity: isActive ? 1 : 0.4,
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center justify-center rounded-lg shrink-0 transition-colors duration-300 [&_svg]:w-5 [&_svg]:h-5"
          style={{
            width: 34,
            height: 34,
            background: isActive ? "var(--c-orange)" : "rgba(255,255,255,0.06)",
            color: isActive ? "var(--c-ink)" : "var(--c-text-secondary)",
          }}
        >
          {item.icon}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(22px, 2.4vw, 30px)",
            letterSpacing: "-0.02em",
            color: "var(--c-text-primary)",
          }}
        >
          {item.title}
        </h3>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                color: "var(--c-text-secondary)",
                paddingTop: 14,
                maxWidth: "42ch",
              }}
            >
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2" style={{ marginTop: 16 }}>
              {item.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 11,
                    color: "var(--c-text-secondary)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 999,
                    padding: "4px 11px",
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

/* painel da direita — rola normal (com espaço) e entra vindo da direita,
   menor e apagado, chegando/crescendo até centralizar */
function RightPanel({
  item,
  index,
  register,
  onActive,
}: {
  item: Diferencial;
  index: number;
  register: (i: number, el: HTMLDivElement | null) => void;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    register(index, ref.current);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) onActive(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, register, onActive]);

  return (
    <div ref={ref} className="min-h-[82vh] flex items-center">
      <motion.div
        initial={{ opacity: 0.18, x: "14%", scale: 0.93 }}
        whileInView={{ opacity: 1, x: "0%", scale: 1 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full rounded-[28px] overflow-hidden"
        style={{
          height: "min(78vh, 600px)",
          background: "var(--c-surface)",
        }}
      >
        <Visual item={item} />
      </motion.div>
    </div>
  );
}

export function Diferenciais() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const register = useCallback((i: number, el: HTMLDivElement | null) => {
    refs.current[i] = el;
  }, []);
  const onActive = useCallback((i: number) => {
    setActive((prev) => (prev === i ? prev : i));
  }, []);
  const scrollToPanel = (i: number) => {
    refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="diferenciais"
      aria-label="Por que escolher a Kangaroo"
      className="pt-10 sm:pt-14 pb-0"
      style={{ background: "var(--c-canvas)" }}
    >
      <div className="px-4 sm:px-6" style={{ maxWidth: 1220, margin: "0 auto" }}>
        <Reveal>
          <div className="text-center mx-auto" style={{ maxWidth: 760 }}>
            <p style={eyebrowStyle}>Por que Kangaroo</p>
            <TextReveal
              as="h2"
              text="Quatro coisas que mudam quando a Kangaroo está no seu evento."
              style={sectionTitleStyle}
            />
            <p style={sectionLeadStyle}>
              Engajamento, personalização, operação e dados. Não é só foto.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ——— DESKTOP: copy FIXA (esquerda) + mídia contida e centralizada (direita) ——— */}
      <div
        className="hidden lg:flex items-start mt-6 mx-auto px-6"
        style={{ maxWidth: 1220 }}
      >
        {/* esquerda: fixa, alinhada ao container */}
        <div
          className="sticky top-0 h-screen flex items-center shrink-0"
          style={{
            width: "40%",
            minWidth: 420,
            paddingRight: 48,
          }}
        >
          <div style={{ maxWidth: 460, width: "100%" }}>
            {items.map((item, i) => (
              <ListItem
                key={item.title}
                item={item}
                isActive={i === active}
                onClick={() => scrollToPanel(i)}
              />
            ))}
            <div
              className="mt-10"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 12,
                letterSpacing: "0.1em",
                color: "var(--c-text-mute)",
              }}
            >
              <span style={{ color: "var(--c-orange)" }}>0{active + 1}</span> / 0
              {items.length}
            </div>
          </div>
        </div>

        {/* direita: full-bleed até a borda da tela (sem borda = infinita) */}
        <div className="flex-1 flex flex-col">
          {items.map((item, i) => (
            <RightPanel
              key={item.title}
              item={item}
              index={i}
              register={register}
              onActive={onActive}
            />
          ))}
        </div>
      </div>

      {/* ——— MOBILE: empilhado ——— */}
      <div
        className="lg:hidden px-4 sm:px-6 mt-12 flex flex-col gap-8"
        style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
      >
        {items.map((item) => (
          <Reveal key={item.title}>
            <div
              className="rounded-3xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="relative w-full"
                style={
                  item.mock === "relatorio"
                    ? { height: 500, background: "var(--c-surface)" }
                    : { aspectRatio: "16 / 11", background: "var(--c-surface)" }
                }
              >
                <Visual item={item} />
              </div>
              <div className="p-6" style={{ background: "var(--c-surface)" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    color: "var(--c-text-primary)",
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--c-text-secondary)",
                  }}
                >
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 11,
                        color: "var(--c-text-secondary)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 999,
                        padding: "4px 11px",
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
