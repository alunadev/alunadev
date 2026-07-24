// Figma node: 1912:5355 + 2005:5093
// Two-column: left (signature + contact), right (social cards)
// Mobile/tablet: stacked (left above, social links below)
// Desktop (lg+): side by side

import { socialLinks } from "@/lib/portfolio-data";
import { ExternalLinkIcon, MailIcon, XIcon, LinkedInIcon, GitHubIcon } from "@/app/components/icons";
import { SECTION_LABEL_TEXT_CLASS } from "@/app/components/section-label";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  x: <XIcon />,
  linkedin: <LinkedInIcon />,
  github: <GitHubIcon />,
};


export function FooterSection() {
  return (
    <footer className="w-full min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center px-6 py-16 md:px-10 md:py-20 lg:px-[8.75rem] lg:py-0">
        <div className="w-full max-w-[1060px] flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-8">

          {/* ── Left column ── */}
          <div className="flex flex-col justify-between gap-5 lg:self-stretch lg:max-w-[360px]">
            {/* Block 1: Contact */}
            <div className="flex flex-col gap-3">
              <p className={SECTION_LABEL_TEXT_CLASS}>Find me</p>
              <p className="font-sans text-[0.75rem] font-normal text-subtle leading-4">
              Looking for a product-led team where great work moves the needle, ready to ship.
              </p>
              <a
                href="mailto:lunadiazadrian@gmail.com"
                className="inline-flex items-center gap-2 text-muted text-[0.75rem] font-normal hover:text-subtle transition-colors"
              >
                <MailIcon className="size-3.5 shrink-0" />
                lunadiazadrian@gmail.com
              </a>
            </div>

            {/* Block 2: Signature */}
            <div className="py-1">
              <img
                alt="Adrián Luna Díaz signature"
                src="/images/firma-adri.JPG"
                className="w-[200px] md:w-[232px] lg:w-[265px] h-auto rounded-[1.5rem] object-contain"
              />
            </div>

            {/* Block 3+4: Legal */}
            <div className="flex flex-col gap-2">
              <p className="font-sans text-[0.75rem] font-normal text-subtle leading-4">
                © 2026 Adrián Luna Díaz. All rights reserved.
              </p>
              <p className="font-sans text-[0.7rem] font-normal text-subtle leading-4">
                Built and designed with Claude Code.
              </p>
            </div>
          </div>

          {/* ── Right column: social cards ── */}
          <div className="flex flex-col gap-3 w-full lg:flex-1 lg:max-w-[640px]">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 lg:gap-4 bg-surface border border-border rounded-[0.625rem] md:rounded-[0.75rem] p-[0.875rem] lg:p-[1.0625rem] hover:border-divider active:border-divider transition-colors"
              >
                {/* Icon container */}
                <div
                  data-platform={link.iconType}
                  className="size-10 md:size-11 lg:size-12 bg-icon-bg border border-border-light rounded-[0.375rem] md:rounded-[0.5rem] flex items-center justify-center shrink-0 p-[1px]"
                >
                  {SOCIAL_ICONS[link.iconType]}
                </div>

                {/* Handle */}
                <span className="text-[0.875rem] md:text-[0.9375rem] lg:text-[1rem] text-primary tracking-[0.16px] flex-1">
                  {link.handle}
                </span>

                {/* External link */}
                <ExternalLinkIcon className="size-5 lg:size-6 shrink-0" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
