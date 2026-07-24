// Stack section — tool logos orbiting the avatar (pure CSS animation).
// Two counter-rotating rings; chips counter-spin to stay upright; the whole
// system pauses on hover so labels can be read. Reduced motion → static.
// Logos are official favicons stored in /public/images/stack/.

import { SectionLabel } from "@/app/components/section-label";

type Tool = {
  name: string;
  src: string;
  ring: "outer" | "inner";
  angle: number; // degrees, 0 = right / -90 = top
  fill?: boolean; // logo ships its own background → cover the whole chip
};

const TOOLS: Tool[] = [
  { name: "Claude Code", src: "/images/stack/claude-code.png", ring: "outer", angle: -90, fill: true },
  { name: "Cursor", src: "/images/stack/cursor.svg", ring: "outer", angle: -18 },
  { name: "Figma", src: "/images/stack/figma.png", ring: "outer", angle: 54, fill: true },
  { name: "Codex", src: "/images/stack/codex.png", ring: "outer", angle: 126 },
  { name: "Warp", src: "/images/stack/warp.png", ring: "outer", angle: 198, fill: true },
  { name: "Notion", src: "/images/stack/notion.png", ring: "inner", angle: -30 },
  { name: "Granola", src: "/images/stack/granola.png", ring: "inner", angle: 60, fill: true },
  { name: "Wispr Flow", src: "/images/stack/wispr-flow.png", ring: "inner", angle: 150, fill: true },
  { name: "Raycast", src: "/images/stack/raycast.png", ring: "inner", angle: 240, fill: true },
];

function OrbitRing({ ring }: { ring: "outer" | "inner" }) {
  const radius =
    ring === "outer"
      ? "calc(var(--orbit-size) / 2)"
      : "calc(var(--orbit-size) * 0.31)";

  return (
    <div className={`stack-orbit-spin ${ring === "inner" ? "reverse" : ""}`}>
      {TOOLS.filter((t) => t.ring === ring).map((tool) => (
        <div
          key={tool.name}
          className="stack-item"
          style={{ "--angle": `${tool.angle}deg`, "--radius": radius } as React.CSSProperties}
        >
          <div className="stack-chip-inner group relative flex flex-col items-center">
            <span className="flex size-12 md:size-14 items-center justify-center bg-white border border-border-light rounded-[26%] shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden transition-transform duration-300 group-hover:scale-110">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.src}
                alt={tool.name}
                className={
                  tool.fill
                    ? "w-full h-full object-cover scale-110"
                    : "size-9 md:size-10 object-contain"
                }
              />
            </span>
            <span className="absolute top-full mt-2 text-[0.6875rem] text-subtle whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {tool.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StackSection() {
  return (
    <section id="stack" className="w-full">
      <div className="flex justify-center px-6 pb-16 md:px-10 md:pb-20 lg:px-[8.75rem] lg:pb-[7.5rem]">
        <div className="w-full max-w-[1060px]">

          <SectionLabel>Stack</SectionLabel>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Copy */}
            <div className="flex flex-col gap-4 w-full lg:max-w-[22rem] text-center lg:text-left">
              <h3 className="font-serif text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] text-primary leading-snug tracking-[0.01em] [text-wrap:balance]">
                The tools behind the work
              </h3>
              <p className="text-[0.875rem] md:text-[1rem] text-subtle leading-relaxed">
                AI agents as the execution layer, design and knowledge tools for
                context. This is the day-to-day system I build products with.
              </p>
            </div>

            {/* Orbit */}
            <div className="flex-1 flex justify-center py-10">
              <div className="stack-orbit" role="img" aria-label="Tool stack: Claude Code, Cursor, Codex, Figma, Notion, Warp, Granola, Wispr Flow and Raycast orbiting Adrián's avatar">
                <div className="stack-ring stack-ring-outer" aria-hidden="true" />
                <div className="stack-ring stack-ring-inner" aria-hidden="true" />

                {/* Center — avatar, same treatment as the DynamicIsland */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                  <div className="relative size-16 md:size-20 rounded-full shadow-[0px_1.587px_6.35px_0px_rgba(0,0,0,0.1)] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Adrián Luna Díaz"
                      src="/images/Foto-adri-santan.jpg"
                      className="absolute h-[150%] w-full left-0 top-[-11%] object-cover"
                    />
                  </div>
                </div>

                <OrbitRing ring="outer" />
                <OrbitRing ring="inner" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
