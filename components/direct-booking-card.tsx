import { SectionLabel } from "@/components/ui/section-label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resolveIcon } from "@/lib/icon-registry";

interface DirectBookingCardProps {
  className?: string;
  variant?: "inline" | "block";
  whatsappUrl?: string;
  content: {
    directBookingLabel: string;
    directBookingTitle: string;
    directBookingDescription: string;
    directBookingButton: string;
  };
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function DirectBookingCard({
  className,
  variant = "inline",
  whatsappUrl,
  content,
  headingLevel = "h2",
}: DirectBookingCardProps) {
  const Icon = resolveIcon("Whatsapp");
  const HeadingTag = headingLevel;

  if (variant === "inline") {
    return (
      <div className={cn(
        "group relative flex flex-col sm:flex-row items-center justify-between glass-panel rounded-[var(--radius-3xl)] p-card gap-8 w-full overflow-hidden transition-all duration-500 hover:border-[var(--brand-primary)]/40 hover:shadow-2xl hover:shadow-[var(--brand-primary)]/10",
        className
      )}>
        {/* Radial brand glow emanating from top-left */}
        <div className="absolute -top-12 -left-12 size-64 rounded-full bg-[var(--brand-primary)] opacity-[0.07] blur-3xl pointer-events-none transition-all duration-700 group-hover:opacity-[0.13] group-hover:scale-110" />

        {/* Secondary accent glow bottom-right */}
        <div className="absolute -bottom-8 -right-8 size-48 rounded-full bg-[var(--brand-accent)] opacity-[0.05] blur-2xl pointer-events-none transition-all duration-700 group-hover:opacity-[0.09]" />

        {/* Animated shimmer sweep */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[var(--radius-3xl)]">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12" />
        </div>



        {/* Top border highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)]/40 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row flex-1 items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
          {/* Icon with pulsing ring */}
          <div className="relative shrink-0">
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-[var(--radius-2xl)] bg-[var(--brand-primary)]/10 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
            <div className="flex size-16 shrink-0 items-center justify-center rounded-[var(--radius-2xl)] bg-white text-[var(--brand-primary)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--brand-primary)] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[var(--brand-primary)]/20 dark:bg-white/5 dark:text-[var(--brand-accent)] dark:group-hover:bg-[var(--brand-primary)]">
              <Icon className="size-8 transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <SectionLabel variant="emerald" className="mx-auto sm:mx-0">
              {content.directBookingLabel}
            </SectionLabel>
            <HeadingTag className="heading-item text-xl sm:text-2xl text-[var(--text-heading)] dark:text-white" style={{ textWrap: 'balance' } as React.CSSProperties}>
              {content.directBookingTitle}
            </HeadingTag>
            <p className="text-card-body max-w-2xl mx-auto sm:mx-0 leading-relaxed transition-colors group-hover:text-[var(--text-body)] dark:text-white/80 dark:group-hover:text-white">
              {content.directBookingDescription}
            </p>
          </div>
        </div>

        {/* Button with floating glow */}
        <div className="relative z-10 shrink-0 w-full sm:w-auto">
          <div className="absolute -inset-2 rounded-full bg-[var(--brand-primary)]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "whatsapp" }),
              "relative w-full sm:w-auto h-14 rounded-[var(--radius-full)] px-8 text-base font-semibold tracking-tight transition-all duration-500 hover:scale-[1.05] shadow-whatsapp active:scale-95"
            )}
          >
            {content.directBookingButton}
          </a>
        </div>
      </div>
    );
  }

  // "Block" variant for vertical layouts (mobile column)
  return (
    <div className={cn(
      "group relative glass-panel rounded-[var(--radius-3xl)] p-card overflow-hidden transition-all duration-500 hover:border-[var(--brand-primary)]/40 hover:shadow-2xl hover:shadow-[var(--brand-primary)]/10",
      className
    )}>
      {/* Radial brand glow */}
      <div className="absolute -top-8 -left-8 size-48 rounded-full bg-[var(--brand-primary)] opacity-[0.08] blur-2xl pointer-events-none transition-all duration-700 group-hover:opacity-[0.14] group-hover:scale-110" />

      {/* Bottom-right accent */}
      <div className="absolute -bottom-6 -right-6 size-36 rounded-full bg-[var(--brand-accent)] opacity-[0.05] blur-xl pointer-events-none transition-all duration-700 group-hover:opacity-[0.10]" />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[var(--radius-3xl)]">
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent skew-x-12" />
      </div>



      {/* Top border highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)]/40 to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-center gap-5 mb-6">
        {/* Icon with pulsing ring */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-[var(--brand-primary)]/10 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
          <div className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-white text-[var(--brand-primary)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--brand-primary)] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[var(--brand-primary)]/20 dark:bg-white/5 dark:text-[var(--brand-accent)] dark:group-hover:bg-[var(--brand-primary)]">
            <Icon className="size-6 transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>
        <SectionLabel variant="emerald">
          {content.directBookingLabel}
        </SectionLabel>
      </div>

      <div className="relative z-10 space-y-3">
        <HeadingTag className="heading-item text-xl text-[var(--text-heading)] dark:text-white" style={{ textWrap: 'balance' } as React.CSSProperties}>
          {content.directBookingTitle}
        </HeadingTag>
        <p className="text-card-body leading-relaxed transition-colors group-hover:text-[var(--text-body)] dark:text-white/80 dark:group-hover:text-white">
          {content.directBookingDescription}
        </p>
      </div>

      {/* Button with floating glow */}
      <div className="relative z-10 mt-5">
        <div className="absolute -inset-1 rounded-full bg-[var(--brand-primary)]/15 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "whatsapp" }),
            "relative w-full h-12 rounded-[var(--radius-full)] px-10 text-[16px] font-semibold tracking-tight transition-all duration-500 hover:scale-[1.03] shadow-whatsapp active:scale-95"
          )}
        >
          {content.directBookingButton}
        </a>
      </div>
    </div>
  );
}
