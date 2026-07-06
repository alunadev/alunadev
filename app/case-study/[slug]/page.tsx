import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

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
      <div className="w-full border-b border-border px-6 md:px-8 py-4">
        <Link
          href="/"
          data-hover
          className="inline-flex items-center gap-2 text-[14px] text-subtle hover:text-primary transition-colors"
        >
          ← Back to portfolio
        </Link>
      </div>

      {/* Content */}
      <div className="flex justify-center px-6 md:px-8 py-16 md:py-[80px]">
        <div className="w-full max-w-[760px] flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-5">
            {/* Case study label */}
            <p className="font-mono text-[0.6875rem] text-muted tracking-[0.14em] uppercase">
              Case study
            </p>

            {/* Title */}
            <h1 className="font-serif text-[2.5rem] md:text-[3rem] text-primary tracking-[0.01em] leading-tight [text-wrap:balance]">
              {study.title ?? study.company}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-subtle tracking-[0.14px]">
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
                    className="border border-primary rounded-[52px] px-3 py-1 text-[12px] text-primary tracking-[0.12px]"
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
              <h2 className="font-semibold text-[12px] text-muted tracking-[1.4px] uppercase">
                Problem
              </h2>
              <p className="text-[18px] text-primary leading-relaxed tracking-[0.18px]">
                {study.problem}
              </p>
            </div>
          )}

          {study.approach && study.approach.length > 0 && (
            <div className="h-px bg-divider" />
          )}

          {/* Approach */}
          {study.approach && study.approach.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-[12px] text-muted tracking-[1.4px] uppercase">
                Approach
              </h2>
              <ul className="flex flex-col gap-3">
                {study.approach.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="font-mono text-muted text-[13px] mt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[18px] text-primary leading-relaxed tracking-[0.18px]">
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
              <h2 className="font-semibold text-[12px] text-muted tracking-[1.4px] uppercase">
                Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {study.impact.map((row) => (
                  <div
                    key={row.metric}
                    className="bg-card-bg border border-border rounded-[12px] p-6 flex flex-col gap-1"
                  >
                    <span className="text-[28px] font-semibold text-primary tracking-[0.28px] [font-variant-numeric:tabular-nums]">
                      {row.result}
                    </span>
                    <span className="text-[14px] text-subtle tracking-[0.14px]">
                      {row.metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {study.tools && study.tools.length > 0 && (
            <div className="h-px bg-divider" />
          )}

          {/* Tools */}
          {study.tools && study.tools.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-[12px] text-muted tracking-[1.4px] uppercase">
                Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {study.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono border border-primary rounded-[52px] px-3 py-1 text-[12px] text-primary tracking-[0.12px]"
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
              href="/"
              data-hover
              className="text-[0.875rem] text-subtle hover:text-primary transition-colors"
            >
              ← Back to portfolio
            </Link>
            {next && next.slug !== slug ? (
              <Link
                href={`/case-study/${next.slug}`}
                data-hover
                className="text-[0.875rem] text-button-primary hover:underline underline-offset-4"
              >
                Next: {next.company} →
              </Link>
            ) : (
              <a
                href="mailto:lunadiazadrian@gmail.com"
                data-hover
                className="text-[0.875rem] text-button-primary hover:underline underline-offset-4"
              >
                Talk to me about this →
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
