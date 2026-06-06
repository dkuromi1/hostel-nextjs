"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsScrolled } from "@/lib/use-scroll-position";

import { ChannelIcon } from "@/components/channel-icon";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { VolunteerBanner } from "@/components/volunteer-banner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Map as MapIcon } from "@/lib/icon-registry";
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
  mapUrl?: string;
}

export function SiteHeader({ navLinks, contactChannels, bookingChannels, siteName, siteAddressSummary, volunteersNeeded, whatsappUrl, phoneRaw, mapUrl }: SiteHeaderProps) {
  const isScrolled = useIsScrolled();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const primaryContactChannel =
    contactChannels.find((channel) => channel.stylePriority === "primary") ?? contactChannels[0];

  // On the homepage, if not scrolled, we want it transparent with white text
  const isTransparent = isHome && !isScrolled;

  const containerClasses = cn(
    "z-50 pt-safe transition-all duration-300",
    isTransparent ? "absolute inset-x-0 top-0" : (isHome ? "fixed inset-x-0 top-0" : "sticky top-0 inset-x-0 w-full")
  );

  return (
    <div className={containerClasses}>
      <VolunteerBanner volunteersNeeded={volunteersNeeded} whatsappUrl={whatsappUrl} phoneRaw={phoneRaw} />
      <header className={cn(
        "transition-all duration-500 ease-in-out",
        isTransparent
          ? "bg-transparent border-transparent"
          : "border-b border-[var(--glass-border)] bg-[var(--glass-bg)]/80 backdrop-blur-xl shadow-sm"
      )}>
        <div className={cn(
          "mx-auto flex max-w-[var(--layout-max-width)] items-center justify-between gap-2 xl:gap-4 px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out",
          isScrolled ? "py-1.5" : "py-3 sm:py-4"
        )}>
          <Link href="/" className="flex shrink-0 items-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-95">
            <div className={cn(
              "relative overflow-hidden rounded-[var(--radius-2xl)] transition-all duration-500 ease-in-out",
              isScrolled ? "size-9" : "size-12 sm:size-14"
            )}>
              <Image
                src="/logo.webp"
                alt={`${siteName} logo`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 36px, 56px"
                priority
                unoptimized
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className={cn(
                "font-heading font-normal leading-none transition-all duration-500 ease-in-out",
                isScrolled ? "text-lg" : "text-xl sm:text-[22px]",

                isTransparent ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]" : "text-[var(--text-heading)]"
              )}>

                {siteName}
              </p>
              <p className={cn(
                "uppercase tracking-[0.24em] transition-all duration-500 ease-in-out overflow-hidden",
                isScrolled ? "h-0 opacity-0 mt-0" : "h-auto opacity-100 mt-1.5 text-[10px] sm:text-xs",
                isTransparent ? "text-[var(--brand-accent)]" : "text-[var(--text-muted)]"
              )}>
                {siteAddressSummary}
              </p>
            </div>
          </Link>


          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const isExperiences = item.label.toLowerCase() === "experiences";

              return (
                <div key={item.href} className="flex items-center gap-1">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative inline-block rounded-full px-3 xl:px-4 text-sm font-medium transition-all duration-500 ease-in-out hover:scale-[1.02] active:scale-95",
                      isScrolled ? "py-1.5" : "py-2.5",
                      isTransparent
                        ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:text-white"
                        : "text-[var(--text-body)] hover:bg-[var(--muted)] hover:text-[var(--text-heading)]",
                      isActive && "after:absolute after:bottom-1 after:left-4 after:right-4 after:h-[1px] after:rounded-full after:bg-current after:transition-all after:duration-500"
                    )}
                  >
                    {item.label}
                  </Link>
                  {isExperiences && mapUrl ? (
                    <Link
                      href={mapUrl}
                      aria-label="View on Custom Map"
                      className={cn(
                        "flex items-center justify-center rounded-full transition-all duration-500 ease-in-out hover:scale-[1.02] active:scale-95",
                        isScrolled ? "size-8 -ml-1.5" : "size-10 -ml-2",
                        isTransparent
                          ? "text-white hover:bg-white/10"
                          : "text-[var(--text-body)] hover:bg-[var(--muted)] hover:text-[var(--text-heading)]"
                      )}
                    >
                      <MapIcon className={cn("transition-all duration-500", isScrolled ? "size-4" : "size-[1.125rem]")} />
                    </Link>
                  ) : null}

                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 xl:gap-3 lg:flex">
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
                    "group size-9 rounded-full border border-[var(--border)] bg-transparent text-[var(--text-heading)] transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-[var(--muted)]",
                    isTransparent
                      ? "border-white/10 bg-[var(--surface-dark)]/20 text-white hover:bg-[var(--surface-dark)]/40 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]"
                      : "border-border bg-muted/95 text-foreground hover:bg-muted"
                  )}
                >
                  <ChannelIcon iconKey={channel.icon} iconOnly monochromeHover />
                </a>
              ))}
              <ThemeToggle variant="header" />
            </div>
          </div>

          <MobileNav navLinks={navLinks} contactChannels={contactChannels} bookingChannels={bookingChannels} mapUrl={mapUrl} />
        </div>
      </header>
    </div>
  );
}
