import Link from "next/link";
import Image from "next/image";
import { MapPinned, MessageCircleMore } from "lucide-react";

import { ChannelIcon } from "@/components/channel-icon";
import { PwaInstallButton } from "@/components/pwa-install-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { bookingChannels, contactChannels, navLinks, siteConfig, siteCopyContent } from "@/lib/site-data";

export function SiteFooter() {
  const detailsSummary = siteCopyContent.footer.detailsSummary.replace("{checkInHours}", siteConfig.checkInHours);
  const footerChannels = [...contactChannels, ...bookingChannels];

  return (
    <footer className="border-t border-[var(--surface-dark-border)] bg-[var(--surface-dark)] py-14 text-[var(--text-on-surface-dark)] pb-24 lg:pb-14">
      <div className="shell-container flex flex-col justify-between gap-10 xl:flex-row">
        <div className="space-y-5 xl:flex-1">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--brand-accent)]/90">
            {siteConfig.tagline}
          </p>
          <h2 className="heading-section text-white md:text-5xl">
            {siteCopyContent.footer.heading}
          </h2>
          <p className="max-w-[62ch] text-body-lg text-[var(--text-on-surface-dark-muted)]">
            {siteCopyContent.footer.description}
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            {footerChannels.map((channel) => (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noreferrer"
                className={
                  channel.stylePriority === "primary"
                    ? "inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-4 py-3 font-semibold text-[var(--primary-foreground)] transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-[var(--brand-primary-dark)]"
                    : "inline-flex items-center gap-2 rounded-full border border-[var(--surface-dark-border)] px-4 py-3 font-semibold text-[var(--text-on-surface-dark)] transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:border-white/30"
                }
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
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-on-surface-dark)]">
              {siteCopyContent.footer.exploreLabel}
            </p>
            <div className="mt-4 grid gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-block text-base text-[var(--text-on-surface-dark-muted)] transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:text-[var(--text-on-surface-dark)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* WhatsApp Community Section */}
          <div className="flex flex-col items-start gap-4 min-w-0">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-on-surface-dark)]">
              {siteCopyContent.footer.communityLabel}
            </p>
            {/* Desktop QR Code */}
            <div className="hidden sm:flex flex-col items-center gap-3 rounded-2xl bg-white/5 p-4 border border-[var(--surface-dark-border)] w-full max-w-[160px]">
              <div className="relative size-full aspect-square overflow-hidden rounded-xl bg-white p-2">
                <Image
                  src="/images/whatsapp_community_qr.png"
                  alt="WhatsApp Community QR Code"
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
              <span className="text-xs font-semibold text-[var(--text-on-surface-dark-muted)] text-center">
                {siteCopyContent.footer.communityCaption}
              </span>
            </div>
            {/* Mobile Link Button */}
            <a
              href={siteConfig.whatsappCommunityUrl}
              target="_blank"
              rel="noreferrer"
              className="sm:hidden flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-3 font-semibold text-[var(--primary-foreground)] transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-[var(--brand-primary-dark)] w-full justify-center shadow-[0_0_20px_rgba(196,92,42,0.3)]"
            >
              <MessageCircleMore className="size-5 shrink-0" />
              {siteCopyContent.footer.communityButton}
            </a>
          </div>

          {/* Details */}
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-on-surface-dark)]">
              {siteCopyContent.footer.detailsLabel}
            </p>
            <div className="mt-4 space-y-3 text-base text-[var(--text-on-surface-dark-muted)]">
              <p>
                {/* STEP 2: Make the address a clickable Google Maps link */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.name + " " + siteConfig.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-start gap-2 transition-colors hover:text-[var(--text-on-surface-dark)]"
                >
                  <MapPinned className="mt-1 size-4 shrink-0 text-[var(--brand-accent)] transition-transform group-hover:scale-110" />
                  <span className="underline decoration-white/20 underline-offset-4 group-hover:decoration-white/50">
                    {siteConfig.location}
                  </span>
                </a>
              </p>
              <p>{siteCopyContent.footer.breakfastPrefix} {siteConfig.breakfastHours}</p>
              <p>{detailsSummary}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="shell-container mt-16 border-t border-[var(--surface-dark-border)] pt-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-on-surface-dark-muted)]/70">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-on-surface-dark-muted)]/70">
            <ThemeToggle />
            <PwaInstallButton />
            <span>{siteCopyContent.footer.credit}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
