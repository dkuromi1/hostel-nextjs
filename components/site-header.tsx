import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
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
              Shkoder, Albania
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
              "rounded-full bg-emerald-600 px-4 text-white hover:bg-emerald-700"
            )}
          >
            WhatsApp Booking
          </a>
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full bg-white/80"
            )}
          >
            Booking.com
          </a>
        </div>

        <details className="relative lg:hidden">
          <summary
            aria-label="Open navigation"
            className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-[0_10px_28px_-18px_rgba(17,24,39,0.45)] marker:hidden [&::-webkit-details-marker]:hidden"
          >
            <Menu className="size-5" strokeWidth={1.9} />
          </summary>

          <div className="absolute right-0 top-full mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-[30px] border border-white/70 bg-white/96 p-4 shadow-[0_28px_80px_-42px_rgba(15,23,42,0.55)]">
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 grid gap-3 border-t border-slate-200 pt-4">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
                  )}
                >
                  Message Us On WhatsApp
                </a>
                <a
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full bg-white/80"
                  )}
                >
                  View On Booking.com
                </a>
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
