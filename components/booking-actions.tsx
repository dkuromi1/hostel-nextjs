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
  forceLight?: boolean;
};

export function BookingActions({
  className,
  compact = false,
  whatsappOnly = false,
  bookingChannels,
  contactChannels,
  forceLight = false,
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
                "h-auto min-h-12 flex-1 rounded-full justify-center border px-3 py-3 text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95",
                forceLight 
                  ? "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50"
                  : "border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-heading)] hover:bg-[var(--glass-bg)]/90"
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
