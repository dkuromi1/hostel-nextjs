import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "emerald" | "sky" | "sun" | "rose";
  weight?: "light" | "bold";
  colorScheme?: "default" | "light";
};

export function SectionLabel({
  children,
  className,
  variant = "default",
  weight = "light",
  colorScheme = "default",
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "uppercase tracking-[0.24em] antialiased",
        weight === "light" ? "text-xs font-semibold" : "text-xs font-bold",
        colorScheme === "light"
          ? "text-white"
          : variant === "default"
            ? "text-[var(--text-muted)] dark:text-[var(--text-body-subtle)]"
            : variant === "emerald"
              ? "text-[var(--brand-primary)]"
            : variant === "sky"
              ? "text-sky-600 dark:text-[#38bdf8]"
            : variant === "sun"
              ? "text-amber-600 dark:text-amber-400"
            : variant === "rose"
              ? "text-rose-600 dark:text-rose-400"
            : "text-[var(--text-muted)]",
        className
      )}
    >
      {children}
    </p>
  );
}
