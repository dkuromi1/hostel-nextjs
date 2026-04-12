"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BookingComLogo, HostelworldLogo } from "@/components/brand-logos";
import { MobileNav } from "@/components/mobile-nav";
import { VolunteerBanner } from "@/components/volunteer-banner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/site-data";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On the homepage, if not scrolled, we want it transparent with white text
  const isTransparent = isHome && !isScrolled;

  return (
    <div className={cn(
      "z-50 pt-safe transition-all duration-300",
      isTransparent ? "absolute inset-x-0 top-0" : "sticky top-0"
    )}>
      <VolunteerBanner />
      <header className={cn(
        "transition-all duration-300",
        isTransparent 
          ? "bg-transparent border-transparent" 
          : "border-b border-white/70 bg-white/80 backdrop-blur-xl"
      )}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-95">
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
              <p className={cn(
                "font-heading text-lg leading-none tracking-[-0.05em] transition-colors",
                isTransparent ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]" : "text-slate-950"
              )}>
                {siteConfig.name}
              </p>
              <p className={cn(
                "mt-1 text-xs uppercase tracking-[0.24em] transition-colors",
                isTransparent ? "text-emerald-300" : "text-slate-500"
              )}>
                Shkodër, Albania
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative inline-block rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95",
                    isTransparent 
                      ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:text-white" 
                      : "text-slate-600 hover:bg-white hover:text-slate-950",
                    isActive && "after:absolute after:bottom-1.5 after:left-4 after:right-4 after:h-[1px] after:rounded-full after:bg-current after:transition-all after:duration-300"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: "sm" }),
                "h-9 rounded-full bg-emerald-700 px-4 text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-emerald-800"
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
                  "size-9 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95",
                  isTransparent 
                    ? "border-white/10 bg-slate-950/20 text-white hover:bg-slate-950/40" 
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
                  "size-9 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95",
                  isTransparent 
                    ? "border-white/10 bg-slate-950/20 text-white hover:bg-slate-950/40" 
                    : "border-orange-200/80 bg-orange-50/90 text-orange-900 hover:bg-orange-100/90"
                )}
              >
                <HostelworldLogo iconOnly />
              </a>
            </div>
          </div>

          <MobileNav />
        </div>
      </header>
    </div>
  );
}

