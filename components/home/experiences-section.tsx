import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Moon, Zap, MapPin, Compass, Mountain, Users, resolveIcon } from "@/lib/icon-registry";
import { EditorialButton } from "@/components/ui/editorial-button";

import { SectionHeading } from "@/components/section-heading";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { SwipableRow } from "@/components/swipable-row";
import { RegionalWeather } from "@/components/regional-weather";
import { cn } from "@/lib/utils";
import {
  type CtaLink,
  type EventCard,
  type ExperiencePillar,
} from "@/lib/site-data";
import { siteConfig } from "@/lib/site-data";

const reasonIcons = [Moon, Zap, MapPin, Compass];

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
        buttonVariants({ variant: "ghost", size: "sm" }),
        "mt-4 w-fit gap-2 rounded-[var(--radius-full)] border transition-all duration-300",
        variant === "light"
          ? "border-[var(--border)] bg-transparent text-[var(--brand-primary-dark)] hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-[var(--primary-foreground)]"
          : "border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-[var(--brand-primary-dark)] shadow-lg"
      )}
    >
      {cta.text}
      <ArrowRight className="size-3.5" />
    </Link>
  );
};

export interface ExperiencesSectionProps {
  eventCards: EventCard[];
  experiencePillars: ExperiencePillar[];
  copy: {
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
    discoverLabel: string;
    connectLabel: string;
  };
  showRegionalWeather: boolean;
}

