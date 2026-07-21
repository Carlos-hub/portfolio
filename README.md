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

Copie `.env.example` para `.env.local`. Definir `GITHUB_TOKEN` sobe o rate
limit da API do GitHub de 60/h para 5000/h. Sem token, o site funciona
normalmente (fetch com cache ISR de 1h).

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm test` — testes unitários da camada de dados
- `npm run typecheck` — checagem de tipos

## Deploy

Deploy na Vercel: importe o repositório e (opcional) adicione `GITHUB_TOKEN`
nas Environment Variables. Sem configuração extra.
