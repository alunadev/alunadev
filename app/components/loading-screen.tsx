"use client";

// Loading animation — two-phase mechanic:
//
// Phase 1: "A" (first) and "D" (last) start together at the center of the word,
//          then slide outward to their natural extreme positions.
// Phase 2: Once A and D are at their extremes, "LUNA" fades in between them.
//
// Size: matches reference (small, ~1.125rem — not dominant on screen).
// Progress bar fills left→right in sync with the full animation.
// Exit: GSAP opacity 0, duration 2.5s, ease power4.out, delay 3.5s.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LETTERS = ["A", "L", "U", "N", "A", "D"];
const MIDDLE_INDICES = [1, 2, 3, 4]; // L, U, N, A

export function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const container = containerRef.current;
    const lineFill = lineFillRef.current;
    if (!overlay || !container) return;

    document.body.style.overflow = "hidden";

    const aLetter = letterRefs.current[0];
    const dLetter = letterRefs.current[5];
    const middleLetters = MIDDLE_INDICES
      .map((i) => letterRefs.current[i])
      .filter(Boolean) as HTMLSpanElement[];

    if (!aLetter || !dLetter) return;

    // Measure natural positions relative to the container
    const containerRect = container.getBoundingClientRect();
    const aRect = aLetter.getBoundingClientRect();
    const dRect = dLetter.getBoundingClientRect();

    // Center of container (in local coords)
    const centerX = containerRect.width / 2;

    // Centers of A and D in local coords
    const aCenter = aRect.left - containerRect.left + aRect.width / 2;
    const dCenter = dRect.left - containerRect.left + dRect.width / 2;

    // "AD" pair centered: A sits just left of center, D just right of center
    // so they appear as a pair centered at the viewport center
    const halfSpacing = (aRect.width / 2 + dRect.width / 2) / 2 + 1;
    const aTargetCenter = centerX - halfSpacing;
    const dTargetCenter = centerX + halfSpacing;

    const aOffset = aTargetCenter - aCenter; // A shifts right
    const dOffset = dTargetCenter - dCenter; // D shifts left (negative)

    // Phase 0: set initial state
    gsap.set(aLetter, { x: aOffset });
    gsap.set(dLetter, { x: dOffset });
    gsap.set(middleLetters, { opacity: 0 });

    const spreadDelay = 0.25;
    const spreadDuration = 1.0;

    // Phase 1: A slides to its natural left, D slides to its natural right
    gsap.to(aLetter, { x: 0, duration: spreadDuration, ease: "power2.inOut", delay: spreadDelay });
    gsap.to(dLetter, { x: 0, duration: spreadDuration, ease: "power2.inOut", delay: spreadDelay });

    // Phase 2: LUNA fades in once A and D are at their extremes
    const lunaDelay = spreadDelay + spreadDuration;
    gsap.to(middleLetters, {
      opacity: 1,
      duration: 0.45,
      stagger: 0.07,
      ease: "power2.out",
      delay: lunaDelay,
    });

    // Progress bar fills across the entire animation
    if (lineFill) {
      const totalDuration = lunaDelay + 0.45 + 0.07 * (middleLetters.length - 1);
      gsap.fromTo(
        lineFill,
        { width: "0%" },
        {
          width: "100%",
          duration: totalDuration,
          ease: "power2.inOut",
          delay: spreadDelay,
        }
      );
    }

    // Exit — exact screenLoading() from apparicio app.js
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
        window.dispatchEvent(new CustomEvent("aluna:loading-complete"));
      },
    });

    tl.to(overlay, {
      opacity: 0,
      duration: 2.5,
      ease: "power4.out",
      delay: 3.5,
    });

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-surface flex items-center justify-center pointer-events-none"
      style={{ zIndex: 999 }}
    >
      <div className="flex flex-col items-start gap-[6px]">
        {/* Letter row — full ALUNAD width; LUNA invisible but holds space */}
        <div ref={containerRef} className="flex items-baseline">
          {LETTERS.map((char, i) => (
            <span
              key={i}
              ref={(el) => { letterRefs.current[i] = el; }}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-gelasio)",
                fontSize: "1.125rem",
                fontWeight: 400,
                color: "var(--color-primary)",
                letterSpacing: "2px",
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Progress line — dark fill over light track */}
        <div
          style={{ width: "100%", height: "1px", background: "var(--color-divider)", position: "relative" }}
        >
          <div
            ref={lineFillRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "0%",
              background: "var(--color-primary)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
