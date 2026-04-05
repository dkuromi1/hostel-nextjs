import Image from "next/image";
import Link from "next/link";

import { BookingComLogo, HostelworldLogo } from "@/components/brand-logos";
import { MobileNav } from "@/components/mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2  sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative size-11 overflow-hidden rounded-2xl border border-emerald-700/10 bg-white shadow-[0_12px_30px_-18px_rgba(17,24,39,0.45)]">
            <Image
              src="/logo.png"
              alt="Scodrinon Hostel logo"
              fill
              className="object-cover"
              sizes="44px"
              priority
            />
          </div>
          <div>
            <p className="font-heading text-lg leading-none tracking-[-0.05em] text-slate-950">
              {siteConfig.name}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">
              Shkodër, Albania
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ size: "sm" }),
              "h-9 rounded-full bg-emerald-600 px-4 text-white hover:bg-emerald-700"
            )}
          >
            WhatsApp Booking
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

        <MobileNav />
      </div>
    </header>
  );
}
