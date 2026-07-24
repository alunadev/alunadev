import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { ExternalLinkIcon } from "@/app/components/icons";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getArticleBySlug(slug);
  if (!result) return {};
  return {
    title: `${result.data.title} — Adrián Luna Díaz`,
    description: result.data.summary,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getArticleBySlug(slug);
  if (!result) notFound();

  const { data: article, content } = result;

  return (
    <main className="min-h-screen bg-surface">
      {/* Top bar */}
      <div className="w-full border-b border-border px-6 md:px-8 py-4">
        <Link
          href="/articles"
          data-hover
          className="inline-flex items-center gap-2 text-[14px] text-subtle hover:text-primary transition-colors"
        >
          ← All articles
        </Link>
      </div>

      <article className="flex justify-center px-6 md:px-10 py-16 md:py-20">
        <div className="w-full max-w-[720px]">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 font-mono text-[0.6875rem] text-muted tracking-[0.08em] uppercase mb-5">
              <span>{article.date}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
            <h1 className="font-serif text-[2.25rem] md:text-[2.75rem] leading-tight text-primary tracking-[0.01em] mb-5 [text-wrap:balance]">
              {article.title}
            </h1>
            <p className="text-[1.125rem] text-subtle leading-relaxed">
              {article.summary}
            </p>
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-primary rounded-[52px] px-3 py-1 text-[0.75rem] text-primary tracking-[0.01em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {article.externalUrl && (
              <a
                href={article.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="inline-flex items-center gap-1.5 text-[0.875rem] text-button-primary hover:underline underline-offset-4 mt-6"
              >
                Read the original publication
                <ExternalLinkIcon className="size-3.5" />
              </a>
            )}
          </header>

          <div className="h-px bg-divider mb-12" />

          {/* Body */}
          <div className="prose-aluna">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-divider flex items-center justify-between gap-4">
            <Link
              href="/articles"
              data-hover
              className="text-[0.875rem] text-subtle hover:text-primary transition-colors"
            >
              ← All articles
            </Link>
            <a
              href="mailto:lunadiazadrian@gmail.com"
              data-hover
              className="text-[0.875rem] text-button-primary hover:underline underline-offset-4"
            >
              Talk to me about this →
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
