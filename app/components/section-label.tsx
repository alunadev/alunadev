// SectionLabel — shared header for homepage sections (Experience, Writing…).
// Mirrors the V1 label language used in the hero ("CURRENTLY") and footer
// ("FIND ME"): medium weight, muted, wide tracking, uppercase.

type Props = {
  children: React.ReactNode;
  right?: React.ReactNode;
};

export function SectionLabel({ children, right }: Props) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-8 md:mb-10 lg:mb-12">
      <p className="font-medium text-[1rem] md:text-[1.25rem] lg:text-[1.5rem] text-muted tracking-[1.4px] uppercase">
        {children}
      </p>
      {right}
    </div>
  );
}
