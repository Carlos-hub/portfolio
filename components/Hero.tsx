import AnimatedBackground from "./AnimatedBackground";
import WhatsappButton from "./WhatsappButton";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6"
    >
      <AnimatedBackground />
      <div className="relative z-10 mx-auto w-full max-w-5xl pt-20">
        {/* Keywords live inside the h1 so the page's main heading says what
            the site is about, not only who it is about. */}
        <h1 id="hero-title">
          <span className="mb-4 block font-mono text-sm uppercase tracking-[0.3em] text-accent">
            Desenvolvedor Fullstack · Freelancer
          </span>
          <span className="block text-6xl font-black leading-[0.95] tracking-tight sm:text-8xl">
            Carlos
            <br />
            de Lara
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted">
          Transformo ideias em produtos digitais no ar. Sites, sistemas web,
          landing pages e apps sob medida — do back-end ao pixel final, na
          linguagem que o projeto pedir.
        </p>
        <div className="mt-10">
          <WhatsappButton
            label="Vamos conversar →"
            message="Olá Carlos! Vi seu portfolio e quero conversar sobre um projeto."
          />
        </div>
      </div>
    </section>
  );
}
