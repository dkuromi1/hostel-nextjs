"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useScrollPosition } from "@/lib/use-scroll-position";
import { MessageCircleMore } from "lucide-react";

import { BookingComLogo, HostelworldLogo } from "@/components/brand-logos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-data";

export function StickyBookingBar() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;

  const pathname = usePathname();
  const isHome = pathname === "/";

  const isTransparent = isHome && !isScrolled;

  return (
    <div className={cn(
      "fixed inset-x-0 bottom-0 z-40 px-4 pt-[6px] pb-[calc(6px+env(safe-area-inset-bottom,0px))] transition-all duration-300 lg:hidden [transform:translateZ(0)]",
      isTransparent
        ? "border-t border-white/5 bg-slate-950/50 backdrop-blur-md"
        : "border-t border-white/80 bg-white/92 shadow-[0_-20px_40px_-30px_rgba(15,23,42,0.45)] backdrop-blur"
    )}>
      <div className="mx-auto flex max-w-[1400px] items-center gap-2">
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ size: "sm" }),
            "flex h-9 min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-emerald-700 px-3 font-semibold text-white shadow-lg transition hover:bg-emerald-800",
            isTransparent && "bg-emerald-700/90 backdrop-blur-sm"
          )}
        >
          <MessageCircleMore className="size-4 shrink-0" strokeWidth={1.8} />
          Book on WhatsApp
        </a>
        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Book on Booking.com"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "size-9 rounded-full transition-all",
              isTransparent
                ? "border-white/20 bg-slate-950/20 text-white backdrop-blur-sm hover:bg-slate-950/40"
                : "border-blue-200/80 bg-blue-50/95 text-blue-950 hover:bg-blue-100/95"
            )}
          >
            <BookingComLogo iconOnly />
          </a>
          <a
            href={siteConfig.hostelworldUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Book on Hostelworld"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "size-9 rounded-full transition-all",
              isTransparent
                ? "border-white/20 bg-slate-950/20 text-white backdrop-blur-sm hover:bg-slate-950/40"
                : "border-orange-200/80 bg-orange-50/90 text-orange-900 hover:bg-orange-100/90"
            )}
          >
            <HostelworldLogo iconOnly />
          </a>
        </div>
      </div>
    </div>
  );
}
