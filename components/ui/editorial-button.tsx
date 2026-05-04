import Link from "next/link";
import { ArrowRight } from "@/lib/icon-registry";
import { cn } from "@/lib/utils";

interface EditorialButtonProps {
  href: string;
  label: string;
  className?: string;
  showIcon?: boolean;
}

/**
 * EditorialButton
 * 
 * A high-polish, gradient-based CTA button used for primary "View All" 
 * actions across the site. Standardizes the gradient, shadow, and 
 * interactive states.
 */
export function EditorialButton({ 
  href, 
  label, 
  className, 
  showIcon = true 
}: EditorialButtonProps) {
  const isExternal = href.startsWith("http");

  const content = (
    <>
      <div className="absolute inset-0 z-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
      <span className="relative z-10">
        {label}
      </span>
      {showIcon && (
        <div className="relative z-10 flex size-7 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover:bg-[var(--brand-accent)] group-hover:scale-110">
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
        </div>
      )}
    </>
  );

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full px-8 py-4",
    "bg-gradient-to-br from-[var(--surface-dark)] via-[var(--surface-dark-secondary)] to-[var(--surface-dark)]",
    "text-sm font-semibold tracking-tight text-[var(--text-on-surface-dark)]",
    "shadow-lg shadow-[var(--surface-dark)]/30 ring-1 ring-white/10",
    "transition-all duration-300 hover:shadow-xl hover:shadow-[var(--surface-dark)]/40 hover:-translate-y-0.5",
    "active:scale-95 active:translate-y-0",
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