export function ExperiencesSection({ eventCards, experiencePillars, copy, showRegionalWeather }: ExperiencesSectionProps) {
  return (
    <section className="py-[var(--layout-section-spacing)] relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[var(--brand-primary)]/[0.025] blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-[var(--accent)]/[0.02] blur-3xl" />
      </div>
      
      <div className="shell-container space-y-10 relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
          <div className="mt-auto">
            <EditorialButton
              href="/experiences"
              label={copy.buttonLabel}
              variant="ghost"
            />
          </div>

        </div>

        {/* --- PILLARS SUBSECTION --- */}
        <div className="space-y-24">
          {experiencePillars.map((pillar, index) => {
            const isEven = index % 2 === 1;
            const PillarIcon = index === 0 ? Mountain : MapPin;

            const containerClasses = cn(
              "group relative flex flex-col gap-0 w-full",
              "md:grid md:grid-cols-12 md:items-center md:gap-0 md:max-w-none md:mx-0 md:w-full",
              "lg:max-w-none lg:mx-0 lg:w-full lg:flex lg:flex-row lg:items-center lg:gap-0",
              isEven ? "lg:flex-row-reverse" : "lg:flex-row"
            );

            const imageContainerClasses = cn(
              "relative aspect-[4/3] w-full shrink-0 overflow-hidden shadow-xl z-0 transition-all duration-750",
              isEven
                ? "rounded-[var(--radius-3xl)_var(--radius-3xl)_var(--radius-3xl)_0]"
                : "rounded-[var(--radius-3xl)_var(--radius-3xl)_0_var(--radius-3xl)]",
              "md:col-span-9 md:aspect-[16/10] md:shadow-2xl",
              isEven ? "md:col-start-4" : "md:col-start-1",
              "lg:w-[55%] lg:aspect-[16/10]"
            );

            const cardClasses = cn(
              // Mobile floating card
              "relative z-10 -mt-8 mx-4 p-6 sm:p-8 glass-panel shadow-2xl flex-1 transition-all duration-500",
              isEven
                ? "rounded-[var(--radius-3xl)_0_var(--radius-3xl)_var(--radius-3xl)]"
                : "rounded-[0_var(--radius-3xl)_var(--radius-3xl)_var(--radius-3xl)]",
              
              // Tablet overlapping grid
              "md:col-span-9 md:-mt-8 md:mx-0 md:p-8 md:shadow-2xl",
              isEven
                ? "md:col-start-1 md:-mr-24"
                : "md:col-start-4 md:-ml-24",
              
              // Desktop flat block (card styles are fully reset here)
              "lg:col-span-5 lg:relative lg:z-auto lg:m-0 lg:p-0 lg:bg-transparent lg:border-0 lg:shadow-none lg:backdrop-blur-none lg:rounded-none",
              isEven ? "lg:pr-12" : "lg:pl-12"
            );

            return (
              <Reveal key={pillar.title} delay={100}>
                <div className={containerClasses}>
                  {/* Image Container */}
                  <div className={imageContainerClasses}>
                    <Image
                      src={pillar.image}
                      alt={pillar.alt}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 50vw"
                    />
                    {index === 0 && showRegionalWeather && (
                      <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6">
                        {siteConfig.weather ? (
                          <>
                            {/* Compact widget — visible on mobile only */}
                            <div className="md:hidden">
                              <RegionalWeather config={siteConfig.weather} variant="small" />
                            </div>
                            {/* Full widget — visible on md+ only */}
                            <div className="hidden md:block">
                              <RegionalWeather config={siteConfig.weather} />
                            </div>
                          </>
                        ) : null}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  
                  {/* Text Details Card */}
                  <div className={cardClasses}>
                    <div className="space-y-4 lg:space-y-6">
                      <div className="flex items-center gap-3">
                        <PillarIcon className="size-5 text-[var(--brand-primary)]" />
                        <SectionLabel weight="bold" className="text-[var(--brand-primary)] tracking-[0.2em] uppercase">
                          {pillar.title}
                        </SectionLabel>
                      </div>
                      <h3 className="heading-card text-[var(--text-heading)]">
                        {index === 0 ? "The Gateway to the North" : "The Heart of the City"}
                      </h3>
                      <p className="text-card-body">
                        {formatText(pillar.description)}
                      </p>
                      <PillarCta cta={pillar.cta} />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* --- CONNECT SUBSECTION --- */}
        <div className="relative mt-12 sm:mt-16 space-y-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
              <Users className="size-5" />
            </div>
            <SectionLabel weight="bold" className="text-[var(--brand-primary)] tracking-[0.25em] uppercase text-xs">
              SOCIALS & VIBE
            </SectionLabel>
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)] to-transparent opacity-60" />
          </div>

          <Reveal delay={120}>
            <SwipableRow itemCount={eventCards.length} className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-[var(--layout-grid-gutter)] lg:grid-cols-12">
              {eventCards.map((event, index) => {
                // Alternating column span for an editorial layout
                const isLargeCard = index === 0 || index === 3;
                const cardColSpan = isLargeCard ? "lg:col-span-7" : "lg:col-span-5";
                
                return (
                  <div 
                    key={event.title} 
                    className={cn(
                      "min-w-[82vw] snap-center sm:min-w-0 transition-all duration-500",
                      cardColSpan
                    )}
                  >
                    <div className={cn(
                      "group relative w-full overflow-hidden rounded-3xl shadow-md border border-black/5 dark:border-white/5 cursor-default select-none transition-all duration-500 hover:shadow-2xl hover:-translate-y-1",
                      isLargeCard ? "aspect-[4/3] lg:aspect-[16/10]" : "aspect-[4/3]"
                    )}>
                      {/* Full-bleed image */}
                      <Image
                        src={event.image}
                        alt={event.alt}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:rotate-[0.5deg] transform-gpu"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, (max-width: 1400px) 40vw, 500px"
                      />

                      {/* Premium gradient overlay for readability and depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5 transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/40" />

                      {/* Content block with smooth reveal transition */}
                      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 flex flex-col justify-end">
                        {/* Eyebrow tag */}
                        <div className="mb-2">
                          <span className="text-[10px] tracking-[0.25em] text-[var(--brand-primary)] font-bold uppercase">
                            {index === 0 ? "Social" : index === 1 ? "Adventure" : index === 2 ? "Nature" : "Rooftop"}
                          </span>
                        </div>

                        {/* Title with translate transition on desktop only */}
                        <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-tight transition-transform duration-500 ease-out lg:group-hover:-translate-y-2">
                          {event.title}
                        </h3>

                        {/* Description reveals and slides up on hover on desktop; always visible on mobile/tablet */}
                        <p className="text-sm leading-relaxed text-white/70 line-clamp-3 mt-1 transition-all duration-500 ease-out lg:opacity-0 lg:max-h-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:max-h-24 lg:group-hover:translate-y-0">
                          {event.description}
                        </p>
                      </div>

                      {/* Subtle bottom border accent line */}
                      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[var(--brand-primary)] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
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
