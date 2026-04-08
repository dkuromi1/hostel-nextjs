import { ArrowUpRight, MessageCircleMore } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-data";

type BookingActionsProps = {
  className?: string;
  compact?: boolean;
  whatsappOnly?: boolean;
};

export function BookingActions({
  className,
  compact = false,
  whatsappOnly = false,
}: BookingActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap",
        compact && "sm:flex-nowrap",
        className
      )}
    >
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={cn(
          buttonVariants({ size: compact ? "sm" : "lg" }),
          "h-auto min-h-12 rounded-full bg-emerald-600 px-5 py-3 text-sm text-white shadow-[0_18px_40px_-24px_rgba(5,150,105,0.8)] transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-emerald-700"
        )}
      >
        <MessageCircleMore className="size-4" strokeWidth={1.8} />
        <span>Message Us On WhatsApp</span>
      </a>
      {!whatsappOnly && (
        <div className="flex w-full min-w-0 flex-row gap-2 sm:w-auto sm:shrink-0 sm:flex-nowrap sm:gap-3">
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: compact ? "sm" : "lg" }),
              "h-auto min-h-12 flex-1 justify-center rounded-full border-white/70 bg-white/80 px-3 py-3 text-sm text-slate-900 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-white"
            )}
          >
            <span className="truncate">Booking.com</span>
            <ArrowUpRight className="size-4 shrink-0" strokeWidth={1.8} />
          </a>
          <a
            href={siteConfig.hostelworldUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: compact ? "sm" : "lg" }),
              "h-auto min-h-12 flex-1 justify-center rounded-full border-white/70 bg-white/80 px-3 py-3 text-sm text-slate-900 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-white"
            )}
          >
            <span className="truncate">Hostelworld</span>
            <ArrowUpRight className="size-4 shrink-0" strokeWidth={1.8} />
          </a>
        </div>
      )}
    </div>
  );
}
