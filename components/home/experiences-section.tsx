import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Moon, Zap, MapPin, Compass, Mountain, Users, resolveIcon } from "@/lib/icon-registry";
import { EditorialButton } from "@/components/ui/editorial-button";

import { SectionHeading } from "@/components/section-heading";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/reveal";
import { Panel } from "@/components/ui/panel";
import { SwipableRow } from "@/components/swipable-row";
import { ThethWeather } from "@/components/theth-weather";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type CtaLink,
  type EventCard,
  type ExperiencePillar,
} from "@/lib/site-data";

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
          <EditorialButton
            href="/experiences"
            label={copy.buttonLabel}
          />

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
                ? "rounded-[2rem_2rem_2rem_0] md:rounded-[3rem_3rem_3rem_0] lg:rounded-[3.5rem_3.5rem_3.5rem_0]"
                : "rounded-[2rem_2rem_0_2rem] md:rounded-[3rem_3rem_0_3rem] lg:rounded-[3.5rem_3.5rem_0_3.5rem]",
              "md:col-span-9 md:aspect-[16/10] md:shadow-2xl",
              isEven ? "md:col-start-4" : "md:col-start-1",
              "lg:w-[55%] lg:aspect-[16/10]"
            );

            const cardClasses = cn(
              // Mobile floating card
              "relative z-10 -mt-16 mx-4 p-6 sm:p-8 glass-panel shadow-2xl flex-1 transition-all duration-500",
              isEven
                ? "rounded-[2rem_0_2rem_2rem] md:rounded-[3rem_0_3rem_3rem]"
                : "rounded-[0_2rem_2rem_2rem] md:rounded-[0_3rem_3rem_3rem]",
              
              // Tablet overlapping grid
              "md:col-span-7 md:-mt-0 md:mx-0 md:p-8 md:shadow-2xl",
              isEven
                ? "md:col-start-1 md:-mr-24"
                : "md:col-start-6 md:-ml-24",
              
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
                      <div className="absolute right-6 top-6 z-20">
                        <ThethWeather />
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
                      <h3 className="text-3xl sm:text-4xl font-heading leading-tight tracking-tight text-[var(--text-heading)]">
                        {index === 0 ? "The Gateway to the North" : "The Heart of the City"}
                      </h3>
                      <p className="text-lg leading-relaxed text-[var(--text-body-subtle)]">
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
        <div className="relative pt-12 sm:pt-16 mt-8 sm:mt-12 space-y-8">
          <div className="flex items-center gap-3">
            <Users className="size-5 text-[var(--brand-primary)]" />
            <SectionLabel weight="bold" className="text-[var(--brand-primary)] tracking-[0.2em] uppercase">
              SOCIALS
            </SectionLabel>
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)] to-transparent opacity-50" />
          </div>

          <Reveal delay={120}>
            <SwipableRow itemCount={eventCards.length} className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-[var(--layout-grid-gutter)] lg:grid-cols-2">
              {eventCards.map((event, index) => (
                <div key={event.title} className="min-w-[82vw] snap-center sm:min-w-0">
                  <Panel className="group overflow-hidden transition-all duration-300 hover:border-[var(--brand-primary)]/20 hover:shadow-md">
                    <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
                      <div className="relative min-h-[14rem]">
                        <Image
                          src={event.image}
                          alt={event.alt}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-700 group-hover:scale-105 z-0 transform-gpu"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1400px) 23vw, 322px"
                        />
                      </div>
                      <div className="p-card">
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
