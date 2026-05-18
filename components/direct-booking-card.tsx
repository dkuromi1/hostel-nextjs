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
        "group relative flex flex-col sm:flex-row items-center justify-between glass-panel rounded-3xl p-card gap-8 w-full overflow-hidden transition-all duration-500 hover:border-[var(--brand-primary)]/30 hover:shadow-xl hover:shadow-[var(--brand-primary)]/5",
        className
      )}>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] soft-grid" />

        <div className="relative z-10 flex flex-col sm:flex-row flex-1 items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--brand-primary)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--brand-primary)] group-hover:text-white dark:bg-white/5 dark:text-[var(--brand-accent)] dark:group-hover:bg-[var(--brand-primary)]">
            <Icon className="size-8 transition-transform duration-500" />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <SectionLabel variant="emerald" className="mx-auto sm:mx-0">
              {content.directBookingLabel}
            </SectionLabel>
            <HeadingTag className="heading-item text-xl sm:text-2xl text-[var(--text-heading)] dark:text-white">
              {content.directBookingTitle}
            </HeadingTag>
            <p className="text-card-body max-w-2xl mx-auto sm:mx-0 leading-relaxed transition-colors group-hover:text-[var(--text-body)] dark:text-white/80 dark:group-hover:text-white">
              {content.directBookingDescription}
            </p>
          </div>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "whatsapp" }),
            "relative z-10 shrink-0 w-full sm:w-auto h-14 rounded-full px-8 text-base font-semibold tracking-tight transition-all duration-500 hover:scale-[1.05] shadow-whatsapp active:scale-95"
          )}
        >
          {content.directBookingButton}
        </a>
      </div>
    );
  }

  // "Block" variant for vertical layouts (mobile column)
  return (
    <div className={cn(
      "group relative glass-panel rounded-3xl p-card overflow-hidden transition-all duration-500 hover:border-[var(--brand-primary)]/30 hover:shadow-xl hover:shadow-[var(--brand-primary)]/5",
      className
    )}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] soft-grid" />

      <div className="relative z-10 flex items-center gap-5 mb-6">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--brand-primary)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--brand-primary)] group-hover:text-white dark:bg-white/5 dark:text-[var(--brand-accent)] dark:group-hover:bg-[var(--brand-primary)]">
          <Icon className="size-6 transition-transform duration-500" />
        </div>
        <SectionLabel variant="emerald">
          {content.directBookingLabel}
        </SectionLabel>
      </div>
      <div className="relative z-10 space-y-3">
        <HeadingTag className="heading-item text-xl text-[var(--text-heading)] dark:text-white">
          {content.directBookingTitle}
        </HeadingTag>
        <p className="text-card-body leading-relaxed transition-colors group-hover:text-[var(--text-body)] dark:text-white/80 dark:group-hover:text-white">
          {content.directBookingDescription}
        </p>
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={cn(
          buttonVariants({ variant: "whatsapp" }),
          "relative z-10 mt-8 w-full h-12 rounded-full px-10 text-[16px] font-semibold tracking-tight transition-all duration-500 hover:scale-[1.03] shadow-whatsapp active:scale-95"
        )}
      >
        {content.directBookingButton}
      </a>
    </div>
  );
}
