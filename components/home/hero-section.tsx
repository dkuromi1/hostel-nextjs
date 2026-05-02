import Image from "next/image";
import { resolveIcon } from "@/lib/icon-registry";
import { Reveal } from "@/components/reveal";
import { AnimatedText } from "@/components/animated-text";
import { SwipableRow } from "@/components/swipable-row";
import { CompactGuestRatingsStrip } from "./guest-ratings";
import type { HeroContent, IconTextItem } from "@/lib/site-data";
import type { GuestRatingsProps } from "./guest-ratings";

export interface HeroSectionProps {
  hero: HeroContent;
  quickFacts: IconTextItem[];
  tagline: string;
  backgroundAlt: string;
  guestRatingsProps: GuestRatingsProps;
}

export function HeroSection({ hero, quickFacts, tagline, backgroundAlt, guestRatingsProps }: HeroSectionProps) {
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
        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_bottom,rgba(2,6,23,0.45)_0%,rgba(2,6,23,0.45)_45%,rgba(2,6,23,0.85)_100%)]" />
      </div>

      <div className="shell-container relative z-10 w-full">
        <div className="max-w-4xl space-y-8 sm:space-y-10">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col gap-5">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/90 antialiased [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
                {tagline}
              </p>
              <h1 className="heading-hero text-white">
                <AnimatedText
                  text={hero.title1}
                  wordClassName="text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]"
                  delayOffset={0}
                  immediate
                />
                {" "}
                <AnimatedText
                  text={hero.title2}
                  className="text-[var(--brand-accent)]"
                  wordClassName="text-[var(--brand-accent)] [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]"
                  delayOffset={100}
                  immediate
                />
              </h1>
              <p className="max-w-[50ch] text-hero-sub text-white/90 antialiased [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
                {hero.description}
              </p>
            </div>

            <Reveal delay={180} immediate className="w-full max-w-3xl">
              <CompactGuestRatingsStrip {...guestRatingsProps} />
            </Reveal>
          </div>

          <Reveal delay={350} immediate>
            <SwipableRow
              itemCount={quickFacts.length}
              className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-[var(--layout-grid-gutter)]"
            >
              {quickFacts.map((fact, index) => {
                const Icon = resolveIcon(fact.icon);
                return (
                  <div
                    key={index}
                    className="min-w-[85%] snap-center sm:min-w-0"
                  >
                    <div className="group relative overflow-hidden rounded-2xl border border-white/16 bg-black/40 p-5 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.5)] backdrop-blur-[5px] transition-all duration-300 hover:border-white/24 hover:bg-black/50">
                      <div className="text-sm leading-snug text-white/95">
                        <div className="float-left mb-1 mr-4 flex size-10 items-center justify-center rounded-xl bg-[var(--brand-primary)]/24 text-[var(--brand-accent)]">
                          <Icon className="size-5" strokeWidth={2} />
                        </div>
                        {fact.text}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="w-12 flex-shrink-0 sm:hidden" aria-hidden="true" />
            </SwipableRow>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
