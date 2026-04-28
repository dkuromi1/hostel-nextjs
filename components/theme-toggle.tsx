"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";
type ThemeToggleVariant = "footer" | "nav" | "header" | "switch";

function persistTheme(theme: Theme) {
  document.cookie = `theme=${theme}; path=/; max-age=31536000; samesite=lax`;
}

export function ThemeToggle({ variant = "footer" }: { variant?: ThemeToggleVariant }) {
  const [theme, setTheme] = React.useState<Theme>("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const cookieTheme = document.cookie
      .split("; ")
      .find((entry) => entry.startsWith("theme="))
      ?.split("=")[1] as Theme | undefined;
    const legacyTheme = localStorage.getItem("theme");
    const nextTheme =
      cookieTheme === "dark" || cookieTheme === "light"
        ? cookieTheme
        : legacyTheme === "dark" || legacyTheme === "light"
          ? legacyTheme
          : root.classList.contains("dark")
            ? "dark"
            : "light";

    setTheme(nextTheme);
    root.classList.toggle("dark", nextTheme === "dark");
    persistTheme(nextTheme);

    // Listen for changes from other ThemeToggle instances
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail === "dark" || customEvent.detail === "light") {
        setTheme(customEvent.detail);
      }
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    persistTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Broadcast change to other mounted ThemeToggle instances
    window.dispatchEvent(new CustomEvent("theme-change", { detail: newTheme }));
  };

  // Prevent hydration mismatch by not rendering the icon/text until mounted
  if (!mounted) {
    return (
      <div 
        className={cn(
          "rounded-full border",
          variant === "footer"
            ? "size-8 border-white/10 bg-white/5"
            : variant === "header"
              ? "size-9 border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md"
              : variant === "switch"
                ? "h-8 w-14 border-[var(--border)] bg-[var(--muted)]"
                : "h-[34px] w-[115px] border-[var(--border)] bg-transparent"
        )} 
      />
    );
  }

  if (variant === "switch") {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "relative h-8 w-14 cursor-pointer rounded-full border border-[var(--border)] bg-[var(--muted)] p-1 transition-all duration-300 active:scale-95",
          theme === "dark" ? "bg-[var(--muted)]" : "bg-[var(--brand-tertiary)]/20"
        )}
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      >
        <div
          className={cn(
            "flex size-6 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300",
            theme === "dark" ? "translate-x-6 bg-[var(--surface-dark-secondary)]" : "translate-x-0"
          )}
        >
          {theme === "light" ? (
            <Sun className="size-3.5 text-amber-500" />
          ) : (
            <Moon className="size-3.5 text-[var(--brand-accent)]" />
          )}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "group flex items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all active:scale-95",
        variant === "footer"
          ? "border-[var(--border)] bg-[var(--muted)]/50 text-[var(--text-muted)] hover:border-[var(--brand-primary)]/40 hover:bg-[var(--muted)] hover:text-[var(--text-heading)]"
          : variant === "header"
            ? "size-9 border-[var(--glass-border)] bg-[var(--glass-bg)] px-0 text-[var(--text-heading)] shadow-sm backdrop-blur-md hover:bg-[var(--muted)]"
            : "border-[var(--border)] bg-transparent text-[var(--text-heading)] hover:bg-[var(--muted)]"
      )}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {variant === "header" ? (
        theme === "light" ? (
          <Moon className="size-4 transition-transform group-hover:-rotate-12" />
        ) : (
          <Sun className="size-4 transition-transform group-hover:rotate-45" />
        )
      ) : theme === "light" ? (
        <>
          <Moon className="size-3 transition-transform group-hover:-rotate-12" />
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="size-3 transition-transform group-hover:rotate-45" />
          <span>Light Mode</span>
        </>
      )}
    </button>
  );
}
