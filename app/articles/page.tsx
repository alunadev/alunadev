import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "Writing — Adrián Luna Díaz",
  description:
    "Articles on AI-first product management, product building and shipping with AI agents.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-surface">
      {/* Top bar */}
      <div className="w-full border-b border-border px-6 md:px-8 py-4">
        <Link
          href="/#writing"
          data-hover
          className="inline-flex items-center gap-2 text-[14px] text-subtle hover:text-primary transition-colors"
        >
          ← Back to portfolio
        </Link>
      </div>

      <div className="flex justify-center px-6 md:px-10 py-16 md:py-20">
        <div className="w-full max-w-[760px]">
          <p className="font-mono text-[0.75rem] text-muted tracking-[0.14em] uppercase mb-4">
            Writing
          </p>
          <h1 className="font-serif text-[2.5rem] md:text-[3rem] text-primary tracking-[0.02em] mb-4 [text-wrap:balance]">
            Articles
          </h1>
          <p className="text-[1rem] text-subtle leading-relaxed max-w-[36rem] mb-12">
            Notes on AI-first product management, product building and shipping
            real things with AI agents.
          </p>

          <div className="border-t border-primary/80">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                data-hover
                className="group flex flex-col gap-2 py-7 border-b border-border-light transition-[padding] duration-300 hover:pl-3"
              >
                <div className="flex items-center gap-3 font-mono text-[0.6875rem] text-muted tracking-[0.08em] uppercase">
                  <span>{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime}</span>
                </div>
                <h2 className="font-serif text-[1.5rem] md:text-[1.75rem] text-primary leading-snug transition-colors duration-300 group-hover:text-button-primary [text-wrap:balance]">
                  {article.title}
                </h2>
                <p className="text-[0.9375rem] text-subtle leading-relaxed max-w-[42rem]">
                  {article.summary}
                </p>
              </Link>
            ))}
          </div>

          {articles.length === 0 && (
            <p className="text-subtle py-12">Articles coming soon.</p>
          )}
        </div>
      </div>
    </main>
  );
}
