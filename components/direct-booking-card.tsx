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
}

export function DirectBookingCard({ className, variant = "inline", whatsappUrl, content }: DirectBookingCardProps) {
  const Icon = resolveIcon("Whatsapp");

  if (variant === "inline") {
    return (
      <div className={cn(
        "group relative flex flex-col sm:flex-row items-center justify-between glass-panel rounded-3xl p-6 sm:p-8 gap-8 w-full overflow-hidden transition-all duration-500 hover:border-[var(--brand-primary)]/20 hover:shadow-md",
        className
      )}>
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="hidden sm:flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--brand-primary)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-300 group-hover:bg-[var(--brand-primary)] group-hover:text-white dark:bg-white/5 dark:text-[var(--brand-accent)] dark:group-hover:bg-[var(--brand-primary)]">
            <Icon className="size-7" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-2">
            <SectionLabel variant="emerald" className="mx-auto sm:mx-0">
              {content.directBookingLabel}
            </SectionLabel>
        <h3 className="text-2xl sm:text-3xl font-heading font-bold leading-tight text-[var(--text-heading)] dark:text-white">
          {content.directBookingTitle}
        </h3>
            <p className="text-card-body max-w-md mx-auto sm:mx-0 transition-colors group-hover:text-[var(--text-body)] dark:text-white/80 dark:group-hover:text-white">
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
            "relative z-10 shrink-0 w-full sm:w-auto h-12 rounded-full px-10 text-base font-bold transition-all duration-300 hover:scale-[1.02] shadow-whatsapp"
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
      "group relative glass-panel rounded-3xl p-6 overflow-hidden transition-all duration-500 hover:border-[var(--brand-primary)]/20 hover:shadow-md", 
      className
    )}>
      <div className="relative z-10 flex items-center gap-4 mb-5">
        <div className="hidden sm:flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--brand-primary)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-300 group-hover:bg-[var(--brand-primary)] group-hover:text-white dark:bg-white/5 dark:text-[var(--brand-accent)] dark:group-hover:bg-[var(--brand-primary)]">
          <Icon className="size-6" strokeWidth={1.5} />
        </div>
        <SectionLabel variant="emerald">
          {content.directBookingLabel}
        </SectionLabel>
      </div>
      <div className="relative z-10 space-y-2">
        <h3 className="text-2xl font-heading font-bold leading-tight text-[var(--text-heading)] dark:text-white">
          {content.directBookingTitle}
        </h3>
        <p className="text-card-body transition-colors group-hover:text-[var(--text-body)] dark:text-white/80 dark:group-hover:text-white">
          {content.directBookingDescription}
        </p>
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={cn(
          buttonVariants({ variant: "whatsapp" }),
          "relative z-10 mt-6 w-full h-11 rounded-full px-10 text-[15px] font-bold transition-all duration-300 hover:scale-[1.02] shadow-whatsapp"
        )}
      >
        {content.directBookingButton}
      </a>
    </div>
  );
}
