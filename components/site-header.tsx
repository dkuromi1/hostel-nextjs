"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollPosition } from "@/lib/use-scroll-position";

import { ChannelIcon } from "@/components/channel-icon";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { VolunteerBanner } from "@/components/volunteer-banner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { bookingChannels, contactChannels, navLinks, siteConfig } from "@/lib/site-data";

export function SiteHeader() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;

  const pathname = usePathname();
  const isHome = pathname === "/";
  const primaryContactChannel =
    contactChannels.find((channel) => channel.stylePriority === "primary") ?? contactChannels[0];

  // On the homepage, if not scrolled, we want it transparent with white text
  const isTransparent = isHome && !isScrolled;

  return (
    <div className={cn(
      "z-50 pt-safe transition-all duration-300",
      isTransparent ? "absolute inset-x-0 top-0" : (isHome ? "fixed inset-x-0 top-0" : "sticky top-0")
    )}>
      <VolunteerBanner />
      <header className={cn(
        "transition-all duration-300",
        isTransparent
          ? "bg-transparent border-transparent"
          : "border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md shadow-sm"
      )}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-95">
            <div className="relative size-11 overflow-hidden rounded-2xl">
              <Image
                src="/logo.webp"
                alt={`${siteConfig.name} logo`}
                fill
                className="object-cover"
                sizes="44px"
                priority
              />
            </div>
            <div>
              <p className={cn(
                "font-heading text-lg leading-none tracking-[-0.05em] transition-colors",
                isTransparent ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]" : "text-[var(--text-heading)]"
              )}>
                {siteConfig.name}
              </p>
              <p className={cn(
                "mt-1 text-xs uppercase tracking-[0.24em] transition-colors",
                isTransparent ? "text-sky-200/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]" : "text-[var(--text-muted)]"
              )}>
                {siteConfig.address.summary}
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
                      : "text-[var(--text-body)] hover:bg-[var(--muted)] hover:text-[var(--text-heading)]",
                    isActive && "after:absolute after:bottom-1.5 after:left-4 after:right-4 after:h-[1px] after:rounded-full after:bg-current after:transition-all after:duration-300"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {primaryContactChannel ? (
              <a
                href={primaryContactChannel.url}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "h-9 rounded-full bg-emerald-700 px-4 text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-emerald-800",
                  isTransparent ? "shadow-[0_8px_25px_-8px_rgba(6,78,59,0.5)]" : "shadow-sm"
                )}
              >
                {primaryContactChannel.label}
              </a>
            ) : null}
            <div className="flex shrink-0 items-center gap-1.5">
              {bookingChannels.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={channel.label}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "size-9 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95",
                    isTransparent
                      ? "border-white/10 bg-slate-950/20 text-white hover:bg-slate-950/40 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]"
                      : channel.icon === "hostelworld"
                        ? "border-orange-200/80 bg-orange-50/90 text-orange-900 hover:bg-orange-100/90"
                        : "border-border bg-muted/95 text-foreground hover:bg-muted"
                  )}
                >
                  <ChannelIcon iconKey={channel.icon} iconOnly />
                </a>
              ))}
              <ThemeToggle variant="header" />
            </div>
          </div>

          <MobileNav />
        </div>
      </header>
    </div>
  );
}
