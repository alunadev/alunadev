import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { SECTION_LABEL_TEXT_CLASS } from "@/app/components/section-label";
import { ExternalLinkIcon } from "@/app/components/icons";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects
    .filter((p) => p.caseStudy === "available")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getProjectBySlug(slug);
  if (!result) return {};
  const { data } = result;
  return {
    title: `${data.title ?? data.company} — Adrián Luna Díaz`,
    description: data.problem?.slice(0, 160) ?? data.description.slice(0, 160),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getProjectBySlug(slug);

  if (!result || result.data.caseStudy !== "available") notFound();

  const { data: study } = result;

  // Next case study (by order) for the footer nav
  const available = getAllProjects().filter((p) => p.caseStudy === "available");
  const idx = available.findIndex((p) => p.slug === slug);
  const next = available.length > 1 ? available[(idx + 1) % available.length] : null;

  return (
    <main className="min-h-screen bg-surface">
      {/* Top bar */}
      <div className="w-full border-b border-border px-6 md:px-10 lg:px-[8.75rem] py-4">
        <Link
          href="/#experience"
          data-hover
          className="inline-flex items-center gap-2 text-[0.875rem] text-subtle hover:text-primary transition-colors"
        >
          ← Back to portfolio
        </Link>
      </div>

      {/* Content */}
      <div className="flex justify-center px-6 md:px-10 lg:px-[8.75rem] py-16 md:py-20 lg:py-24">
        <div className="w-full max-w-[760px] flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-5">
            {/* Case study label */}
            <p className={SECTION_LABEL_TEXT_CLASS}>Case study</p>

            {/* Title */}
            <h1 className="font-serif text-[2rem] md:text-[2.5rem] lg:text-[3rem] text-primary tracking-[0.01em] leading-tight [text-wrap:balance]">
              {study.title ?? study.company}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[0.875rem] text-subtle tracking-[0.14px]">
              <span>{study.role}</span>
              <span aria-hidden="true">·</span>
              <span>{study.company}</span>
              <span aria-hidden="true">·</span>
              <span>{study.period}</span>
            </div>

            {/* Tags */}
            {study.tags && study.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-primary rounded-full px-3 py-1 text-[0.75rem] text-primary tracking-[0.12px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Mockup banner */}
          {study.mockupSrc && (
            <div
              className="w-full rounded-[1rem] overflow-hidden flex items-center justify-center py-10 px-8"
              style={{ backgroundColor: study.mockupBg || "var(--color-card-bg)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={study.mockupSrc}
                alt={`${study.company} product mockup`}
                className="max-h-[420px] w-auto object-contain"
              />
            </div>
          )}

          {/* Pull quote (optional) */}
          {study.pullQuote && (
            <blockquote className="border-l-[3px] border-primary pl-6">
              <p className="font-serif text-[1.375rem] text-primary leading-relaxed tracking-[0.01em]">
                &ldquo;{study.pullQuote}&rdquo;
              </p>
            </blockquote>
          )}

          <div className="h-px bg-divider" />

          {/* Problem */}
          {study.problem && (
            <div className="flex flex-col gap-4">
              <h2 className={SECTION_LABEL_TEXT_CLASS}>Problem</h2>
              <p className="text-[1.125rem] text-primary leading-relaxed tracking-[0.01em]">
                {study.problem}
              </p>
            </div>
          )}

          {study.milestones && study.milestones.length > 0 ? (
            <>
              <div className="h-px bg-divider" />

              {/* Approach — versioned milestones, each with its own items and metrics */}
              <div className="flex flex-col gap-4">
                <h2 className={SECTION_LABEL_TEXT_CLASS}>Approach</h2>
                <div className="flex flex-col gap-10">
                  {study.milestones.map((milestone, mi) => (
                    <div key={milestone.version} className="flex flex-col gap-4">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-muted text-[0.75rem] tracking-[0.05em] uppercase">
                          {milestone.version}
                        </span>
                        <h3 className="font-serif text-[1.25rem] md:text-[1.375rem] text-primary tracking-[0.01em]">
                          {milestone.title}
                        </h3>
                      </div>

                      <ul className="flex flex-col gap-3">
                        {milestone.items.map((item, i) => (
                          <li key={i} className="flex gap-4 items-start">
                            <span className="font-mono text-muted text-[0.8125rem] mt-1 shrink-0">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[1.125rem] text-primary leading-relaxed tracking-[0.01em]">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {milestone.impact && milestone.impact.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {milestone.impact.map((row) => (
                            <div
                              key={row.metric}
                              className="bg-card-bg border border-border rounded-[0.625rem] md:rounded-[0.75rem] p-6 flex flex-col gap-1"
                            >
                              <span className="text-[1.75rem] font-semibold text-primary tracking-[0.01em] [font-variant-numeric:tabular-nums]">
                                {row.result}
                              </span>
                              <span className="text-[0.875rem] text-subtle tracking-[0.14px]">
                                {row.metric}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {mi < study.milestones!.length - 1 && (
                        <div className="h-px bg-divider mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {study.approach && study.approach.length > 0 && (
                <div className="h-px bg-divider" />
              )}

              {/* Approach — flat, single-build case studies */}
              {study.approach && study.approach.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h2 className={SECTION_LABEL_TEXT_CLASS}>Approach</h2>
                  <ul className="flex flex-col gap-3">
                    {study.approach.map((item, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span className="font-mono text-muted text-[0.8125rem] mt-1 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[1.125rem] text-primary leading-relaxed tracking-[0.01em]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {study.impact && study.impact.length > 0 && (
                <div className="h-px bg-divider" />
              )}

              {/* Impact */}
              {study.impact && study.impact.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h2 className={SECTION_LABEL_TEXT_CLASS}>Impact</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {study.impact.map((row) => (
                      <div
                        key={row.metric}
                        className="bg-card-bg border border-border rounded-[0.625rem] md:rounded-[0.75rem] p-6 flex flex-col gap-1"
                      >
                        <span className="text-[1.75rem] font-semibold text-primary tracking-[0.01em] [font-variant-numeric:tabular-nums]">
                          {row.result}
                        </span>
                        <span className="text-[0.875rem] text-subtle tracking-[0.14px]">
                          {row.metric}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {study.tools && study.tools.length > 0 && (
            <div className="h-px bg-divider" />
          )}

          {/* Tools */}
          {study.tools && study.tools.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className={SECTION_LABEL_TEXT_CLASS}>Tools</h2>
              <div className="flex flex-wrap gap-2">
                {study.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono border border-primary rounded-full px-3 py-1 text-[0.75rem] text-primary tracking-[0.12px]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer nav */}
          <div className="mt-4 pt-8 border-t border-divider flex items-center justify-between gap-4">
            <Link
              href="/#experience"
              data-hover
              className="text-[0.875rem] text-subtle hover:text-primary transition-colors"
            >
              ← Back to portfolio
            </Link>
            {next && next.slug !== slug ? (
              <Link
                href={`/case-study/${next.slug}`}
                data-hover
                className="inline-flex items-center gap-1.5 text-[0.875rem] text-button-primary hover:underline underline-offset-4"
              >
                Next: {next.company}
                <ExternalLinkIcon className="size-3.5" />
              </Link>
            ) : (
              <a
                href="mailto:lunadiazadrian@gmail.com"
                data-hover
                className="inline-flex items-center gap-1.5 text-[0.875rem] text-button-primary hover:underline underline-offset-4"
              >
                Talk to me about this
                <ExternalLinkIcon className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
