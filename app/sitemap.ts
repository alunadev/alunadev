import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = getAllProjects()
    .filter((project) => project.caseStudy === "available")
    .map((project) => ({
      url: `${SITE_URL}/case-study/${project.slug}`,
      changeFrequency: "monthly" as const,
    }));

  const articles = getAllArticles().map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: article.date,
    changeFrequency: "monthly" as const,
  }));

  return [
    { url: SITE_URL, changeFrequency: "weekly" },
    { url: `${SITE_URL}/articles`, changeFrequency: "weekly" },
    ...caseStudies,
    ...articles,
  ];
}
