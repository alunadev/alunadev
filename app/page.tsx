import { HeroSection } from "@/app/components/hero-section";
import { DynamicIsland } from "@/app/components/dynamic-island";
import { ExperienceSection } from "@/app/components/experience-section";
import { WritingSection } from "@/app/components/writing-section";
import { StackSection } from "@/app/components/stack-section";
import { FooterSection } from "@/app/components/footer-section";
import { getAllProjects } from "@/lib/content";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const projects = getAllProjects();
  const articles = getAllArticles();
  return (
    <main>
      <HeroSection />
      <DynamicIsland />
      {/* #after-hero slides over the pinned hero (desktop) and drives the
          DynamicIsland hero→nav morph. Keep the id and background. */}
      <div id="after-hero" className="relative z-10 bg-surface">
        <ExperienceSection projects={projects} />
        <WritingSection articles={articles} />
        <StackSection />
        <FooterSection />
      </div>
    </main>
  );
}
