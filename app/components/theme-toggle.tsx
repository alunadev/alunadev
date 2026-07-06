"use client";

// ThemeToggle — floating light/dark switch.
// Light is the default; choice persists in localStorage ("aluna-theme").
// The no-flash script in layout.tsx applies the saved theme before paint.

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const STORAGE_KEY = "aluna-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "dark") setTheme("dark");
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      data-hover
      className="fixed top-5 right-5 md:top-6 md:right-6 z-[60] size-11 flex items-center justify-center rounded-full bg-surface border border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] text-subtle hover:text-primary hover:border-divider active:scale-95 transition-all duration-200"
    >
      {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
    </button>
  );
}
