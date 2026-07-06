import type { Metadata } from "next";
import Script from "next/script";
import { Gelasio, Inter, JetBrains_Mono } from "next/font/google";
import { AgentationToolbar } from "@/app/components/agentation/AgentationToolbar";
import { LoadingScreen } from "@/app/components/loading-screen";
import { CustomCursor } from "@/app/components/custom-cursor";
import { ThemeToggle } from "@/app/components/theme-toggle";
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
  title: "Adrián Luna Díaz — AI-first Senior Product Manager",
  description:
    "AI-first Senior Product Manager and Product Builder turning product context into digital products, internal tools, code, and shipped outcomes.",
  openGraph: {
    title: "Adrián Luna Díaz — AI-first Senior Product Manager",
    description:
      "Portfolio of Adrián Luna Díaz, Senior PM at LALIGA. Product Builder, AI-first, data-driven.",
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
      <body className="bg-surface antialiased" suppressHydrationWarning>
        {/* Apply saved theme before paint — light is the default */}
        <Script id="aluna-theme" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("aluna-theme")==="dark"){document.documentElement.setAttribute("data-theme","dark")}}catch(e){}`}
        </Script>
        <LoadingScreen />
        {children}
        <ThemeToggle />
        <CustomCursor />
        <AgentationToolbar />
      </body>
    </html>
  );
}
