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

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MoveDown } from "lucide-react";
import { MailIcon, FileTextIcon } from "@/app/components/icons";

const BOTTOM_OFFSET = 24;    // px from viewport bottom in hero state
const NAV_TOP = 53;          // px from viewport top in nav state
const FADE_IN_DELAY = 3;     // seconds after loading-complete before island appears
const FADE_IN_DURATION = 0.6;

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
      className="hidden lg:block fixed left-1/2 -translate-x-1/2 z-50 bg-surface border border-border rounded-[12px] w-[368px] h-[82px] overflow-hidden"
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
        <a
          href="/cv/adrian-luna-diaz.pdf"
          download
          aria-label="Download CV"
          className="size-12 flex items-center justify-center bg-icon-bg border border-border-light rounded-[8px] shrink-0"
        >
          <span data-platform="cv"><FileTextIcon className="size-6" /></span>
        </a>
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
          <a
            href="mailto:lunadiazadrian@gmail.com"
            aria-label="Send email"
            className="size-12 flex items-center justify-center bg-icon-bg border border-border-light rounded-[8px]"
          >
            <span data-platform="email"><MailIcon className="size-6" /></span>
          </a>
          <a
            href="/cv/adrian-luna-diaz.pdf"
            download
            aria-label="Download CV"
            className="size-12 flex items-center justify-center bg-icon-bg border border-border-light rounded-[8px]"
          >
            <span data-platform="cv"><FileTextIcon className="size-6" /></span>
          </a>
        </div>
      </div>
    </div>
  );
}
