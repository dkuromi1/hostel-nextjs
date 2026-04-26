import { SectionLabel } from "@/components/ui/section-label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig, siteCopyContent } from "@/lib/site-data";

interface DirectBookingCardProps {
  className?: string;
  variant?: "inline" | "block";
}

/**
 * A unified Direct Booking card for WhatsApp.
 * Handles the responsive text swapping and consistent styling.
 */
export function DirectBookingCard({ className, variant = "inline" }: DirectBookingCardProps) {
  const content = siteCopyContent.home.atmosphere;

  if (variant === "inline") {
    return (
      <div className={cn(
        "flex flex-col sm:flex-row items-center justify-between glass-panel rounded-[28px] p-6 gap-6 w-full",
        className
      )}>
        <div className="text-center sm:text-left">
          <SectionLabel variant="emerald" className="mb-4 mx-auto sm:mx-0">
            {content.directBookingLabel}
          </SectionLabel>
          <p className="mt-2 font-heading text-xl sm:text-2xl leading-tight tracking-tight text-[var(--text-heading)]">
            {content.directBookingTitle}
          </p>
          <p className="mt-2 text-card-body max-w-md mx-auto sm:mx-0">
            {content.directBookingDescription}
          </p>
        </div>
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "shrink-0 w-full sm:w-auto rounded-full bg-[var(--brand-whatsapp)] px-7 font-semibold text-white transition-all duration-300 hover:bg-[var(--brand-whatsapp-dark)] active:scale-95"
          )}
        >
          {content.directBookingButton}
        </a>
      </div>
    );
  }

  // "Block" variant for vertical layouts (mobile column)
  return (
    <div className={cn("glass-panel rounded-[28px] p-5", className)}>
      <SectionLabel variant="emerald" className="mb-4">
        {content.directBookingLabel}
      </SectionLabel>
      <p className="mt-2 font-heading text-lg leading-tight tracking-tight text-[var(--text-heading)]">
        <span className="sm:hidden">{content.directBookingTitleMobile}</span>
        <span className="hidden sm:inline">{content.directBookingTitle}</span>
      </p>
      <p className="mt-2 text-xs leading-relaxed text-[var(--text-body-subtle)]">
        <span className="sm:hidden">{content.directBookingDescriptionMobile}</span>
        <span className="hidden sm:inline">{content.directBookingDescription}</span>
      </p>
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={cn(
          buttonVariants({ size: "sm" }),
          "mt-4 w-full rounded-full bg-[var(--brand-whatsapp)] font-semibold text-white transition-all duration-300 hover:bg-[var(--brand-whatsapp-dark)] active:scale-95"
        )}
      >
        {content.directBookingButton}
      </a>
    </div>
  );
}
