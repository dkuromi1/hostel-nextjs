import Link from "next/link";
import { MessageCircleMore, MapPinned } from "lucide-react";

import { InstagramGlyph } from "@/components/instagram-glyph";
import { PwaInstallButton } from "@/components/pwa-install-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, siteConfig } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-slate-950 py-14 text-slate-200 pb-24 lg:pb-14">
      <div className="shell-container flex flex-col justify-between gap-10 xl:flex-row">
        <div className="space-y-5 xl:flex-1">
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-300/90">
            {siteConfig.tagline}
          </p>
          <h2 className="heading-section text-white md:text-5xl">
            Stay central, sleep properly, and book fast.
          </h2>
          <p className="max-w-[62ch] text-body-lg text-slate-300">
            Scodrinon Hostel sits on Kolë Idromeno Street, right in the middle
            of Shkoder&apos;s cafe life, rich local culture, and gateway to adventure. Message on
            WhatsApp for the quickest direct booking response.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-emerald-800"
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
            </a>
            <a
              href={siteConfig.hostelworldUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 font-semibold text-slate-100 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:border-white/35"
            >
              Hostelworld
            </a>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-[20%_auto_1fr] xl:gap-10 xl:max-w-[750px] shrink min-w-0">
          {/* Explore */}
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-200">
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

          {/* WhatsApp Community Section */}
          <div className="flex flex-col items-start gap-4 min-w-0">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-200">
              Community
            </p>
            {/* Desktop QR Code */}
            <div className="hidden sm:flex flex-col items-center gap-3 rounded-2xl bg-white/5 p-4 border border-white/10 w-full max-w-[160px]">
              <div className="relative size-full aspect-square overflow-hidden rounded-xl bg-white p-2">
                <img
                  src="/images/whatsapp_community_qr.png"
                  alt="WhatsApp Community QR Code"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-slate-300 text-center">
                Scan to join the guest group chat
              </span>
            </div>
            {/* Mobile Link Button */}
            <a
              href={siteConfig.whatsappCommunityUrl}
              target="_blank"
              rel="noreferrer"
              className="sm:hidden flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-emerald-700 w-full justify-center shadow-[0_0_20px_rgba(5,150,105,0.3)] shadow-emerald-600/20"
            >
              <MessageCircleMore className="size-5 shrink-0" />
              Join the Chat
            </a>
          </div>

          {/* Details */}
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-200">
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
      <div className="shell-container mt-16 border-t border-white/5 pt-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400/80">
            <ThemeToggle />
            <PwaInstallButton />
            <span>Built in Next.js 16 & Tailwind 4 by hostel volunteer Darryl 🇨🇦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
