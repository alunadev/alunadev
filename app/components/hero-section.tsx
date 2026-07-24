// Hero V2 — all-in-one: identity (V1 hero) + "Who I am" block (Fable one-shot)
// Left: serif name, positioning, location + socials, expertise pills.
// Right: photo with B&W→color hover (.hero-photo in globals.css).
// Bottom: facts grid (includes "Currently @ LALIGA").
// Desktop: section is pinned (sticky top-0) so the next section slides over it.

import { MapPin } from "lucide-react";
import { MailIcon, XIcon, LinkedInIcon, GitHubIcon } from "@/app/components/icons";

const CAREER_START_YEAR = 2014;

export function HeroSection() {
  const experienceYears = new Date().getFullYear() - CAREER_START_YEAR;

  const FACTS: Array<{ label: string; value: string; logo?: string }> = [
    { label: "Currently", value: "Senior PM @ LALIGA", logo: "/images/logo-laliga.png" },
    { label: "Experience", value: `${experienceYears} years` },
    { label: "Background", value: "Industrial Engineering" },
    { label: "Building", value: "ald-os · Cuatro Jugadores · AdOS · Pulse" },
  ];

  return (
    <section
      id="hero"
      className="relative lg:sticky lg:top-0 z-0 bg-surface w-full min-h-screen flex items-center justify-center py-20 px-6 md:px-10 lg:px-[8.75rem]"
    >
      <div className="flex flex-col gap-10 md:gap-12 w-full max-w-[1060px]">

        {/* ── Top: identity + photo ── */}
        <div className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-16 items-start">

          {/* Left column — identity */}
          <div className="flex flex-col gap-6 items-start w-full lg:flex-1 lg:self-stretch lg:justify-center">
            {/* Name */}
            <h1 className="font-serif text-[2.5rem] leading-[2.75rem] md:text-[3rem] md:leading-[3.25rem] lg:text-[4rem] lg:leading-[4.25rem] text-primary tracking-[0.04rem] [text-wrap:balance]">
              Adrián
              <br />
              Luna Díaz
            </h1>

            {/* Positioning */}
            <p className="text-primary font-sans text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-normal leading-relaxed tracking-[0.0125rem] max-w-[34rem]">
              AI-first Senior Product Manager &amp;{" "}
              <span className="text-button-primary">Product Builder</span> turning
              product context into digital products, internal tools, code and
              shipped outcomes.
            </p>

            {/* Contact row */}
            <div className="flex gap-8 md:gap-10 lg:gap-14 items-center">
              <div className="flex gap-2 items-center">
                <MapPin className="size-5 lg:size-6 shrink-0 text-primary" />
                <span className="text-primary text-[1rem] tracking-[0.01rem] whitespace-nowrap">
                  Madrid, Spain
                </span>
              </div>

              <div className="flex gap-3 lg:gap-4 items-center">
                <a href="mailto:lunadiazadrian@gmail.com" aria-label="Email" className="shrink-0">
                  <span data-platform="email"><MailIcon className="size-5 lg:size-6" /></span>
                </a>
                <a
                  href="https://linkedin.com/in/adrian-luna-diaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="shrink-0"
                >
                  <span data-platform="linkedin"><LinkedInIcon /></span>
                </a>
                <a
                  href="https://github.com/alunadev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="shrink-0"
                >
                  <span data-platform="github"><GitHubIcon /></span>
                </a>
                <a
                  href="https://x.com/adrianlunadiaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter"
                  className="shrink-0"
                >
                  <span data-platform="x"><XIcon /></span>
                </a>
              </div>
            </div>

          </div>

          {/* Right column — photo with B&W→color hover */}
          <div className="w-full max-w-[18rem] md:max-w-[20rem] lg:max-w-[21rem] shrink-0 lg:self-center">
            <figure className="hero-photo relative rounded-[1.25rem] overflow-hidden aspect-[4/5] shadow-[0_4px_32px_0_rgba(0,0,0,0.08)]">
              <img
                alt="Adrián Luna Díaz"
                src="/images/Foto-adri-santan.jpg"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <figcaption className="absolute left-3 bottom-3 bg-primary/75 backdrop-blur-sm px-2.5 py-1.5 rounded-[0.375rem] font-mono text-[0.6875rem] tracking-[0.1em] text-surface">
                ALD®
              </figcaption>
            </figure>
          </div>
        </div>

        {/* ── Bottom: facts grid ── */}
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 border-t border-divider">
          {FACTS.map((fact) => (
            <div
              key={fact.label}
              className="flex justify-between items-center gap-4 py-3.5 border-b border-border-light"
            >
              <dt className="text-[0.875rem] font-medium text-primary">{fact.label}</dt>
              <dd className="flex items-center gap-2 text-[0.875rem] text-subtle text-right">
                {fact.logo && (
                  <img src={fact.logo} alt="" className="size-4 object-contain" />
                )}
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

      </div>
    </section>
  );
}
