import { AUTHOR, EMAIL, SAME_AS, siteCopy } from "@/lib/site";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = dict(locale);
  return (
    <footer className="border-t border-border px-6 py-10 text-sm text-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center">
        <p>
          <span className="text-fg">{AUTHOR}</span> —{" "}
          {siteCopy(locale).jobTitle}, {t.footer.location}
        </p>
        <p className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <a className="hover:text-accent" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          {SAME_AS.map((url) => (
            <a
              key={url}
              className="hover:text-accent"
              href={url}
              target="_blank"
              rel="noopener noreferrer me"
            >
              {url.includes("github") ? "GitHub" : "LinkedIn"}
            </a>
          ))}
          <a
            className="hover:text-accent"
            href={locale === "pt" ? "/llms.txt" : "/en/llms.txt"}
          >
            llms.txt
          </a>
        </p>
        <p>
          © {new Date().getFullYear()} {AUTHOR} · {t.footer.madeWith}
        </p>
      </div>
    </footer>
  );
}
