import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em]",
  {
    variants: {
      variant: {
        default:
          "border-[var(--brand-primary)]/15 bg-[var(--brand-primary)]/10 text-[var(--brand-primary-dark)] dark:text-[var(--brand-primary)]",
        subtle: "border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-body)]",
        sun: "border-amber-500/30 bg-amber-500/12 text-amber-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
