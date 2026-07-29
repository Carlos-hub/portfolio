# Portfolio — Carlos de Lara

Portfolio pessoal de desenvolvedor fullstack freelancer. Single-page em
Next.js com dados dos repositórios do GitHub puxados ao vivo (ISR) e CTA
direto para WhatsApp.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Vitest

## Rodando local

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Variáveis de ambiente (opcional)

Copie `.env.example` para `.env.local`.

- `GITHUB_TOKEN` — sobe o rate limit da API do GitHub de 60/h para 5000/h. Sem
  token, o site funciona normalmente (fetch com cache ISR de 1h).
- `NEXT_PUBLIC_SITE_URL` — URL canônica. Default:
  `https://www.carlosmiguel.dev.br`. Defina em previews/domínios alternativos
  para não gerar canonical/sitemap apontando para produção.

## SEO e descoberta por IA

Tudo é gerado no servidor a partir de `lib/site.ts`, `lib/services.ts` e
`lib/faq.ts` — uma fonte só, sem duplicação:

- `app/robots.txt/route.ts` → `/robots.txt` com allow explícito para crawlers de
  busca e de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…), sitemap e
  diretivas `Content-Signal` (contentsignals.org): `search=yes, ai-input=yes,
  ai-train=yes`. Mude ali se quiser negar treinamento.
- `app/sitemap.ts` → `/sitemap.xml` (home + âncoras de seção).
- `app/llms.txt/route.ts` → `/llms.txt`, digest em texto puro (serviços,
  projetos com dados ao vivo, FAQ, contato) para LLMs que não executam JS.
- `lib/schema.ts` → JSON-LD num `@graph` com `@id` estáveis: Person, WebSite,
  WebPage, ProfessionalService (+OfferCatalog), ItemList de projetos
  (SoftwareSourceCode) e FAQPage.
- `app/opengraph-image.tsx` / `app/icon.tsx` → OG image 1200×630 e favicon
  gerados no build; `app/manifest.ts` → webmanifest.
- Metadata: canonical, keywords, OG/Twitter, `max-image-preview:large`,
  `lang="pt-BR"`, um único `h1` com as palavras-chave.
- Conteúdo indexável sem JS: reveals do Framer Motion têm fallback
  (`[data-reveal]` em `<noscript>` e em `prefers-reduced-motion`).

### Interfaces para agentes

- **Link headers (RFC 8288)** — a home responde com `Link:` apontando para
  `api-catalog`, `alternate` (markdown), `service-desc`, `service-doc`,
  `sitemap`, `manifest`, `canonical` e `author`. Configurado em
  `next.config.ts`; títulos em ASCII porque header HTTP é ASCII.
- **`/.well-known/api-catalog`** (RFC 9727) — linkset JSON com todas as
  representações machine-readable do site.
- **Markdown for Agents** — `middleware.ts` devolve markdown na home quando o
  request manda `Accept: text/markdown` (browser, que pede `text/html`, segue
  recebendo HTML). Resposta com `Content-Type: text/markdown`, `Vary: Accept` e
  `x-markdown-tokens`. Versão cacheável e direta em `/index.md`.
- `lib/markdown.ts` é a fonte de `/llms.txt` e `/index.md` — um texto só.

### DNS-AID

Precisa de acesso ao DNS, não dá pra resolver no repo: registros e comandos de
verificação em [`docs/dns-aid.md`](docs/dns-aid.md).

Depois do deploy: verificar o domínio no Google Search Console e no Bing
Webmaster Tools e enviar `/sitemap.xml`.

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm test` — testes unitários da camada de dados
- `npm run typecheck` — checagem de tipos

## Deploy

Deploy na Vercel: importe o repositório e (opcional) adicione `GITHUB_TOKEN`
nas Environment Variables. Sem configuração extra.
