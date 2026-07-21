import AnimatedBackground from "./AnimatedBackground";
import WhatsappButton from "./WhatsappButton";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto w-full max-w-5xl pt-20">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-accent">
          Desenvolvedor Fullstack · Freelancer
        </p>
        <h1 className="text-6xl font-black leading-[0.95] tracking-tight sm:text-8xl">
          Carlos
          <br />
          de Lara
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted">
          Transformo ideias em produtos digitais no ar. Sites, sistemas e apps
          sob medida — do back-end ao pixel final.
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
