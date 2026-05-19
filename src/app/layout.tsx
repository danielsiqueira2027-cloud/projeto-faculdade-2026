import type { Metadata } from "next";
import { Inter, Manrope, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import TempNavFooter from "@/components/TempNavFooter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClickServiço - Encontre Profissionais Qualificados",
  description: "Plataforma para conectar clientes e profissionais de serviços.",
  icons: {
    icon: '/imgs/misc/logo.png',
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
      className={`${inter.variable} ${manrope.variable} ${workSans.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
