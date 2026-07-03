import type { Metadata } from "next";
import { Gelasio, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AgentationToolbar } from "@/app/components/agentation/AgentationToolbar";
import { LoadingScreen } from "@/app/components/loading-screen";
import "./globals.css";

const gelasio = Gelasio({
  variable: "--font-gelasio",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Adrián Luna Díaz — Senior Product Manager",
  description:
    "Industrial Engineer turned Product Manager with 10 years of experience creating, launching, and scaling digital products.",
  openGraph: {
    title: "Adrián Luna Díaz — Senior Product Manager",
    description:
      "Portfolio of Adrián Luna Díaz, Senior PM at LALIGA. Builder, AI-first, data-driven.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${gelasio.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-white antialiased" suppressHydrationWarning>
        <LoadingScreen />
        {children}
        <AgentationToolbar />
        <Analytics />
      </body>
    </html>
  );
}
