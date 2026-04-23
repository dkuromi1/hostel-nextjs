import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Moon, Sparkles, MapPin, Compass } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Panel } from "@/components/ui/panel";
import { SwipableRow } from "@/components/swipable-row";
import { ThethWeather } from "@/components/theth-weather";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type CtaLink,
  eventCards,
  experiencePillars,
  siteConfig,
  siteCopyContent,
} from "@/lib/site-data";

const reasonIcons = [Moon, Sparkles, MapPin, Compass];

const formatText = (text: string) => {
  return text.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      return (
        <Link
          key={i}
          href={match[2]}
          className="brand-link"
        >
          {match[1]}
        </Link>
      );
    }
    return part;
  });
};

const PillarCta = ({ cta, variant = "light" }: { cta?: CtaLink; variant?: "light" | "dark" }) => {
  if (!cta) return null;
  return (
    <Link
      href={cta.url}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "mt-4 w-fit gap-2 rounded-full transition-all duration-300",
        variant === "light"
          ? "border-emerald-500/20 bg-emerald-50/50 text-emerald-700 hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
          : "border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-emerald-900 shadow-lg"
      )}
    >
      {cta.text}
      <ArrowRight className="size-3.5" strokeWidth={2.5} />
    </Link>
  );
};

export function ExperiencesSection() {
  return (
    <section className="py-8 sm:py-16">
      <div className="shell-container space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={siteCopyContent.home.experiencesSection.eyebrow}
            title={siteCopyContent.home.experiencesSection.title}
            description={siteCopyContent.home.experiencesSection.description}
          />
          <Link
            href="/experiences"
            className={cn(
              "group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full px-8 py-4",
              "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white",
              "text-sm font-bold tracking-tight antialiased",
              "shadow-[0_20px_50px_-12px_rgba(2,6,23,0.5)] ring-1 ring-white/15",
              "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(5,150,105,0.25)] hover:ring-white/25",
              "active:scale-95 active:translate-y-0"
            )}
          >
            <div className="absolute inset-0 z-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-emerald-50">
              {siteCopyContent.home.experiencesSection.buttonLabel}
            </span>
            <div className="relative z-10 flex size-7 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover:bg-emerald-500 group-hover:scale-110">
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </div>
          </Link>
        </div>

        {/* --- DISCOVER SUBSECTION --- */}
        <div className="relative pt-12 sm:pt-16">
          <div className="absolute left-0 top-3 z-0 select-none opacity-[0.07] sm:top-4">
            <span className="font-heading text-[44px] leading-none tracking-tighter text-slate-950 sm:text-[64px]" role="presentation" aria-hidden="true">
              {siteCopyContent.home.experiencesSection.discoverLabel}
            </span>
          </div>

          <div className="lg:hidden">
            <Reveal delay={120}>
              <SwipableRow itemCount={experiencePillars.length} className="-mx-4 px-4 sm:-mx-8 sm:px-8">
                {experiencePillars.map((pillar, index) => (
                  <div key={pillar.title} className="min-w-[85vw] sm:min-w-[45vw] snap-center h-full">
                    <Panel className="overflow-hidden flex h-full flex-col">
                      <div className="relative min-h-[16rem] sm:min-h-[22rem]">
                        <Image
                          src={pillar.image}
                          alt={pillar.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 85vw, 50vw"
                        />
                        {index === 0 && siteConfig.features.showRegionalWeather && (
                          <div className="absolute right-4 top-4 z-20">
                            <ThethWeather variant="small" />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 pt-24 text-white">
                          <p className="text-sm sm:text-sm uppercase tracking-[0.28em] text-sky-100/90 mb-2">
                            {pillar.title}
                          </p>
                        </div>
                      </div>
                      <div className="p-6 text-sm leading-relaxed text-[var(--text-body-subtle)] bg-[var(--glass-bg)] flex-1 flex flex-col">
                        <p className="flex-1">{formatText(pillar.description)}</p>
                        <PillarCta cta={pillar.cta} />
                      </div>
                    </Panel>
                  </div>
                ))}
                <div className="w-8 flex-shrink-0 lg:hidden" aria-hidden="true" />
              </SwipableRow>
            </Reveal>
          </div>

          <div className="hidden lg:grid gap-6 lg:grid-cols-12">
            <Reveal delay={0} className="lg:col-span-7 h-full">
              <Panel className="overflow-hidden h-full">
                <div className="relative h-full min-h-[30rem]">
                  <Image
                    src={experiencePillars[0].image}
                    alt={experiencePillars[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 58vw, 812px"
                  />
                  {siteConfig.features.showRegionalWeather ? (
                    <div className="absolute right-4 top-4 z-20">
                      <ThethWeather variant="small" />
                    </div>
                  ) : null}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 pt-32 text-white">
                    <p className="text-sm uppercase tracking-[0.28em] text-sky-100/90">
                      {experiencePillars[0].title}
                    </p>
                    <p className="mt-3 max-w-lg text-base leading-8 text-slate-100">
                      {formatText(experiencePillars[0].description)}
                    </p>
                    <PillarCta cta={experiencePillars[0].cta} variant="dark" />
                  </div>
                </div>
              </Panel>
            </Reveal>

            <div className="lg:col-span-5 grid gap-6">
              {experiencePillars.slice(1).map((pillar, index) => {
                const isSecondElement = index === 0;
                return (
                  <Reveal key={pillar.title} delay={150 + index * 100}>
                    <Panel className="overflow-hidden h-full">
                      {isSecondElement ? (
                        <div className="relative h-full min-h-[22rem]">
                          <Image
                            src={pillar.image}
                            alt={pillar.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 42vw, 588px"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 pt-32 text-white">
                            <p className="text-sm uppercase tracking-[0.28em] text-sky-100/90">
                              {pillar.title}
                            </p>
                            <p className="mt-3 text-base leading-8 text-slate-100">
                              {formatText(pillar.description)}
                            </p>
                            <PillarCta cta={pillar.cta} variant="dark" />
                          </div>
                        </div>
                      ) : (
                        <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                          <div className="relative min-h-[16rem]">
                            <Image
                              src={pillar.image}
                              alt={pillar.alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1400px) 18vw, 250px"
                            />
                          </div>
                          <div className="space-y-3 p-6">
                            <h3 className="heading-feature text-[var(--text-heading)]">
                              {pillar.title}
                            </h3>
                            <p className="text-section-desc">
                              {formatText(pillar.description)}
                            </p>
                            <PillarCta cta={pillar.cta} />
                          </div>
                        </div>
                      )}
                    </Panel>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- CONNECT SUBSECTION --- */}
        <div className="relative pt-12 sm:pt-16 mt-8 sm:mt-12">
          <div className="absolute left-0 top-3 z-0 select-none opacity-[0.07] sm:top-4">
            <span className="font-heading text-[44px] leading-none tracking-tighter text-slate-950 sm:text-[64px]" role="presentation" aria-hidden="true">
              {siteCopyContent.home.experiencesSection.connectLabel}
            </span>
          </div>

          <Reveal delay={120}>
            <SwipableRow itemCount={eventCards.length} className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-2">
              {eventCards.map((event, index) => (
                <div key={event.title} className="min-w-[82vw] snap-center sm:min-w-0">
                  <Panel className="overflow-hidden">
                    <div className="grid gap-0 md:grid-cols-[0.92fr_1.08fr]">
                      <div className="relative min-h-[14rem]">
                        <Image
                          src={event.image}
                          alt={event.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 23vw, 322px"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading text-2xl leading-none tracking-[-0.04em] text-[var(--text-heading)]">
                          {event.title}
                        </h3>
                        <p className="mt-3 text-card-body">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </Panel>
                </div>
              ))}
              <div className="w-12 flex-shrink-0 sm:hidden" aria-hidden="true" />
            </SwipableRow>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
