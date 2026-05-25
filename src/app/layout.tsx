import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Loader } from "@/components/Loader";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kangaroo Totens | Tecnologia interativa para eventos em Porto Alegre",
  description:
    "Totem fotográfico, plataforma 360°, cabine de prêmios e mais. A Kangaroo cria experiências interativas que conectam pessoas e fortalecem marcas em eventos corporativos, casamentos e ativações em Porto Alegre e região.",
  openGraph: {
    title: "Kangaroo Totens | Experiências interativas para eventos",
    description:
      "Eternizando suas lembranças em um clique. Totens, plataformas 360°, cabines e mais para o seu evento.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geist.variable} ${geistMono.variable} ${bricolage.variable}`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-md focus:px-4 focus:py-2 focus:outline-none"
          style={{
            background: "var(--c-orange)",
            color: "#0F0906",
            fontFamily: "var(--font-geist)",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Pular para o conteúdo
        </a>
        <Loader />
        {children}
      </body>
    </html>
  );
}
