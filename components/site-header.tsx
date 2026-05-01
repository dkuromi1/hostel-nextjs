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
import type { BusinessChannel } from "@/lib/site-data";

export interface SiteHeaderProps {
  navLinks: { href: string; label: string }[];
  contactChannels: BusinessChannel[];
  bookingChannels: BusinessChannel[];
  siteName: string;
  siteAddressSummary: string;
  volunteersNeeded: boolean;
  whatsappUrl?: string;
  phoneRaw: string;
}

export function SiteHeader({ navLinks, contactChannels, bookingChannels, siteName, siteAddressSummary, volunteersNeeded, whatsappUrl, phoneRaw }: SiteHeaderProps) {
  const scrollY = useScrollPosition();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const primaryContactChannel =
    contactChannels.find((channel) => channel.stylePriority === "primary") ?? contactChannels[0];

  const isScrolled = scrollY > 50;

  // On the homepage, if not scrolled, we want it transparent with white text
  const isTransparent = isHome && !isScrolled;

  const containerClasses = cn(
    "z-50 pt-safe transition-all duration-300",
    isTransparent ? "absolute inset-x-0 top-0" : (isHome ? "fixed inset-x-0 top-0" : "sticky top-0")
  );

  return (
    <div className={containerClasses}>
      <VolunteerBanner volunteersNeeded={volunteersNeeded} whatsappUrl={whatsappUrl} phoneRaw={phoneRaw} />
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
                alt={`${siteName} logo`}
                fill
                className="object-cover"
                sizes="44px"
                priority
                unoptimized
              />
            </div>
            <div>
              <p className={cn(
                "font-heading text-lg leading-none tracking-[-0.05em] transition-colors",
                isTransparent ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]" : "text-[var(--text-heading)]"
              )}>
                {siteName}
              </p>
              <p className={cn(
                "mt-1 text-xs uppercase tracking-[0.24em] transition-colors",
                isTransparent ? "text-[var(--brand-accent)]" : "text-[var(--text-muted)]"
              )}>
                {siteAddressSummary}
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
                  buttonVariants({
                    variant: primaryContactChannel.icon === "whatsapp" ? "whatsapp" : "default",
                    size: "sm",
                  }),
                  "h-9 rounded-full px-4 transition-all duration-300 hover:scale-[1.02] active:scale-95",
                  primaryContactChannel.icon === "whatsapp"
                    ? "shadow-whatsapp"
                    : "shadow-sm"
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
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-9 rounded-full border border-[var(--border)] bg-transparent text-[var(--text-heading)] transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-[var(--muted)]",
                    isTransparent
                      ? "border-white/10 bg-[var(--surface-dark)]/20 text-white hover:bg-[var(--surface-dark)]/40 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]"
                      : channel.icon === "hostelworld"
                        ? "border-orange-200/80 bg-orange-50/90 text-orange-900 hover:bg-orange-100/90 dark:border-orange-900/30 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/40 shadow-[0_0_12px_-3px_rgba(251,146,60,0.4)] dark:shadow-[0_0_12px_-3px_rgba(251,146,60,0.2)]"
                        : "border-border bg-muted/95 text-foreground hover:bg-muted"
                  )}
                >
                  <ChannelIcon iconKey={channel.icon} iconOnly />
                </a>
              ))}
              <ThemeToggle variant="header" />
            </div>
          </div>

          <MobileNav navLinks={navLinks} contactChannels={contactChannels} bookingChannels={bookingChannels} />
        </div>
      </header>
    </div>
  );
}
