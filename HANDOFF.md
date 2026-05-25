# Kangaroo Totens — handoff (2026-05-25)

Estado do site institucional Kangaroo. Próxima sessão, leia este arquivo logo de cara.

> **Tracking obrigatório:** ler também `PROJECT_METRICS.md` no início de cada sessão. Registrar timestamp de início ao começar e fechar a sessão com fim + duração + tokens estimados + foco. Estimativa de tokens fica por minha conta (Claude) — base ~4 chars/token. Continua até o projeto ser finalizado.

## Stack

- Next.js 16.2.6 (App Router) + React 19 + TypeScript
- Tailwind v4 + custom CSS vars (`--c-canvas`, `--c-orange`, `--c-surface`...)
- framer-motion v12.40.0
- WebGL: ogl (Grainient), three.js (MagicRings, LightRays)
- @tsparticles/react (Sparkles em Depoimentos)
- shadcn primitives instaladas: accordion, dialog, navigation-menu, slot
- lucide-react para ícones

## Estrutura de seções (page.tsx)

Header → Hero → LogoBar → Equipamentos → Diferenciais → ComoFunciona → Depoimentos → TiposDeEvento → FAQ → CTA → Footer → WhatsAppFloat

## Identidade visual

- Dark mode, paleta laranja `#FF5A2A` minimal (não exagerar)
- Tipografia: Bricolage Grotesque (display) / Geist (sans) / Geist Mono (numbers + eyebrows)
- Eyebrows uppercase mute 13px tracking-wide (NÃO usar pill chips, padronizado)
- Headlines com `TextReveal` (palavra-por-palavra, blur 8px → 0)
- `BorderGlow` + `Brackets` em cards de destaque
- Border-radius: 16px cards, 24px containers, full em pills/buttons, 10px em items pequenos
- Sem em-dash em copy (`—` é tell de IA)

## Última coisa feita (Equipamentos · cards de produto)

- **6 produtos** (Totem Carregador removido do carousel, Header dropdown, ComoFunciona stack list e Footer link list).
- **Imagens reais do cliente** copiadas pra `public/images/equipamentos/`: totem-fotografico, plataforma-360, plataforma-180, cabine-fotografica, cabine-premios, audio-book (.webp).
- **Hierarquia do card redesenhada** em `src/components/ui/feature-carousel.tsx`:
  - Topo: "EM AÇÃO" indicator (esquerda) + badge `01 · FOTO NA HORA` (direita) — antes badge ficava embaixo, agora juntos no topo.
  - Bottom: `<h3>` Nome do produto grande (display, 700, clamp 22-30px) → descrição menor (geist, 13-14.5px, opacity 75) com gradient mais escuro.
- **Headline da seção:** "Sete formas..." → "Seis formas de transformar seu evento."

## Histórico anterior (Footer + Mobile padding)

- **FlickeringGrid removido** do Footer (peso) — arquivo `src/components/ui/flickering-grid.tsx` deletado.
- **Footer compactado:** `mt-14 pt-6` da linha de créditos virou `mt-8 pt-5`, gap-y das colunas `10` → `8`. Adicionado `paddingBottom: 24` (antes só tinha grid embaixo).
- **Padding mobile padronizado em todas as seções:** `px-4 sm:px-6` (16px mobile = 1em, 24px desktop ≥640). Aplicado em: Header, LogoBar, Equipamentos, Diferenciais, ComoFunciona, Depoimentos, TiposDeEvento, FAQ, CTA, Footer.
- **CTA card interno:** `padding: "56px 40px"` → `px-4 sm:px-10 py-10 sm:py-14`. Form box: `32px 28px` → `px-4 sm:px-7 py-7 sm:py-8`.
- **TiposDeEvento card BorderGlow:** `padding: "64px 24px"` → `px-4 sm:px-6` + `py-16` inline.

## Pendências (em ordem)

1. **#18 harden** — aria-describedby nos campos do form CTA, skip-to-content já tem
2. **#21 typeset** — reduzir mono pra só números (passar eyebrows pra Geist sans)
3. **#22 polish** — final pass + `npx tsc --noEmit` + `next build`
4. **Otimização pré-deploy:**
   - `next/image` em TODA `<img>` restante (Header logo, Footer logo)
   - `dynamic(() => import('...'), { ssr: false })` em: Grainient, MagicRings, LightRays, Sparkles
   - `next.config.ts`: `images: { formats: ['image/avif', 'image/webp'] }`
   - `next build --analyze` pra inspecionar bundle
5. **#12 Deploy Vercel** — cliente ainda sem domínio nem CNPJ, vai mandar logos reais depois (Record, H&M, Bauducco)

## Bundle esperado

- Sem otimização: 800KB-1.2MB gz, Lighthouse mobile 55-70
- Com otimização completa: 250-350KB gz inicial, Lighthouse 85-92 mobile / 95-99 desktop

## Memórias relevantes (em `~/.claude/projects/-Users-user/memory/`)

- `feedback_frontend_quality.md` — padrões críticos (1280px, eyebrows, etc)
- `feedback_no_em_dash.md` — proibido em-dash em copy
- `feedback_never_invent.md` — receber referência = copiar fiel
- `feedback_deliver_fast.md` — entregar no 1º movimento útil
- `project_eliane_reference_build.md` — blueprint Track 1 Next.js
- `reference_claude_mem.md` — atenção: claude-mem desabilitou auto-memory built-in, ler MEMORY.md manualmente se faltar contexto

## Comandos úteis

```bash
cd /Users/user/site-builder-upscalead/cliente-kangaroo/site
npm run dev                # localhost:3001 (3000 pode estar ocupado)
npx tsc --noEmit           # type check
npm run build              # production build
ANALYZE=true npm run build # com bundle analyzer (precisa setup)
```

## Cliente

- Empresa: Kangaroo Totens (totens fotográficos pra eventos)
- Localização: Porto Alegre · RS
- WhatsApp: (51) 99675-2150 → `https://wa.me/5551996752150`
- Instagram: @kangaroo.totens
- Sem domínio próprio ainda, sem CNPJ
