import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "sun" | "emerald";
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
          ? "text-slate-600" 
          : variant === "sun" 
            ? "text-amber-700" 
            : "text-emerald-700",
        className
      )}
    >
      {children}
    </p>
  );
}
