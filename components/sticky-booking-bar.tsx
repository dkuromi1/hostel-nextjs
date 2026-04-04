import { MessageCircleMore } from "lucide-react";

import { BookingComLogo, HostelworldLogo } from "@/components/brand-logos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-data";

export function StickyBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/80 bg-white/92 px-4 py-3 shadow-[0_-20px_40px_-30px_rgba(15,23,42,0.45)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-[1400px] items-center gap-2">
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ size: "sm" }),
            "flex h-9 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 px-3 font-semibold text-white transition hover:bg-emerald-700"
          )}
        >
          <MessageCircleMore className="size-4 shrink-0" strokeWidth={1.8} />
          WhatsApp
        </a>
        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Book on Booking.com"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "size-9 rounded-full border-blue-200/80 bg-blue-50/95 text-blue-950 hover:bg-blue-100/95"
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
              "size-9 rounded-full border-orange-200/80 bg-orange-50/90 text-orange-900 hover:bg-orange-100/90"
            )}
          >
            <HostelworldLogo iconOnly />
          </a>
        </div>
      </div>
    </div>
  );
}
