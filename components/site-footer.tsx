import Link from "next/link";
import { ArrowUpRight, MessageCircleMore, MapPinned } from "lucide-react";

import { InstagramGlyph } from "@/components/instagram-glyph";
import { navLinks, siteConfig } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-slate-950 px-4 py-14 text-slate-200 sm:px-6 lg:px-8 pb-24 lg:pb-14">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-300/90">
            {siteConfig.tagline}
          </p>
          <h2 className="font-heading text-4xl leading-none tracking-[-0.06em] text-white md:text-5xl">
            Stay central, sleep properly, and book fast.
          </h2>
          <p className="max-w-[62ch] text-base leading-8 text-slate-300">
            Scodrinon Hostel sits on Kole Idromeno Street, right in the middle
            of Shkoder&apos;s cafe life, rich local culture, and gateway to adventure. Message on
            WhatsApp for the quickest direct booking response.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-emerald-700"
            >
              <MessageCircleMore className="size-4" strokeWidth={1.8} />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 font-semibold text-slate-100 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:border-white/35"
            >
              <InstagramGlyph className="size-4" strokeWidth={1.8} />
              Instagram
            </a>
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 font-semibold text-slate-100 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:border-white/35"
            >
              Booking.com
              <ArrowUpRight className="size-4" strokeWidth={1.8} />
            </a>
            <a
              href={siteConfig.hostelworldUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 font-semibold text-slate-100 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:border-white/35"
            >
              Hostelworld
              <ArrowUpRight className="size-4" strokeWidth={1.8} />
            </a>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Explore
            </p>
            <div className="mt-4 grid gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-block text-base text-slate-200 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Details
            </p>
            <div className="mt-4 space-y-3 text-base text-slate-300">
              <p>
                {/* STEP 2: Make the address a clickable Google Maps link */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.name + " " + siteConfig.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-start gap-2 transition-colors hover:text-white"
                >
                  <MapPinned className="mt-1 size-4 shrink-0 text-emerald-500 transition-transform group-hover:scale-110" />
                  <span className="underline decoration-slate-700 underline-offset-4 group-hover:decoration-slate-400">
                    {siteConfig.location}
                  </span>
                </a>
              </p>
              <p>Free breakfast: {siteConfig.breakfastHours}</p>
              <p>Check-in: {siteConfig.checkInHours}, 24h access (message ahead if arriving after 10pm), luggage storage, rooftop social nights</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
