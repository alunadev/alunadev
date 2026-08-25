import { NextRequest, NextResponse } from "next/server";
import { getAllProjects } from "@/lib/content";
import { getAllArticles } from "@/lib/articles";
import { socialLinks } from "@/lib/portfolio-data";
import { SITE_URL } from "@/lib/site";

// acceptmarkdown.com content negotiation for the homepage: an `Accept:
// text/markdown` request gets a markdown rendition of the same content
// instead of the HTML shell, from the same URL. `Vary: Accept` is required
// on every variant so CDNs key the cache by Accept instead of serving the
// wrong representation from whichever request populated the cache first.
export const config = {
  matcher: "/",
};

function buildHomepageMarkdown(): string {
  const experience = getAllProjects()
    .map((p) => `- **${p.company}** (${p.period}) — ${p.role}. ${p.description}`)
    .join("\n");

  const articles = getAllArticles();
  const writing = articles.length
    ? articles
        .map((a) => `- [${a.title}](${SITE_URL}/articles/${a.slug}) — ${a.summary}`)
        .join("\n")
    : "- No published articles yet.";

  const links = socialLinks
    .map((link) => `- [${link.platform}](${link.url})`)
    .concat([
      "- [Email](mailto:lunadiazadrian@gmail.com)",
      `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    ])
    .join("\n");

  return `# Adrián Luna Díaz

> AI-first Senior Product Manager and Product Builder turning product context into digital products, internal tools, code, and shipped outcomes. Based in Madrid, Spain.

## Experience

${experience}

## Writing

${writing}

## Links

${links}
`;
}

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";

  if (accept.includes("text/markdown")) {
    return new NextResponse(buildHomepageMarkdown(), {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept, Accept-Encoding",
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept, Accept-Encoding");
  return response;
}
