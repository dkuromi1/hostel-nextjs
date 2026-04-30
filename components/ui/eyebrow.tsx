import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "sun" | "footer";
};

export function Eyebrow({
  children,
  className,
  variant = "default",
}: EyebrowProps) {
  return (
    <div
      className={cn(
        "group relative inline-flex items-center overflow-hidden rounded-full px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] antialiased transition-all duration-300",
        variant === "default"
          ? "bg-slate-200/40 dark:bg-white/10 border border-slate-300/30 dark:border-white/10 text-[var(--text-heading)] dark:text-white backdrop-blur-md shadow-sm hover:border-slate-400/40 dark:hover:border-white/30"
          : variant === "sun"
            ? "bg-amber-100/40 border border-amber-200/50 text-amber-950 backdrop-blur-md"
            : "bg-white/10 border border-white/10 text-white backdrop-blur-md",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Subtle sweeping shine animation - visible in both modes */}
      <div className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-1000 group-hover:animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}
