import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Article = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary: string;
  tags: string[];
  readingTime: string;
  draft?: boolean;
};

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

function readAll(): Array<{ data: Article; content: string }> {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    return { data: data as Article, content };
  });
}

// Drafts are listed everywhere with a visible "Draft" badge — flip
// `draft: false` (or remove the field) in the frontmatter to publish clean.
export function getAllArticles(): Article[] {
  return readAll()
    .map((a) => a.data)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(
  slug: string
): { data: Article; content: string } | null {
  const match = readAll().find((a) => a.data.slug === slug);
  return match ?? null;
}
