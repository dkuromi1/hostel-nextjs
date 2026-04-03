import { MessageCircleMore } from "lucide-react";

import { siteConfig } from "@/lib/site-data";

export function StickyBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/80 bg-white/92 px-4 py-3 shadow-[0_-20px_40px_-30px_rgba(15,23,42,0.45)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3">
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <MessageCircleMore className="size-4" strokeWidth={1.8} />
          WhatsApp
        </a>
        <a
          href={siteConfig.bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Booking.com
        </a>
      </div>
    </div>
  );
}
