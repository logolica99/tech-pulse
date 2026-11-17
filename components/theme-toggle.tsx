"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="text-sm text-muted underline underline-offset-4"
      aria-label="Switch color theme"
      onClick={() => {
        const dark = resolvedTheme ? resolvedTheme === "dark" : document.documentElement.classList.contains("dark");
        setTheme(dark ? "light" : "dark");
      }}
    >
      <span className="dark:hidden">Dark</span>
      <span className="hidden dark:inline">Light</span>
    </button>
  );
}
