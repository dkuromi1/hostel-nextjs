import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "emerald" | "sky" | "sun" | "rose";
  weight?: "light" | "bold";
};

export function SectionLabel({
  children,
  className,
  variant = "default",
  weight = "light",
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "uppercase tracking-[0.24em] antialiased",
        weight === "light" ? "text-xs font-normal" : "text-[10px] font-bold",
        variant === "default"
          ? "text-[var(--text-muted)] dark:text-[var(--text-body-subtle)]"
          : variant === "emerald"
            ? "text-[var(--brand-primary-dark)] dark:text-[var(--brand-primary)]"
          : variant === "sky"
            ? "text-[var(--brand-primary)] dark:text-[var(--brand-accent)]"
          : variant === "sun"
            ? "text-amber-700 dark:text-[var(--brand-accent)]"
          : variant === "rose"
            ? "text-rose-700 dark:text-rose-400"
          : "text-[var(--text-muted)]",
        className
      )}
    >
      {children}
    </p>
  );
}
