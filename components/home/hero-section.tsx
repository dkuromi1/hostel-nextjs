import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { AnimatedText } from "@/components/animated-text";
import { CompactGuestRatingsStrip } from "./guest-ratings";
import type { HeroContent } from "@/lib/site-data";
import type { GuestRatingsProps } from "./guest-ratings";

export interface HeroSectionProps {
  hero: HeroContent;
  tagline: string;
  backgroundAlt: string;
  guestRatingsProps: GuestRatingsProps;
}

export function HeroSection({ hero, tagline, backgroundAlt, guestRatingsProps }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90dvh] flex flex-col justify-center overflow-hidden pb-12 pt-[calc(env(safe-area-inset-top,0px)+7rem)] sm:pb-20 sm:pt-[calc(env(safe-area-inset-top,0px)+9rem)]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hiking_2.webp"
          alt={backgroundAlt}
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "60% center" }}
          sizes="100vw"
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

            <Reveal delay={180} immediate className="w-full max-w-3xl">
              <CompactGuestRatingsStrip {...guestRatingsProps} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
