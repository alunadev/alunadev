"use client";

// Experience V2 — grouped project list in the V1 card language.
// Groups: LALIGA umbrella → independent builds → earlier work.
// Rows are soft cards (same shell as the footer social cards); on desktop with
// a fine pointer, a floating mockup preview follows the cursor over each card.
// Row target priority: case study page → external website → static card.

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import type { Project, ProjectGroup } from "@/lib/content";
import { AppIcon } from "@/app/components/app-icon";
import { SectionLabel } from "@/app/components/section-label";
import { ExternalLinkIcon } from "@/app/components/icons";

const GROUPS: Array<{ key: ProjectGroup; title: string; note: string }> = [
  { key: "laliga", title: "LALIGA", note: "2021 — Now" },
  { key: "independent", title: "Side projects", note: "2021 — Now" },
  { key: "earlier", title: "Earlier", note: "2020 — 2021" },
];

type Props = {
  projects: Project[];
};

export function ExperienceSection({ projects }: Props) {
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Width is checked at hover time (showPreview), not at mount — the
    // viewport can cross the lg breakpoint after this effect runs.

    gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.85, opacity: 0 });
    const px = gsap.quickTo(preview, "x", { duration: 0.45, ease: "power3.out" });
    const py = gsap.quickTo(preview, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      px(e.clientX);
      py(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const showPreview = (project: Project) => {
    const preview = previewRef.current;
    const img = previewImgRef.current;
    if (!preview || !img) return;
    if (window.innerWidth < 1024 || !window.matchMedia("(pointer: fine)").matches) return;
    // No mockup → no floating preview (e.g. Pulse, Traveliè).
    if (!project.mockupSrc) return;

    img.src = project.mockupSrc;
    img.className = "w-full h-full object-cover";
    preview.style.background = project.mockupBg || "var(--color-card-bg)";

    if (!visibleRef.current) {
      visibleRef.current = true;
      gsap.to(preview, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
    }
  };

  const hidePreview = () => {
    const preview = previewRef.current;
    if (!preview || !visibleRef.current) return;
    visibleRef.current = false;
    gsap.to(preview, { opacity: 0, scale: 0.85, duration: 0.3, ease: "power2.in" });
  };

  return (
    <section id="experience" className="w-full">
      <div className="flex justify-center px-6 pt-16 pb-16 md:px-10 md:pt-20 md:pb-20 lg:px-[8.75rem] lg:pt-24 lg:pb-[7.5rem]">
        <div className="w-full max-w-[1060px]">

          <SectionLabel>Experience</SectionLabel>

          {GROUPS.map((group) => {
            const groupProjects = projects.filter((p) => p.group === group.key);
            if (groupProjects.length === 0) return null;

            return (
              <div key={group.key} className="mb-10 md:mb-12 lg:mb-14 last:mb-0">
                {/* Group header — footer "FIND ME" label language */}
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <p className="font-medium text-[0.6875rem] md:text-[0.75rem] lg:text-[0.875rem] text-muted tracking-[1.4px] uppercase">
                    {group.title}
                  </p>
                  <p className="text-[0.75rem] text-subtle text-right">
                    {group.note}
                  </p>
                </div>

                {/* Project cards — same shell as footer social cards */}
                <div className="flex flex-col gap-3">
                  {groupProjects.map((project) => {
                    const external = project.caseStudy !== "available" && !!project.websiteUrl;

                    const cardContent = (
                      <>
                        <AppIcon
                          src={project.logoSrc}
                          fill={project.logoFill}
                          className="size-10 md:size-11 lg:size-12"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <h4 className="font-serif text-[1.25rem] md:text-[1.375rem] lg:text-[1.5rem] text-primary leading-tight tracking-[0.01em] [text-wrap:balance]">
                                {project.company}
                              </h4>
                              <p className="text-[0.8125rem] md:text-[0.875rem] font-medium text-button-primary mt-1">
                                {project.highlight}
                              </p>
                            </div>
                            {/* Card action — three distinct states:
                                available case study → blue button (V1 language)
                                external redirect   → footer-style ExternalLink chip
                                no destination      → nothing */}
                            {project.caseStudy === "available" ? (
                              <span className="inline-flex items-center gap-2 h-9 px-3 text-[0.75rem] md:h-10 md:px-4 md:text-[0.8125rem] lg:h-12 bg-button-primary text-white font-medium rounded-[0.5rem] shrink-0 whitespace-nowrap">
                                Case study
                                <ExternalLinkIcon className="size-4 shrink-0" />
                              </span>
                            ) : external ? (
                              <span
                                aria-hidden="true"
                                className="flex size-9 md:size-10 lg:size-12 items-center justify-center bg-icon-bg border border-border-light rounded-[0.5rem] text-subtle shrink-0 transition-colors duration-300 group-hover:text-primary group-hover:border-divider"
                              >
                                <ExternalLinkIcon className="size-5 lg:size-6" />
                              </span>
                            ) : null}
                          </div>

                          <p className="text-[0.8125rem] md:text-[0.875rem] text-subtle leading-relaxed mt-2 max-w-[40rem] lg:max-w-[52rem] whitespace-pre-line">
                            {project.description}
                          </p>

                          <p className="text-[0.75rem] text-muted mt-3">
                            {project.period}
                            <span aria-hidden="true"> · </span>
                            {project.role}
                            {project.comingSoon && (
                              <>
                                <span aria-hidden="true"> · </span>
                                <span className="italic">Case study coming soon</span>
                              </>
                            )}
                          </p>
                        </div>
                      </>
                    );

                    const cardClass =
                      "group flex items-start gap-3 lg:gap-4 bg-surface border border-border rounded-[0.625rem] md:rounded-[0.75rem] p-[0.875rem] lg:p-[1.0625rem] hover:border-divider active:border-divider transition-colors";

                    const hoverProps = {
                      onMouseEnter: () => showPreview(project),
                      onMouseLeave: hidePreview,
                    };

                    if (project.caseStudy === "available") {
                      return (
                        <Link
                          key={project.slug}
                          href={`/case-study/${project.slug}`}
                          className={cardClass}
                          {...hoverProps}
                        >
                          {cardContent}
                        </Link>
                      );
                    }
                    if (project.websiteUrl) {
                      return (
                        <a
                          key={project.slug}
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cardClass}
                          {...hoverProps}
                        >
                          {cardContent}
                        </a>
                      );
                    }
                    return (
                      <div key={project.slug} className={cardClass} {...hoverProps}>
                        {cardContent}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Floating mockup preview — desktop, fine pointer only */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="hidden lg:block fixed top-0 left-0 z-40 w-[22rem] aspect-[4/3] rounded-[0.75rem] overflow-hidden pointer-events-none opacity-0 shadow-[0_24px_64px_rgba(0,0,0,0.25)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={previewImgRef} alt="" className="w-full h-full object-cover" />
      </div>
    </section>
  );
}
