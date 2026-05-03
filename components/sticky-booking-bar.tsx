"use client";

import { usePathname } from "next/navigation";
import { useScrollPosition } from "@/lib/use-scroll-position";

import { ChannelIcon } from "@/components/channel-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BusinessChannel } from "@/lib/site-data";

export interface StickyBookingBarProps {
  bookingChannels: BusinessChannel[];
  contactChannels: BusinessChannel[];
}

export function StickyBookingBar({ bookingChannels, contactChannels }: StickyBookingBarProps) {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;

  const pathname = usePathname();
  const isHome = pathname === "/";
  const primaryContactChannel =
    contactChannels.find((channel) => channel.stylePriority === "primary") ?? contactChannels[0];
  const quickBookingChannels = bookingChannels.slice(0, 2);

  const isTransparent = isHome && !isScrolled;

  return (
    <div className={cn(
      "fixed inset-x-0 bottom-0 z-40 px-4 pt-[6px] pb-[calc(6px+env(safe-area-inset-bottom,0px))] transition-all duration-300 lg:hidden [transform:translateZ(0)]",
      isTransparent
        ? "border-t border-white/5 bg-[var(--surface-dark)]/50 backdrop-blur-md"
        : "border-t border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[0_-20px_40px_-30px_var(--glass-shadow)] backdrop-blur"
    )}>
      <div className="mx-auto flex max-w-[var(--layout-max-width)] items-center gap-2">
        {primaryContactChannel ? (
          <a
            href={primaryContactChannel.url}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: primaryContactChannel.icon === "whatsapp" ? "whatsapp" : "default",
                size: "sm",
              }),
              "flex h-9 min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 px-3 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95",
              primaryContactChannel.icon === "whatsapp" && "shadow-whatsapp",
              isTransparent && "backdrop-blur-sm"
            )}
          >
            <ChannelIcon iconKey={primaryContactChannel.icon} className="size-4 shrink-0" strokeWidth={1.8} />
            {primaryContactChannel.label}
          </a>
        ) : null}
        <div className="flex shrink-0 items-center gap-1.5">
          {quickBookingChannels.map((channel) => (
            <a
              key={channel.id}
              href={channel.url}
              target="_blank"
              rel="noreferrer"
              aria-label={channel.label}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-9 rounded-full border transition-all duration-300 hover:scale-[1.02] active:scale-95",
                isTransparent
                  ? "border-white/20 bg-[var(--surface-dark)]/20 text-white backdrop-blur-sm hover:bg-[var(--surface-dark)]/40"
                  : "border-[var(--border)] bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80"
              )}
            >
              <ChannelIcon iconKey={channel.icon} iconOnly />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
