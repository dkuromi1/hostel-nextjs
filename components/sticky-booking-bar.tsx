"use client";

import { usePathname } from "next/navigation";
import { useScrollPosition } from "@/lib/use-scroll-position";

import { ChannelIcon } from "@/components/channel-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { bookingChannels, contactChannels } from "@/lib/site-data";

export function StickyBookingBar() {
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
        ? "border-t border-white/5 bg-slate-950/50 backdrop-blur-md"
        : "border-t border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[0_-20px_40px_-30px_var(--glass-shadow)] backdrop-blur"
    )}>
      <div className="mx-auto flex max-w-[1400px] items-center gap-2">
        {primaryContactChannel ? (
          <a
            href={primaryContactChannel.url}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ size: "sm" }),
              "flex h-9 min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-emerald-700 px-3 font-semibold text-white shadow-lg transition hover:bg-emerald-800",
              isTransparent && "bg-emerald-700/90 backdrop-blur-sm"
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
                buttonVariants({ variant: "outline", size: "icon" }),
                "size-9 rounded-full transition-all",
                isTransparent
                  ? "border-white/20 bg-slate-950/20 text-white backdrop-blur-sm hover:bg-slate-950/40"
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
