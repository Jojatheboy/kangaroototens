# Kangaroo Totens — handoff

Estado atual do site institucional. Para stack, estrutura e convenções, leia o
[`README.md`](./README.md) — este arquivo cobre só o que o README não cobre:
histórico recente e itens em aberto.

## Estado

- **Site no ar**, hospedado na Vercel (deploy automático no push da `main`).
- Build limpo: sem `console.log`, sem `TODO`, sem `any`, todos os `useEffect`
  com cleanup. `npm run build` e `npx tsc --noEmit` passam.
- Dados de equipamentos consistentes (8 produtos) entre Header, carrossel e
  Footer.

## Última sessão — finalização para entrega

Passagem de limpeza e alinhamento para handoff:

- **WhatsApp por contexto**: mensagens centralizadas em `src/lib/site.ts`
  (`WHATSAPP_MESSAGES` + `produtoMessage`). Cada botão (header, hero, CTA
  direto, tipos de evento, flutuante, cards de produto) abre o WhatsApp com um
  texto próprio.
- **Crédito da agência**: "Desenvolvido pela Upscalead" + ícone no rodapé,
  linkando para `upscaleadstudio.com` (`src/components/ui/UpscaleadMark.tsx`).
- **Código morto removido**: componentes UI não usados (`button`, `card`,
  `input`, `textarea`, `OrganicBorder`), hook `use-mouse-position-ref`, imagem
  `cabine-fotografica.webp`, dependência órfã `@radix-ui/react-slot`, e tokens
  CSS de template (`--marketing-*`, easings, sparkles, `.halftone`).
- **Cor centralizada**: `#0F0906` (espalhado em ~14 lugares) virou o token
  `--c-ink` / `--c-ink-rgb`.
- **Eyebrows padronizados**: `Depoimentos` e `TiposDeEvento` passaram a usar
  `section-styles.ts` (o "pill chip" do TiposDeEvento virou eyebrow padrão).
- **Docs reescritas**: README e este HANDOFF refletindo o projeto real.

## Itens em aberto (do cliente)

- **Domínio próprio**: o cliente vai definir; ajustar `metadataBase`/OG quando
  houver domínio.
- **Logos de clientes**: trocar/atualizar arquivos em `public/images/logos/`
  conforme o cliente liberar novas marcas.

## Cliente

- Kangaroo Totens — Porto Alegre · RS
- WhatsApp: (51) 99675-2150 · Instagram: @kangaroo.totens
