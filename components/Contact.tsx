import Section from "./Section";
import WhatsappButton from "./WhatsappButton";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { EMAIL } from "@/lib/site";

export default function Contact({ locale }: { locale: Locale }) {
  const t = dict(locale);
  return (
    <Section
      id={t.ids.contact}
      eyebrow={t.contact.eyebrow}
      title={t.contact.title}
    >
      <p className="max-w-xl text-lg text-muted">{t.contact.lead}</p>
      <div className="mt-8">
        <WhatsappButton label={t.contact.cta} message={t.contact.ctaMessage} />
      </div>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
        <a className="hover:text-accent" href={`mailto:${EMAIL}`}>
          {EMAIL}
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
