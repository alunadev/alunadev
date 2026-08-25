import Link from "next/link";
import { SECTION_LABEL_TEXT_CLASS } from "@/app/components/section-label";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#experience", label: "Experience" },
  { href: "/#writing", label: "Writing" },
  { href: "/articles", label: "Articles" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface px-6 md:px-10">
      <div className="flex flex-col items-center gap-6 text-center max-w-[24rem]">
        <p className={SECTION_LABEL_TEXT_CLASS}>404</p>
        <h1 className="font-serif text-[2rem] md:text-[2.5rem] text-primary tracking-[0.02rem] [text-wrap:balance]">
          This page doesn&apos;t exist
        </h1>
        <p className="font-sans text-[0.9375rem] text-subtle leading-relaxed">
          The link may be broken or the page has moved. Here&apos;s where to
          look instead:
        </p>
        <nav className="flex flex-col gap-2 font-sans text-[0.9375rem]">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-button-primary hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
