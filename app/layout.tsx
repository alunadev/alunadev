import type { Metadata } from "next";
import Script from "next/script";
import { Gelasio, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AgentationToolbar } from "@/app/components/agentation/AgentationToolbar";
import { LoadingScreen } from "@/app/components/loading-screen";
import { CustomCursor } from "@/app/components/custom-cursor";
import { ThemeToggle } from "@/app/components/theme-toggle";
import { socialLinks } from "@/lib/portfolio-data";
import { SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: "Adrián Luna Díaz — AI-first Senior Product Manager",
  description:
    "AI-first Senior Product Manager and Product Builder turning product context into digital products, internal tools, code, and shipped outcomes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Adrián Luna Díaz — AI-first Senior Product Manager",
    description:
      "Portfolio of Adrián Luna Díaz, Senior PM at LALIGA. Product Builder, AI-first, data-driven.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/Foto-adri-santan.jpg",
        width: 1066,
        height: 1600,
        alt: "Adrián Luna Díaz",
      },
    ],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adrián Luna Díaz",
  url: SITE_URL,
  image: `${SITE_URL}/images/Foto-adri-santan.jpg`,
  jobTitle: "Senior Product Manager",
  description:
    "AI-first Senior Product Manager and Product Builder turning product context into digital products, internal tools, code, and shipped outcomes.",
  worksFor: {
    "@type": "Organization",
    name: "LALIGA",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madrid",
    addressCountry: "ES",
  },
  sameAs: socialLinks.map((link) => link.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${gelasio.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
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
        <Analytics />
      </body>
    </html>
  );
}
