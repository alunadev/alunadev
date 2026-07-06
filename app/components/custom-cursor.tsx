"use client";

// CustomCursor — dot + trailing ring, ported from the Fable one-shot.
// Fine pointers only (CSS gates display); ring expands over interactive elements.
// Hidden until first mousemove (body.cursor-active) and under reduced motion.

import { useEffect, useRef } from "react";
import gsap from "gsap";

const INTERACTIVE = "a, button, [role='button'], [data-hover], input, textarea, select, label";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dx = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power2.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      document.body.classList.add("cursor-active");
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    // Event delegation so dynamically rendered links also trigger the ring
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.(INTERACTIVE)) {
        ring.classList.add("is-hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.(INTERACTIVE)) {
        ring.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.classList.remove("cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="aluna-cursor" aria-hidden="true" />
      <div ref={ringRef} className="aluna-cursor-ring" aria-hidden="true" />
    </>
  );
}
