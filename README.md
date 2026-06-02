# Kangaroo Totens — site institucional

Site one-page da **Kangaroo Totens** (totens fotográficos e equipamentos
interativos para eventos em Porto Alegre/RS). Landing de conversão: o objetivo
de toda seção é levar o visitante ao WhatsApp para pedir orçamento.

Desenvolvido pela **[Upscalead](https://upscaleadstudio.com)**.

---

## Stack

| Camada      | Tecnologia |
|-------------|------------|
| Framework   | Next.js 16.2.6 — App Router + Turbopack |
| UI          | React 19 + TypeScript 5 |
| Estilo      | Tailwind CSS v4 (via `@tailwindcss/postcss`) + CSS custom properties |
| Animação    | framer-motion 12 |
| Ícones      | lucide-react |
| Primitivos  | Radix UI (accordion, dialog, navigation-menu) + shadcn-style wrappers |
| Utilitários | clsx, tailwind-merge, class-variance-authority, tw-animate-css |

Fontes (via `next/font/google`, em `src/app/layout.tsx`):
- **Bricolage Grotesque** — display (títulos)
- **Geist** — texto corrido
- **Geist Mono** — números, eyebrows e detalhes

---

## Como rodar

Pré-requisito: Node 18+.

```bash
npm install        # instala dependências
npm run dev        # ambiente local em http://localhost:3000
npm run build      # build de produção (minifica JS/CSS automaticamente)
npm run start      # serve o build de produção
npm run lint       # ESLint
npx tsc --noEmit   # checagem de tipos
```

> A minificação do bundle é feita pelo Next/SWC no `build`. O código-fonte é
> mantido legível de propósito — não minifique os arquivos em `src/`.

---

## Estrutura

```
src/
├── app/
│   ├── layout.tsx        # <html>, fontes, metadata/SEO, skip-link, Loader
│   ├── page.tsx          # ordem das seções (monta a página)
│   ├── globals.css       # design tokens (:root), reset, keyframes, base
│   └── favicon / icons
├── components/           # uma seção da página por arquivo (ver abaixo)
│   └── ui/               # primitivos reutilizáveis (botões, accordion, etc.)
├── lib/
│   ├── site.ts           # contato + mensagens de WhatsApp centralizados
│   ├── section-styles.ts # estilos compartilhados de eyebrow/título/lead
│   └── utils.ts          # helper cn() (clsx + tailwind-merge)
public/
├── images/{equipamentos,eventos,hero-wall,logos}/   # .webp / .jpg
└── videos/                                           # .mp4 + poster .webp
```

### Ordem das seções (`src/app/page.tsx`)

`Header → Hero → LogoBar → Equipamentos → Diferenciais → ComoFunciona →
Depoimentos → TiposDeEvento → FAQ → CTA → Footer → WhatsAppFloat`

| Componente            | O que é |
|-----------------------|---------|
| `Header`              | Topo fixo (vira "ilha" ao rolar); nav desktop + menu mobile (sheet) |
| `Hero`                | Headline com palavra rotativa + parede de mídia (`HeroGallery`) |
| `LogoBar`             | Marquee de logos de clientes |
| `Equipamentos`        | Cabeçalho + `EquipamentosCarousel` (8 produtos, loop infinito) |
| `Diferenciais`        | 4 diferenciais com vídeos curtos |
| `ComoFunciona`        | 4 passos com mockups animados |
| `Depoimentos`         | Colunas de depoimentos; vira tema claro ao entrar na viewport |
| `TiposDeEvento`       | Carrossel de tipos de evento (Sociais, Corporativos, etc.) |
| `FAQ`                 | Perguntas frequentes em accordion (layout 2 colunas) |
| `CTA`                 | Formulário de orçamento que abre o WhatsApp preenchido |
| `Footer`              | Links, wordmark gigante e crédito da Upscalead |
| `WhatsAppFloat`       | Botão flutuante fixo |
| `Loader`              | Cortina de carregamento inicial |
| `Reveal`              | Wrapper de animação fade-up reutilizável |
| `RelatorioMock`       | Mock visual do relatório pós-evento |

---

## Convenções

**Cores e espaçamento — sempre via tokens** (definidos em `src/app/globals.css`):
- Fundo `var(--c-canvas)`, superfícies `var(--c-surface)` / `--c-surface-2`
- Tinta escura (texto sobre laranja, overlays) `var(--c-ink)` — translúcido com
  `rgba(var(--c-ink-rgb), α)`
- Marca `var(--c-orange)`; texto `var(--c-text-primary|secondary|mute)`
- Padding lateral padrão das seções: `px-4 sm:px-6`

**Cabeçalho de seção** — use os estilos de `src/lib/section-styles.ts`
(`eyebrowStyle`, `sectionTitleStyle`, `sectionLeadStyle`). O eyebrow é texto
em maiúsculas mute (sem "pill chip").
> Exceção consciente: `FAQ` usa um título grande próprio (layout de 2 colunas)
> e por isso não segue `sectionTitleStyle`.

**WhatsApp** — nunca escreva o número ou a URL na mão. Importe de
`@/lib/site` (ver seção abaixo).

**Imagens** — use `next/image` em conteúdo. As poucas `<img>` cruas restantes
são logos SVG (com `eslint-disable` explícito).

**Copy** — sem em-dash (`—`) no texto voltado ao usuário.

---

## WhatsApp centralizado (`src/lib/site.ts`)

Toda comunicação passa por esse arquivo. Para trocar o número, edite
`WHATSAPP_NUMBER`. Para ajustar o texto de um botão, edite `WHATSAPP_MESSAGES`.

- `WHATSAPP_NUMBER` — `5551996752150` = 55 (Brasil) + 51 (DDD POA) + assinante
- `whatsappUrl(msg?)` — monta o link `wa.me` com a mensagem codificada
- `WHATSAPP_MESSAGES` — mensagem pré-preenchida por contexto:
  `header`, `hero`, `ctaDireto`, `eventos`, `flutuante`, `default`
- `produtoMessage(nome)` — mensagem por equipamento (cards do carrossel)

Assim cada botão abre o WhatsApp com um texto que já diz de onde veio o lead.

---

## Deploy

Hospedado na **Vercel**, conectada ao repositório GitHub
`Jojatheboy/kangaroototens`. Push na branch `main` dispara o deploy de
produção automaticamente.

`next.config.ts` fixa a raiz do Turbopack neste diretório e habilita imagens
em AVIF/WebP.

---

## Cliente

- **Kangaroo Totens** — Porto Alegre · RS
- WhatsApp: (51) 99675-2150
- Instagram: [@kangaroo.totens](https://instagram.com/kangaroo.totens)
