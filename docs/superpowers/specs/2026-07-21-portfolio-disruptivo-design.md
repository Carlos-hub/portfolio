# Portfolio Disruptivo — Carlos de Lara — Design

**Data:** 2026-07-21
**Autor:** Carlos Miguel de Lara (`Carlos-hub`)
**Objetivo:** Site de portfolio "disruptivo" (visual ousado + dados de repos ao vivo) que serve como porta de entrada para novos clientes freelance. CTA principal: WhatsApp.

---

## 1. Objetivo & sucesso

- Impacto visual imediato ("uau") que diferencia de portfolios template.
- Prova social automática via dados do GitHub ao vivo (não depende de stars — todos os repos estão em ★0).
- Converter visitante em conversa via **WhatsApp** com mensagem pré-preenchida.
- **Sucesso:** visitante entende em <10s o que Carlos faz, vê projetos reais no ar, e tem 1 clique óbvio pra iniciar conversa.

## 2. Stack & arquitetura

- **Next.js (App Router) + TypeScript**, deploy na **Vercel**.
- **Tailwind CSS** para estilização.
- **Framer Motion** para animações de scroll/hover; **shader/canvas** leve no hero (WebGL apenas se performar bem; fallback CSS/grid animado).
- Dados do GitHub via **Server Components + `fetch` com ISR** (`next: { revalidate: 3600 }`).
  - Lista geral: `GET users/Carlos-hub/repos?per_page=100&sort=updated`.
  - Destaques: `GET repos/Carlos-hub/{repo}` para metadados detalhados (linguagem, `pushed_at`, homepage).
  - Opcional mas recomendado: `GITHUB_TOKEN` em variável de ambiente da Vercel para subir o rate limit (5000/h) e estabilidade. Sem token, funciona no limite server-side (60/h por IP do build/edge) — aceitável com ISR de 1h.
- **Cor de acento:** verde-neon sobre canvas dark, alto contraste, 1 acento só.

## 3. Data flow

```
Build/ISR (server) → GitHub API → normaliza → cache (revalidate 3600s)
                                              → render Server Components
Cliente → HTML já com dados (sem fetch no browser) → animações client-side (Framer Motion)
```

- Camada de dados isolada em `lib/github.ts`:
  - `getRepos()` → lista normalizada.
  - `getFeaturedProjects()` → funde metadados ao vivo com as descrições curadas (abaixo).
  - `getPulseStats()` → agrega: total de repos, breakdown de linguagens, dias desde último commit, nº de projetos com demo no ar.
- Tipos em `lib/types.ts`. Descrições curadas em `lib/featured.ts` (fonte da verdade para textos e ordem).

## 4. Seções (single page, scroll)

1. **Hero** — nome + "Fullstack Developer", tipografia gigante, fundo animado reativo ao mouse. CTA WhatsApp primário.
2. **GitHub Pulse** — stats ao vivo: barra de linguagens, contagem de repos, "último commit há X dias", nº de projetos no ar.
3. **Projetos em destaque** — 6 cards; cada um mostra descrição curada + badge de linguagem e "atualizado há X" puxados ao vivo; botões Demo (quando existe) e Código.
4. **Atividade recente** — grid menor com repos recentes (2026) puxados ao vivo, ordenados por `pushed_at`.
5. **Serviços** — do README: sites/sistemas sob medida, landing pages de alta conversão, apps mobile, consultoria técnica.
6. **Contato** — WhatsApp principal (msg pré-preenchida), e-mail e LinkedIn secundários.

## 5. Projetos em destaque (curados)

Ordem e textos são fonte da verdade em `lib/featured.ts`. Metadados (linguagem, último commit) vêm ao vivo; se a API falhar, usa fallback estático.

| # | Repo | Título exibido | Descrição | Demo |
|---|------|----------------|-----------|------|
| 1 | `planejai-trilha` | PlanejAI + Trilha | Planejador de aulas alinhado à BNCC com IA — gera plano de aula + trilha de estudo gamificada (quiz autocorrigido, acesso por código) num clique. MVP Hackathon FIAP. | — (só código) |
| 2 | `ignite-lab-eventPlatform` | Ignite Lab Event | Plataforma de evento online: inscrição, agenda dinâmica e player de vídeo integrado. | Vercel |
| 3 | `Pouca-carne` (+ `serveless-pouca-carne`) | Pouca Carne | Sistema fullstack para restaurante vegano (TCC): pedidos, clientes, entregadores e painel admin. | Vercel |
| 4 | `codeFlix-front` | CodeFlix | Interface estilo streaming (Netflix-like) em Next.js. | Vercel |
| 5 | `devEvolution` | devEvolution | API de delivery de produtos/pedidos, com rotas documentadas em Swagger. | Railway |
| 6 | `nlw-return` | NLW Return | Widget de feedback (bug/ideia/elogio) com captura de screenshot. | Vercel |

## 6. Conteúdo fixo

- **Nome:** Carlos Miguel de Lara
- **Papel:** Desenvolvedor Fullstack / Freelancer
- **WhatsApp:** (49) 99111-7061 → link `https://wa.me/5549991117061?text=<msg pré-preenchida>`
- **E-mail:** delaracarlosmiguel@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/carlos-hub/
- **GitHub:** https://github.com/Carlos-hub

## 7. Tratamento de erros & fallback

- GitHub API indisponível ou rate-limited → usa último cache do ISR; se cache vazio (primeiro build falho), usa dados estáticos embutidos em `lib/featured.ts` (linguagem/descrição). Site **nunca** quebra por causa da API.
- Repo destaque sem `homepage` → esconde botão "Demo", mostra só "Código".
- Atividade recente filtra forks e (opcional) repos sem descrição.

## 8. Testes / verificação

- Unit: `lib/github.ts` normalização e agregação de `getPulseStats` com fixtures de resposta da API (incluindo caso de erro/rate-limit → fallback).
- Build/lint: `next build` + `tsc --noEmit` limpos.
- Verificação manual: rodar `next dev`, conferir hero, pulse com números reais, 6 destaques com badge ao vivo, CTA WhatsApp abre chat com msg, responsivo mobile.

## 9. Fora de escopo (YAGNI)

- Sem CMS/backend próprio. Sem form de contato (WhatsApp resolve). Sem blog. Sem i18n (só pt-BR). Sem autenticação.

## 10. Limpeza do repo atual

- Substituir `index.html`/`script.js` (projeto escolar Postech antigo) pela app Next.js. `README.md` do repo é reescrito para descrever o portfolio.
