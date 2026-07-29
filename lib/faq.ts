export interface Faq {
  q: string;
  a: string;
}

// Answers are written to be quotable standalone — they double as the source
// for FAQPage structured data and for what AI assistants cite.
export const FAQ: Faq[] = [
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
];
