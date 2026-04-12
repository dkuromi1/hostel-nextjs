"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/site-data";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      const el = containerRef.current;
      if (el && !el.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-haspopup="true"
        className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-[0_10px_28px_-18px_rgba(17,24,39,0.45)]"
      >
        <Menu className="size-5" strokeWidth={1.9} />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-[30px] border border-white/70 bg-white/96 p-4 shadow-[0_28px_80px_-42px_rgba(15,23,42,0.55)]">
          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                    isActive 
                      ? "bg-emerald-50 text-slate-900 font-semibold" 
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 grid gap-3 border-t border-slate-200 pt-4">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-10 rounded-full bg-emerald-700 text-white hover:bg-emerald-800"
                )}
              >
                Message Us On WhatsApp
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-2xl border-slate-200 bg-transparent text-blue-900 transition-colors hover:bg-slate-50"
                  )}
                >
                  Booking.com
                </a>
                <a
                  href={siteConfig.hostelworldUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-2xl border-slate-200 bg-transparent text-orange-900 transition-colors hover:bg-slate-50"
                  )}
                >
                  Hostelworld
                </a>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
