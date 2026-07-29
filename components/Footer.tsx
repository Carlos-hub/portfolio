import { AUTHOR, EMAIL, JOB_TITLE, SAME_AS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 text-sm text-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center">
        <p>
          <span className="text-fg">{AUTHOR}</span> — {JOB_TITLE}, Brasil ·
          atendimento remoto
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
          <a className="hover:text-accent" href="/llms.txt">
            llms.txt
          </a>
        </p>
        <p>© {new Date().getFullYear()} {AUTHOR} · Feito com Next.js</p>
      </div>
    </footer>
  );
}
