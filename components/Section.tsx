export default function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 py-24">
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="mb-12 text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
