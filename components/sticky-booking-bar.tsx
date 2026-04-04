import { MessageCircleMore } from "lucide-react";

import { siteConfig } from "@/lib/site-data";

export function StickyBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/80 bg-white/92 px-4 py-3 shadow-[0_-20px_40px_-30px_rgba(15,23,42,0.45)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-[1400px] items-stretch gap-2">
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <MessageCircleMore className="size-4 shrink-0" strokeWidth={1.8} />
          WhatsApp
        </a>
        <div className="flex min-w-[10.875rem] flex-col gap-1">
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-blue-200/80 bg-blue-50/95 px-2 py-1.5 text-center text-xs font-semibold leading-tight text-blue-950 transition hover:bg-blue-100/95"
          >
            Booking.com
          </a>
          <a
            href={siteConfig.hostelworldUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-orange-200/90 bg-orange-50/95 px-2 py-1.5 text-center text-xs font-semibold leading-tight text-orange-950 transition hover:bg-orange-100"
          >
            Hostelworld
          </a>
        </div>
      </div>
    </div>
  );
}
