import Image from "next/image";
import { resolveIcon } from "@/lib/icon-registry";
import { Reveal } from "@/components/reveal";
import { AnimatedText } from "@/components/animated-text";
import { SwipableRow } from "@/components/swipable-row";
import { CompactGuestRatingsStrip } from "./guest-ratings";
import {
  hero,
  quickFacts,
  siteConfig,
  siteCopyContent,
} from "@/lib/site-data";

export function HeroSection() {
  return (
    <section className="relative min-h-[90dvh] flex flex-col justify-center overflow-hidden pb-12 pt-[calc(env(safe-area-inset-top,0px)+7rem)] sm:pb-20 sm:pt-[calc(env(safe-area-inset-top,0px)+9rem)]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hiking_2.jpg"
          alt={siteCopyContent.home.hero.backgroundAlt}
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          style={{ objectPosition: "60% center" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_bottom,rgba(2,6,23,0.6)_0%,rgba(2,6,23,0.3)_50%,rgba(2,6,23,0.75)_100%)]" />
      </div>

      <div className="shell-container relative z-10 w-full">
        <div className="max-w-4xl space-y-8 sm:space-y-10">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col gap-5">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/90 antialiased">
                {siteConfig.tagline}
              </p>
              <h1 className="heading-hero text-white">
                <AnimatedText
                  text={hero.title1}
                  wordClassName="text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]"
                  delayOffset={0}
                />
                {" "}
                <AnimatedText
                  text={hero.title2}
                  className="text-sky-300"
                  wordClassName="text-sky-300 [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]"
                  delayOffset={200}
                />
              </h1>
              <p className="max-w-[50ch] text-hero-sub text-slate-300 antialiased [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
                {hero.description}
              </p>
            </div>

            <Reveal delay={280} className="w-full max-w-3xl">
              <CompactGuestRatingsStrip />
            </Reveal>
          </div>

          <Reveal delay={500}>
            <SwipableRow
              itemCount={quickFacts.length}
              className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {quickFacts.map((fact, index) => {
                const Icon = resolveIcon(fact.icon);
                return (
                  <div
                    key={index}
                    className="min-w-[85%] snap-center sm:min-w-0"
                  >
                    <div className="group relative overflow-hidden rounded-[24px] border border-white/18 bg-slate-950/42 p-5 backdrop-blur-[3px] transition-all duration-300 hover:border-white/24 hover:bg-slate-950/52">
                      <div className="text-sm leading-7 text-white/95">
                        <div className="float-left mb-1 mr-4 flex size-10 items-center justify-center rounded-xl bg-emerald-500/24 text-emerald-300">
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
