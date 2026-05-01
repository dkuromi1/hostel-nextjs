import Link from "next/link";
import Image from "next/image";
import { MapPinned, MessageCircleMore } from "@/lib/icon-registry";
import { cn } from "@/lib/utils";

import { ChannelIcon } from "@/components/channel-icon";
import { PwaInstallButton } from "@/components/pwa-install-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SectionLabel } from "@/components/ui/section-label";
import type { BusinessChannel } from "@/lib/site-data";

export interface SiteFooterProps {
  contactChannels: BusinessChannel[];
  bookingChannels: BusinessChannel[];
  navLinks: { href: string; label: string }[];
  siteConfig: {
    checkInHours: string;
    tagline: string;
    phoneDisplay: string;
    whatsappCommunityUrl: string;
    name: string;
    location: string;
    breakfastHours: string;
  };
  copy: {
    heading: string;
    description: string;
    exploreLabel: string;
    communityLabel: string;
    communityCaption: string;
    communityButton: string;
    detailsLabel: string;
    breakfastPrefix: string;
    detailsSummary: string;
    credit: string;
  };
}

export function SiteFooter({ contactChannels, bookingChannels, navLinks, siteConfig, copy }: SiteFooterProps) {
  const detailsSummary = copy.detailsSummary.replace("{checkInHours}", siteConfig.checkInHours);
  const footerChannels = [...contactChannels, ...bookingChannels];

  return (
    <footer className="pt-0 text-[var(--text-body)] pb-24 lg:pb-14">
      {/* Top Divider - Not full width */}
      <div className="mx-auto mb-14 w-[92%] border-t border-[var(--text-muted)]/70" />

      <div className="shell-container flex flex-col justify-between gap-10 xl:flex-row">
        <div className="space-y-5 xl:flex-1">
          <SectionLabel variant="emerald" className="mb-2">
            {siteConfig.tagline}
          </SectionLabel>
          <h2 className="heading-section text-[var(--text-heading)] md:text-5xl">
            {copy.heading}
          </h2>
          <p className="max-w-[62ch] text-body-lg text-[var(--text-body-subtle)]">
            {copy.description}
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            {footerChannels.map((channel) => (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-3 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95",
                  channel.stylePriority === "primary"
                    ? channel.icon === "whatsapp"
                      ? "bg-[var(--brand-whatsapp)] text-white hover:bg-[var(--brand-whatsapp-dark)] shadow-whatsapp"
                      : "bg-[var(--brand-primary)] text-[var(--primary-foreground)] hover:bg-[var(--brand-primary-dark)]"
                    : "border border-[var(--border)] text-[var(--text-body)] hover:border-[var(--brand-primary)]/40 hover:text-[var(--text-heading)]"
                )}
              >
                <ChannelIcon
                  iconKey={channel.icon}
                  iconOnly
                />
                {channel.id === "whatsapp" ? siteConfig.phoneDisplay : channel.label}
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-[20%_auto_1fr] xl:gap-10 xl:max-w-[750px] shrink min-w-0">
          {/* Explore */}
          <div className="min-w-0">
            <SectionLabel className="mb-4">
              {copy.exploreLabel}
            </SectionLabel>
            <div className="mt-4 grid gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-block text-base text-[var(--text-body)] transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:text-[var(--brand-primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* WhatsApp Community Section */}
          <div className="flex flex-col items-start gap-4 min-w-0">
            <SectionLabel className="mb-4">
              {copy.communityLabel}
            </SectionLabel>
            {/* Desktop QR Code */}
            <div className="hidden sm:flex flex-col items-center gap-3 rounded-2xl bg-[var(--muted)]/60 p-4 border border-[var(--border)] w-full max-w-[160px]">
              <div className="relative size-full aspect-square overflow-hidden rounded-xl bg-white p-2">
                <Image
                  src="/images/whatsapp_community_qr.png"
                  alt="WhatsApp Community QR Code"
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
              <span className="text-sm font-semibold text-[var(--text-muted)] text-center">
                {copy.communityCaption}
              </span>
            </div>
            {/* Mobile Link Button */}
            <a
              href={siteConfig.whatsappCommunityUrl}
              target="_blank"
              rel="noreferrer"
              className="sm:hidden flex items-center gap-2 rounded-full bg-[var(--brand-whatsapp)] px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-[var(--brand-whatsapp-dark)] w-full justify-center shadow-whatsapp"
            >
              <MessageCircleMore className="size-5 shrink-0" />
              {copy.communityButton}
            </a>
          </div>

          {/* Details */}
          <div className="min-w-0">
            <SectionLabel className="mb-4">
              {copy.detailsLabel}
            </SectionLabel>
            <div className="mt-4 space-y-3 text-base text-[var(--text-body)]">
              <p>
                {/* STEP 2: Make the address a clickable Google Maps link */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.name + " " + siteConfig.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-start gap-2 transition-colors hover:text-[var(--brand-primary)]"
                >
                  <MapPinned className="mt-1 size-4 shrink-0 text-[var(--brand-primary)] transition-transform group-hover:scale-110" />
                  <span className="underline decoration-[var(--brand-primary)]/20 underline-offset-4 group-hover:decoration-[var(--brand-primary)]/50">
                    {siteConfig.location}
                  </span>
                </a>
              </p>
              <p>{copy.breakfastPrefix} {siteConfig.breakfastHours}</p>
              <p>{detailsSummary}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Divider - Not full width */}
      <div className="mx-auto mt-16 w-[92%] border-t border-[var(--text-muted)]/70 pt-8">
        <div className="shell-container">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
              <ThemeToggle />
              <PwaInstallButton />
              <span>{copy.credit}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
