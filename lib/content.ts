import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type CaseStudyStatus = "available" | "not-ready" | false;

export type ProjectGroup = "laliga" | "independent" | "earlier";

export type Project = {
  slug: string;
  order: number;
  group: ProjectGroup;
  highlight: string;
  period: string;
  company: string;
  role: string;
  logoSrc: string;
  logoFill?: boolean; // logo ships its own background → cover the whole AppIcon
  mockupSrc: string;
  mockupFrames?: string[];
  mockupBg: string;
  description: string;
  achievements: string[];
  website: string;
  websiteUrl: string;
  caseStudy: CaseStudyStatus;
  comingSoon?: boolean; // shows "Case study coming soon" note — opt-in per project, not implied by caseStudy status
};

// Extended type for case study detail pages — optional fields live in MDX frontmatter
export type CaseStudyDetail = Project & {
  title?: string;
  tags?: string[];
  pullQuote?: string;
  problem?: string;
  // Flat structure — used when a case study is a single build, not a series
  // of shipped versions. Falls back to this when `milestones` is absent.
  approach?: string[];
  impact?: Array<{ metric: string; result: string }>;
  // Versioned structure — used when a case study shipped in distinct,
  // dated milestones (e.g. v1.0, v1.2). Each milestone carries its own
  // items and, optionally, the metrics that milestone drove. Not every
  // case study needs this — it's opt-in per project.
  milestones?: Array<{
    version: string;
    title: string;
    items: string[];
    impact?: Array<{ metric: string; result: string }>;
  }>;
  tools?: string[];
};

const CONTENT_DIR = path.join(process.cwd(), "content/case-studies");

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const projects = files.map((filename) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data } = matter(raw);
    return data as Project;
  });
  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(
  slug: string
): { data: CaseStudyDetail; content: string } | null {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  for (const filename of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    if (data.slug === slug) return { data: data as CaseStudyDetail, content };
  }
  return null;
}
