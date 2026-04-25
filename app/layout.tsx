import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SistemasPara — Directorio B2B de software por industria",
  description:
    "Encuentra el mejor software B2B para tu industria. Comparativas, herramientas y guías para tomar decisiones informadas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
