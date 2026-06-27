import Link from "next/link";
import { ArrowRight } from "@/lib/icon-registry";
import { cn } from "@/lib/utils";

interface EditorialButtonProps {
  href: string;
  label: string;
  className?: string;
  showIcon?: boolean;
  variant?: "solid" | "ghost";
}

/**
 * EditorialButton
 *
 * A high-polish CTA button used for primary "View All" actions across the
 * site. Two variants:
 *  - "solid"  (default) — dark gradient background, white text.
 *  - "ghost"            — transparent background, 1px gold-tinted border,
 *                         theme-aware text that shifts to gold on hover.
 */
export function EditorialButton({
  href,
  label,
  className,
  showIcon = true,
  variant = "solid",
}: EditorialButtonProps) {
  const isExternal = href.startsWith("http");
  const isGhost = variant === "ghost";

  const content = (
    <>
      {/* Shimmer sweep — gold-tinted/light for ghost, white for solid */}
      <div
        className={cn(
          "absolute inset-0 z-0 translate-x-[-100%] bg-gradient-to-r from-transparent to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]",
          isGhost ? "via-[var(--text-heading)]/8" : "via-white/15"
        )}
      />
      <span className="relative z-10">{label}</span>
      {showIcon && (
        <div
          className={cn(
            "relative z-10 flex size-7 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110",
            isGhost
              ? "bg-[var(--text-heading)]/10 text-[var(--text-heading)] group-hover:bg-[var(--text-heading)]/20"
              : "bg-white/15 text-white group-hover:bg-[var(--brand-accent)]"
          )}
        >
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      )}
    </>
  );

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full px-8 py-4 self-start",
    "text-sm font-semibold tracking-tight",
    "transition-all duration-300 hover:-translate-y-0.5 active:scale-95 active:translate-y-0",
    isGhost
      ? [
          "bg-transparent border border-[var(--text-heading)]/30",
          "text-[var(--text-heading)]",
          "hover:border-[var(--text-heading)]/60 hover:bg-[var(--text-heading)]/5",
          "shadow-sm hover:shadow-md hover:shadow-[var(--text-heading)]/10",
        ]
      : [
          "bg-gradient-to-br from-[var(--surface-dark)] via-[var(--surface-dark-secondary)] to-[var(--surface-dark)]",
          "text-[var(--text-on-surface-dark)]",
          "shadow-lg shadow-[var(--surface-dark)]/30 ring-1 ring-white/10",
          "hover:shadow-xl hover:shadow-[var(--surface-dark)]/40",
        ],
    className
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {content}
    </Link>
  );
}
