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
    directBookingTitleMobile?: string;
    directBookingDescription: string;
    directBookingDescriptionMobile?: string;
    directBookingButton: string;
  };
}

export function DirectBookingCard({ className, variant = "inline", whatsappUrl, content }: DirectBookingCardProps) {
  const Icon = resolveIcon("Whatsapp");

  if (variant === "inline") {
    return (
      <div className={cn(
        "group flex flex-col sm:flex-row items-center justify-between glass-panel rounded-2xl p-6 sm:p-8 gap-8 w-full transition-all duration-300 hover:border-[var(--brand-primary)]/20",
        className
      )}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--glass-bg)] text-[var(--brand-primary)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-300 group-hover:bg-[var(--brand-primary-light)] group-hover:ring-[var(--brand-primary)]/20">
            <Icon className="size-6" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-2">
            <SectionLabel variant="emerald" className="mx-auto sm:mx-0">
              {content.directBookingLabel}
            </SectionLabel>
            <h3 className="font-heading text-xl sm:text-2xl leading-tight tracking-tight text-[var(--text-heading)]">
              {content.directBookingTitle}
            </h3>
            <p className="text-[14px] leading-snug text-[var(--text-body-subtle)] max-w-md mx-auto sm:mx-0">
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
            "shrink-0 w-full sm:w-auto h-12 rounded-full px-10 text-[15px] font-bold transition-all duration-300 hover:scale-[1.02] shadow-whatsapp"
          )}
        >
          {content.directBookingButton}
        </a>
      </div>
    );
  }

  // "Block" variant for vertical layouts (mobile column)
  return (
    <div className={cn("group glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-[var(--brand-primary)]/20", className)}>
      <div className="flex items-center gap-4 mb-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--glass-bg)] text-[var(--brand-primary)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-300 group-hover:bg-[var(--brand-primary-light)] group-hover:ring-[var(--brand-primary)]/20">
          <Icon className="size-5" strokeWidth={1.5} />
        </div>
        <SectionLabel variant="emerald">
          {content.directBookingLabel}
        </SectionLabel>
      </div>
      <div className="space-y-2">
        <h3 className="font-heading text-xl leading-tight tracking-tight text-[var(--text-heading)]">
          <span className="sm:hidden">{content.directBookingTitleMobile || content.directBookingTitle}</span>
          <span className="hidden sm:inline">{content.directBookingTitle}</span>
        </h3>
        <p className="text-[13px] leading-snug text-[var(--text-body-subtle)]">
          <span className="sm:hidden">{content.directBookingDescriptionMobile || content.directBookingDescription}</span>
          <span className="hidden sm:inline">{content.directBookingDescription}</span>
        </p>
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={cn(
          buttonVariants({ variant: "whatsapp" }),
          "mt-6 w-full h-11 rounded-full px-10 text-[14px] font-bold transition-all duration-300 hover:scale-[1.02] shadow-whatsapp"
        )}
      >
        {content.directBookingButton}
      </a>
    </div>
  );
}
