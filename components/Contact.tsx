import Section from "./Section";
import WhatsappButton from "./WhatsappButton";

export default function Contact() {
  return (
    <Section id="contato" eyebrow="Bora começar" title="Vamos conversar?">
      <p className="max-w-xl text-lg text-muted">
        Tem um projeto em mente? Me chama no WhatsApp — respondo rápido e a
        primeira conversa é sem compromisso.
      </p>
      <div className="mt-8">
        <WhatsappButton
          label="Chamar no WhatsApp →"
          message="Olá Carlos! Quero conversar sobre um projeto."
        />
      </div>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
        <a
          className="hover:text-accent"
          href="mailto:delaracarlosmiguel@gmail.com"
        >
          delaracarlosmiguel@gmail.com
        </a>
        <a
          className="hover:text-accent"
          href="https://www.linkedin.com/in/carlos-hub/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="hover:text-accent"
          href="https://github.com/Carlos-hub"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </Section>
  );
}
