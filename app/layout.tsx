import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carlos de Lara — Desenvolvedor Fullstack",
  description:
    "Desenvolvedor fullstack freelancer. Sites, sistemas e apps sob medida. Veja projetos reais e fale comigo no WhatsApp.",
  openGraph: {
    title: "Carlos de Lara — Desenvolvedor Fullstack",
    description:
      "Sites, sistemas e apps sob medida. Projetos reais, código no ar.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
