"use client";

import { resolveIcon } from "@/lib/icon-registry";
import { Reveal } from "@/components/reveal";
import { SwipableRow } from "@/components/swipable-row";
import { useIsMobile } from "@/lib/use-is-mobile";
import type { IconTextItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";

export interface QuickFactsSectionProps {
  quickFacts: IconTextItem[];
  className?: string;
}

export function QuickFactsSection({ quickFacts, className }: QuickFactsSectionProps) {
  const isMobile = useIsMobile();

  const cards = quickFacts.map((fact, index) => {
    const Icon = resolveIcon(fact.icon || "Info");

    const cardContent = (
      <div className="group relative flex-1 flex flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-sm px-7 py-9 lg:px-9 lg:py-11 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-gold/20">
        {/* Subtle offset shadow layer */}
        <div
          className="absolute -inset-px rounded-2xl border border-[var(--border)] bg-[var(--muted)]/40 -z-10 opacity-50 transition-transform duration-500 translate-x-2 translate-y-2 group-hover:translate-x-3.5 group-hover:translate-y-3.5"
          aria-hidden="true"
        />

        {/* Beautiful Upper Right Image container: Absolute, rounded to match main card, hidden overflow only for the image */}
        {fact.image && (
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none select-none -z-10" aria-hidden="true">
            <div className="absolute inset-y-0 right-0 w-52 sm:w-60 lg:w-72 transition-transform duration-500 group-hover:scale-105">
              {/* Soft blending overlays */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[var(--glass-bg)]/40 to-[var(--glass-bg)] z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--glass-bg)]/40 to-[var(--glass-bg)] z-10" />
              {/* Diagonal brush/organic mask effect using modern CSS gradients */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${fact.image})`,
                  backgroundPosition: fact.focus || "center",
                  maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0) 100%)",
                }}
              />
            </div>
          </div>
        )}

        {/* Horizontal Header: Icon + Title side-by-side */}
        <div className="flex items-center gap-4 relative z-10">
          {/* Glowing Icon Container */}
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gold/15 blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
            <div className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/60 dark:from-amber-900/30 dark:to-amber-800/20 border border-amber-200/60 dark:border-amber-700/30 shadow-sm">
              <Icon className="size-5 text-gold transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>

          {/* Title stacked to the right of icon */}
          <div className="flex flex-col gap-0.5 min-w-0">
            <h3 className="font-heading text-xl font-bold tracking-tight text-[var(--text-heading)] leading-snug transition-colors duration-300 group-hover:text-gold">
              {fact.title}
            </h3>
            {/* Gold underline accent */}
            <div className="mt-2 h-px w-8 bg-gold/40 transition-all duration-300 group-hover:w-14 group-hover:bg-gold/70" />
          </div>
        </div>

        {/* Description */}
        <p className="text-[14px] leading-relaxed text-[var(--text-body-subtle)] mt-auto relative z-10 max-w-[60%]">
          {fact.text}
        </p>
      </div>
    );

    if (isMobile) {
      return (
        <div key={index} className="min-w-[85%] snap-center flex-1 p-1 flex flex-col">
          {cardContent}
        </div>
      );
    }

    return (
      <Reveal key={index} delay={index * 100} className="min-w-0 flex-1 lg:w-[calc(50%-1rem)] lg:max-w-[580px] flex flex-col">
        {cardContent}
      </Reveal>
    );
  });

  const factsContent = (
    <SwipableRow
      itemCount={quickFacts.length}
      className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 items-stretch lg:flex lg:flex-wrap lg:justify-center lg:items-stretch gap-5 lg:gap-7"
    >
      {cards}
      <div className="w-12 flex-shrink-0 sm:hidden" aria-hidden="true" />
    </SwipableRow>
  );

  return (
    <section className={cn("section-muted relative z-20 py-[var(--layout-section-spacing)]", className)}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] soft-grid" />
        <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-72 h-72 rounded-full bg-[var(--brand-primary)]/5 blur-3xl" />
      </div>

      <div className="shell-container relative z-10">

        {/* Top Divider */}
        <div className="flex items-center gap-4 w-full mb-12">
          <div className="h-px flex-grow bg-gradient-to-r from-transparent to-[var(--border)]" />
          <div className="size-2 rotate-45 border border-gold bg-gold/10 dark:bg-gold/20" />
          <div className="h-px flex-grow bg-gradient-to-l from-transparent to-[var(--border)]" />
        </div>

        <div className="flex justify-center mb-10">
          <Reveal delay={50}>
            <Eyebrow>YOUR CHOICE</Eyebrow>
          </Reveal>
        </div>

        {isMobile ? (
          <Reveal delay={100}>{factsContent}</Reveal>
        ) : (
          factsContent
        )}

        {/* Bottom Divider */}
        <div className="flex items-center gap-4 w-full mt-12">
          <div className="h-px flex-grow bg-gradient-to-r from-transparent to-[var(--border)]" />
          <div className="size-2 rotate-45 border border-gold bg-gold/10 dark:bg-gold/20" />
          <div className="h-px flex-grow bg-gradient-to-l from-transparent to-[var(--border)]" />
        </div>

      </div>
    </section>
  );
}
