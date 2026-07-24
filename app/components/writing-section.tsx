// Writing section — latest articles on the homepage, V1 card language.
// Server component: receives articles from page.tsx (lib/articles.ts).

import Link from "next/link";
import type { Article } from "@/lib/articles";
import { SectionLabel } from "@/app/components/section-label";
import { ExternalLinkIcon } from "@/app/components/icons";

type Props = {
  articles: Article[];
};

export function WritingSection({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <section id="writing" className="w-full">
      <div className="flex justify-center px-6 pb-16 md:px-10 md:pb-20 lg:px-[8.75rem] lg:pb-[7.5rem]">
        <div className="w-full max-w-[1060px]">

          <SectionLabel
            right={
              <Link
                href="/articles"
                className="text-[0.75rem] md:text-[0.875rem] text-subtle hover:text-primary transition-colors whitespace-nowrap"
              >
                All articles →
              </Link>
            }
          >
            Writing
          </SectionLabel>

          {/* Article cards — same shell as footer social cards */}
          <div className="flex flex-col gap-3">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group flex items-start gap-3 lg:gap-4 bg-surface border border-border rounded-[0.625rem] md:rounded-[0.75rem] p-[0.875rem] lg:p-[1.0625rem] hover:border-divider active:border-divider transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-[1.25rem] md:text-[1.375rem] lg:text-[1.5rem] text-primary leading-snug tracking-[0.01em] [text-wrap:balance]">
                      {article.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="hidden md:flex size-10 lg:size-12 items-center justify-center bg-icon-bg border border-border-light rounded-[0.5rem] text-subtle shrink-0 transition-colors duration-300 group-hover:text-primary group-hover:border-divider"
                    >
                      <ExternalLinkIcon className="size-5 lg:size-6" />
                    </span>
                  </div>

                  <p className="text-[0.8125rem] md:text-[0.875rem] text-subtle leading-relaxed mt-2 max-w-[42rem]">
                    {article.summary}
                  </p>

                  <p className="text-[0.75rem] text-muted mt-3">
                    {article.date}
                    <span aria-hidden="true"> · </span>
                    {article.readingTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
