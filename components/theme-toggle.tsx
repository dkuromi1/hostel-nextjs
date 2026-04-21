"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function persistTheme(theme: Theme) {
  document.cookie = `theme=${theme}; path=/; max-age=31536000; samesite=lax`;
}

export function ThemeToggle({ variant = "footer" }: { variant?: "footer" | "nav" }) {
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
            : "h-[34px] w-[115px] border-[var(--border)] bg-transparent"
        )} 
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "group flex items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all active:scale-95",
        variant === "footer"
          ? "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 hover:text-white"
          : "border-[var(--border)] bg-transparent text-[var(--text-heading)] hover:bg-[var(--muted)]"
      )}
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? (
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
