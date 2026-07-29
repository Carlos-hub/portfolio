import { SKILLS } from "@/lib/site";
import Section from "./Section";

export default function About() {
  return (
    <Section id="sobre" eyebrow="Quem faz" title="Sobre mim">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            Sou <strong className="text-fg">Carlos Miguel de Lara</strong>,
            desenvolvedor fullstack freelancer no Brasil. Trabalho 100% remoto
            para clientes de qualquer cidade — construindo sites, sistemas web
            sob medida, landing pages e aplicativos mobile.
          </p>
          <p>
            <strong className="text-fg">Não sou preso a uma linguagem.</strong>{" "}
            A stack é escolhida pelo que o projeto precisa — front-end,
            back-end, banco de dados, API, mobile ou continuidade de um código
            que já existe. Cada entrega vem com código-fonte, deploy
            configurado e documentação.
          </p>
          <p>
            Os projetos abaixo não são mockups: são repositórios públicos e
            demos no ar, com data do último commit puxada ao vivo da API do
            GitHub.
          </p>
        </div>
        <ul className="flex flex-wrap content-start gap-2">
          {SKILLS.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border bg-card px-4 py-2 font-mono text-xs text-accent"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
