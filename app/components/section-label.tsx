// SectionLabel — the one label style used everywhere a piece of UI needs to
// mark "you are entering a new section": homepage sections (Experience,
// Writing, Stack), the footer ("FIND ME"), and the sub-headers inside case
// study detail pages (Problem, Approach, Impact, Tools). Deliberately light —
// enough to identify the section, not enough to compete with the content
// below it. Kept as a single text-style constant so every one of those call
// sites can share it even when their surrounding layout differs.

export const SECTION_LABEL_TEXT_CLASS =
  "font-medium text-[0.6875rem] md:text-[0.75rem] lg:text-[0.875rem] text-muted tracking-[1.4px] uppercase";

type Props = {
  children: React.ReactNode;
  right?: React.ReactNode;
  // "h2" for homepage top-level sections (Experience, Writing, Stack) so the
  // heading outline isn't flat under the hero's h1. Defaults to "p" for
  // non-section uses (footer "FIND ME", case study sub-headers).
  as?: "p" | "h2";
};

export function SectionLabel({ children, right, as: Tag = "p" }: Props) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-8 md:mb-10 lg:mb-12">
      <Tag className={SECTION_LABEL_TEXT_CLASS}>{children}</Tag>
      {right}
    </div>
  );
}
