import type { Locale, Localized } from "./i18n";

export interface Faq {
  q: string;
  a: string;
}

// Answers are written to be quotable standalone — they double as the source
// for FAQPage structured data and for what AI assistants cite.
export const FAQ: Localized<Faq[]> = {
  pt: [
    {
      q: "Que tipo de projeto o Carlos desenvolve?",
      a: "Sites institucionais, landing pages, sistemas web fullstack (com banco de dados, API e painel administrativo) e aplicativos mobile Android e iOS. A linguagem e a stack são definidas pelo projeto — trabalho em qualquer uma, inclusive dando continuidade a um código que já existe.",
    },
    {
      q: "Como funciona o orçamento?",
      a: "O contato é direto pelo WhatsApp. A primeira conversa é gratuita e sem compromisso: entendo o escopo, prazo e objetivo do projeto e envio uma proposta com valor fechado e etapas de entrega.",
    },
    {
      q: "Qual o prazo médio de entrega?",
      a: "Uma landing page fica pronta em cerca de 1 a 2 semanas. Sistemas web sob medida variam de 4 a 12 semanas, dependendo do escopo, e são entregues em incrementos para acompanhamento contínuo.",
    },
    {
      q: "Atende clientes de fora do Brasil ou de outras cidades?",
      a: "Sim. O trabalho é 100% remoto, para clientes de qualquer cidade do Brasil e do exterior, com atendimento em português e inglês.",
    },
    {
      q: "O código do projeto fica com o cliente?",
      a: "Sim. O cliente recebe o código-fonte completo e o repositório, junto com o deploy configurado (normalmente Vercel) e a documentação de como rodar e publicar o projeto.",
    },
  ],
  en: [
    {
      q: "What kind of projects does Carlos build?",
      a: "Company websites, landing pages, fullstack web systems (with a database, API and admin dashboard) and Android and iOS mobile apps. The language and stack are decided by the project — I work in any of them, including picking up a codebase that already exists.",
    },
    {
      q: "How does quoting work?",
      a: "Contact goes straight through WhatsApp. The first conversation is free and with no strings attached: I map out the scope, deadline and goal of the project and send back a proposal with a fixed price and delivery milestones.",
    },
    {
      q: "What is the average delivery time?",
      a: "A landing page takes about 1 to 2 weeks. Custom web systems run from 4 to 12 weeks depending on scope, and are delivered in increments so you can follow the progress the whole way.",
    },
    {
      q: "Do you take clients outside Brazil?",
      a: "Yes. The work is 100% remote, for clients anywhere in Brazil and abroad, with support in both Portuguese and English.",
    },
    {
      q: "Does the client own the project's code?",
      a: "Yes. The client gets the complete source code and the repository, along with the deploy already configured (usually Vercel) and documentation on how to run and publish the project.",
    },
  ],
};

export function faq(locale: Locale): Faq[] {
  return FAQ[locale];
}
