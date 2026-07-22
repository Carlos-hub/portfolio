export default function Nav() {
  const links = [
    ["Projetos", "#projetos"],
    ["Serviços", "#servicos"],
    ["Contato", "#contato"],
  ];
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-bg/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="font-black tracking-tight">
          CL<span className="text-accent">.</span>
        </a>
        <div className="flex gap-6 text-sm text-muted">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-accent">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
