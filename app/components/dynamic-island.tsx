"use client";

// DynamicIsland — Figma nodes: 2077:5951 (nav variant) + 2077:5952 (hero variant)
// Single fixed element with two states:
//   Hero state: bottom-center, tracks scroll 1:1 so it appears anchored to the page
//   Nav state:  top-[53px], fixed — avatar + name + contact buttons
//
// Lifecycle:
//   1. Mount: invisible, positioned at bottom (matching hero section layout).
//   2. "aluna:loading-complete" event fires when LoadingScreen exits → 3s later, fade in.
//   3. As user scrolls, island tracks scroll position (moves up with the page).
//   4. When #hero > div (main content block) fully exits viewport → morph to nav.
//   5. Reverse: when hero content re-enters viewport → revert to hero state.

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { MoveDown } from "lucide-react";
import { MailIcon, FileTextIcon } from "@/app/components/icons";

const BOTTOM_OFFSET = 24;    // px from viewport bottom in hero state
const NAV_TOP = 53;          // px from viewport top in nav state
const FADE_IN_DELAY = 3;     // seconds after loading-complete before island appears
const FADE_IN_DURATION = 0.6;

// Island shell widths (see the has-[...] variants on the shell). Both variants are
// absolutely positioned, so the shell can't size to its content — each hover state
// needs an explicit width. Cost of a revealed label = text width (Inter 500, 15px)
// + pl-2 (8px), on top of the 368px resting width:
//   "Download CV"  97.5 + 8 → 106  ⇒ 474px
//   "Send email"   79.0 + 8 →  87  ⇒ 455px
//
// Icon button that reveals its label on hover. The island widens to make room
// (see the has-[...] width variants on the shell), so each marker attribute maps
// to one of the widths above.
type ActionMarker = "data-cv-btn" | "data-email-btn";

function IslandAction({
  href,
  label,
  platform,
  marker,
  icon,
  download = false,
}: {
  href: string;
  label: string;
  platform: string;
  marker: ActionMarker;
  icon: ReactNode;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      download={download}
      aria-label={label}
      {...{ [marker]: "" }}
      className="group/action h-12 flex items-center justify-center bg-icon-bg border border-border-light rounded-[8px] shrink-0 px-3"
    >
      <span data-platform={platform}>{icon}</span>
      <span className="grid grid-cols-[0fr] group-hover/action:grid-cols-[1fr] transition-[grid-template-columns] duration-300 ease-out">
        <span className="overflow-hidden">
          <span className="block pl-2 text-[15px] leading-none text-primary font-medium whitespace-nowrap">
            {label}
          </span>
        </span>
      </span>
    </a>
  );
}

export function DynamicIsland() {
  const ref = useRef<HTMLDivElement>(null);
  const [isNav, setIsNav] = useState(false);
  const isNavRef = useRef(false);
  const fadeInTweenRef = useRef<gsap.core.Tween | null>(null);

  // Position before first paint — invisible at bottom
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, {
      top: window.innerHeight - BOTTOM_OFFSET - el.offsetHeight,
      opacity: 0,
    });
  }, []);

  // Fade in 3s after loading animation completes
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onLoadingComplete = () => {
      fadeInTweenRef.current = gsap.to(el, {
        opacity: 1,
        duration: FADE_IN_DURATION,
        delay: FADE_IN_DELAY,
      });
    };

    window.addEventListener("aluna:loading-complete", onLoadingComplete);
    return () => window.removeEventListener("aluna:loading-complete", onLoadingComplete);
  }, []);

  // Scroll-linked position tracking + morph trigger
  // V2: the hero is pinned (sticky) on desktop, so its content never exits the
  // viewport. The morph now keys off #after-hero — the wrapper holding every
  // section after the hero — covering the viewport as it slides over the hero.
  useEffect(() => {
    const el = ref.current;
    const afterHero = document.getElementById("after-hero");
    if (!el || !afterHero) return;

    const baseTop = () => window.innerHeight - BOTTOM_OFFSET - el.offsetHeight;

    const onScroll = () => {
      if (isNavRef.current) {
        // Nav state — revert to hero if the hero becomes visible again
        if (afterHero.getBoundingClientRect().top > 0) {
          isNavRef.current = false;
          setIsNav(false);
          gsap.set(el, { top: Math.max(NAV_TOP, baseTop() - window.scrollY) });
        }
      } else {
        // Hero state — track island position with scroll
        gsap.set(el, { top: Math.max(NAV_TOP, baseTop() - window.scrollY) });

        // Morph to nav the moment the after-hero content covers the hero
        if (afterHero.getBoundingClientRect().top <= 0) {
          isNavRef.current = true;
          gsap.set(el, { top: NAV_TOP });
          // Ensure island is visible even if 3s fade-in hasn't fired yet
          if (fadeInTweenRef.current) {
            fadeInTweenRef.current.kill();
            fadeInTweenRef.current = null;
          }
          gsap.set(el, { opacity: 1 });
          setIsNav(true);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="hidden lg:block fixed left-1/2 -translate-x-1/2 z-50 bg-surface border border-border rounded-[12px] w-[368px] h-[82px] overflow-hidden transition-[width] duration-300 ease-out has-[[data-email-btn]:hover]:w-[455px] has-[[data-cv-btn]:hover]:w-[474px]"
    >
      {/* ── Hero variant — scroll cue ── */}
      <div
        className={`absolute inset-0 p-[17px] flex items-center justify-between gap-3 transition-opacity duration-200 ${
          isNav ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="bg-icon-bg border border-border-light h-[48px] rounded-[8px] flex items-center gap-2 px-[17px] py-px shrink-0">
          <span className="text-[16px] text-primary tracking-[0.16px] whitespace-nowrap">
            Scroll down to know more
          </span>
          <MoveDown className="size-6 shrink-0 text-primary" />
        </div>
        <IslandAction
          href="/cv/adrian-luna-diaz.pdf"
          download
          label="Download CV"
          platform="cv"
          marker="data-cv-btn"
          icon={<FileTextIcon className="size-6" />}
        />
      </div>

      {/* ── Nav variant — avatar + contact ── */}
      <div
        className={`absolute inset-0 p-[17px] flex items-center justify-between gap-3 transition-opacity duration-200 ${
          isNav ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative size-12 rounded-full shadow-[0px_1.587px_6.35px_0px_rgba(0,0,0,0.1)] overflow-hidden shrink-0">
          <img
            alt="Adrián Luna Díaz"
            src="/images/Foto-adri-santan.jpg"
            className="absolute h-[150%] w-full left-0 top-[-11%] object-cover"
          />
        </div>
        <span className="font-sans text-primary text-[1rem] font-normal leading-normal tracking-[0.01rem] flex-1">
          Adrián Luna Díaz
        </span>
        <div className="flex gap-2 items-center shrink-0">
          <IslandAction
            href="mailto:lunadiazadrian@gmail.com"
            label="Send email"
            platform="email"
            marker="data-email-btn"
            icon={<MailIcon className="size-6" />}
          />
          <IslandAction
            href="/cv/adrian-luna-diaz.pdf"
            download
            label="Download CV"
            platform="cv"
            marker="data-cv-btn"
            icon={<FileTextIcon className="size-6" />}
          />
        </div>
      </div>
    </div>
  );
}
