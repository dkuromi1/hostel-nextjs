import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { AnimatedText } from "@/components/animated-text";
import { CompactGuestRatingsStrip } from "./guest-ratings";
import { MessageCircleMore, ArrowRight } from "@/lib/icon-registry";
import type { HeroContent } from "@/lib/site-data";
import type { GuestRatingsProps } from "./guest-ratings";

export interface HeroSectionProps {
  hero: HeroContent;
  tagline: string;
  backgroundAlt: string;
  whatsappUrl?: string;
  guestRatingsProps: GuestRatingsProps;
}

export function HeroSection({ hero, tagline, backgroundAlt, whatsappUrl, guestRatingsProps }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90dvh] flex flex-col justify-center overflow-hidden pb-12 pt-[calc(env(safe-area-inset-top,0px)+7rem)] sm:pb-20 sm:pt-[calc(env(safe-area-inset-top,0px)+9rem)]">
      <div className="absolute inset-0 z-0">
        {/* Desktop banner image */}
        <Image
          src="/images/social_hostel_banner_1.webp"
          alt={backgroundAlt}
          fill
          priority
          fetchPriority="high"
          className="hidden sm:block object-cover"
          style={{ objectPosition: "15% 50%" }}
          sizes="100vw"
        />
        {/* Mobile atmosphere video background */}
        <video
          src="/videos/videoplayback.mp4"
          poster="/images/video-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          className="block sm:hidden size-full object-cover"
        />
        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_bottom,rgba(2,6,23,0.4)_0%,rgba(2,6,23,0.5)_50%,rgba(2,6,23,0.95)_100%)]" />
      </div>

      <div className="shell-container relative z-10 w-full">
        <div className="max-w-4xl space-y-8 sm:space-y-10">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col gap-5">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/90 antialiased [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]">
                {tagline}
              </p>
              <h1 className="heading-hero text-white">
                <AnimatedText
                  text={hero.title1}
                  wordClassName="text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.7)]"
                  delayOffset={0}
                  immediate
                />
                {" "}
                <AnimatedText
                  text={hero.title2}
                  className="text-[var(--brand-accent)]"
                  wordClassName="text-[var(--brand-accent)] [text-shadow:0_2px_12px_rgba(0,0,0,0.7)]"
                  delayOffset={100}
                  immediate
                />
              </h1>
              <p className="max-w-[50ch] text-hero-sub text-white/95 font-light antialiased [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]">
                {hero.description}
              </p>
            </div>

            {whatsappUrl && (
              <Reveal delay={120} immediate className="flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1 sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn inline-flex h-12 sm:h-13 items-center justify-center gap-2.5 rounded-full bg-[var(--brand-whatsapp)] px-7 sm:px-8 text-base font-semibold text-white shadow-whatsapp transition-all duration-300 hover:scale-[1.03] hover:bg-[var(--brand-whatsapp-dark)] active:scale-95"
                >
                  <MessageCircleMore className="size-5 shrink-0" />
                  <span>Book on WhatsApp</span>
                </a>

                <Link
                  href="/rooms"
                  className="group/rooms inline-flex h-12 sm:h-13 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/30 px-6 sm:px-7 text-base font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-black/45 hover:scale-[1.02] active:scale-95"
                >
                  <span>Explore Rooms</span>
                  <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover/rooms:translate-x-1" />
                </Link>
              </Reveal>
            )}

            <Reveal delay={180} immediate className="w-full max-w-3xl">
              <CompactGuestRatingsStrip {...guestRatingsProps} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
