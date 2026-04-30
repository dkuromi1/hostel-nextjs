import { ChannelIcon } from "@/components/channel-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BusinessChannel } from "@/lib/site-data";

export type BookingActionsProps = {
  className?: string;
  compact?: boolean;
  whatsappOnly?: boolean;
  bookingChannels: BusinessChannel[];
  contactChannels: BusinessChannel[];
};

export function BookingActions({
  className,
  compact = false,
  whatsappOnly = false,
  bookingChannels,
  contactChannels,
}: BookingActionsProps) {
  const primaryContactChannel =
    contactChannels.find((channel) => channel.stylePriority === "primary") ?? contactChannels[0];

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap",
        compact && "sm:flex-nowrap",
        className
      )}
    >
      {primaryContactChannel ? (
        <a
          href={primaryContactChannel.url}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ size: compact ? "sm" : "lg" }),
            "h-auto min-h-12 rounded-full px-5 py-3 text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95",
            primaryContactChannel.icon === "whatsapp" 
              ? "bg-[var(--brand-whatsapp)] text-white shadow-[0_18px_40px_-24px_rgba(5,150,105,0.6)] hover:bg-[var(--brand-whatsapp-dark)]"
              : "bg-[var(--brand-primary)] text-[var(--primary-foreground)] shadow-[0_18px_40px_-24px_rgba(5,150,105,0.6)] hover:bg-[var(--brand-primary-dark)]"
          )}
        >
          <ChannelIcon iconKey={primaryContactChannel.icon} iconOnly />
          <span>{primaryContactChannel.label}</span>
        </a>
      ) : null}
      {!whatsappOnly && bookingChannels.length > 0 && (
        <div className="flex w-full min-w-0 flex-row gap-2 sm:w-auto sm:shrink-0 sm:flex-nowrap sm:gap-3">
          {bookingChannels.map((channel) => (
            <a
              key={channel.id}
              href={channel.url}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: compact ? "sm" : "lg" }),
                "h-auto min-h-12 flex-1 justify-center rounded-full border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-3 text-sm text-[var(--text-heading)] transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-[var(--glass-bg)]/90"
              )}
            >
              <span className="truncate">{channel.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
