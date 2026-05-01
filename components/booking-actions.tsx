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
            buttonVariants({ variant: "whatsapp", size: compact ? "sm" : "lg" }),
            "h-auto min-h-12 rounded-full px-5 py-3 text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-whatsapp"
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
                buttonVariants({ variant: "ghost", size: compact ? "sm" : "lg" }),
                "h-auto min-h-12 flex-1 justify-center border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-3 text-sm text-[var(--text-heading)] transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-[var(--glass-bg)]/90"
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
