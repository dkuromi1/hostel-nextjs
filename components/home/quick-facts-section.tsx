"use client";
import { resolveIcon } from "@/lib/icon-registry";
import { Reveal } from "@/components/reveal";
import { Panel } from "@/components/ui/panel";
import { SwipableRow } from "@/components/swipable-row";
import { useIsMobile } from "@/lib/use-is-mobile";
import type { IconTextItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export interface QuickFactsSectionProps {
  quickFacts: IconTextItem[];
  className?: string;
}

export function QuickFactsSection({ quickFacts, className }: QuickFactsSectionProps) {
  const isMobile = useIsMobile();

  const factsContent = (
    <SwipableRow
      itemCount={quickFacts.length}
      className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-[var(--layout-grid-gutter)]"
    >
      {quickFacts.map((fact, index) => {
        const Icon = resolveIcon(fact.icon || "Info");
        const cardContent = (
          <div className="group relative h-full flex flex-col gap-6 p-card rounded-[var(--radius-lg)] border border-[var(--border)] bg-white dark:bg-card transition-all duration-300 hover:shadow-xl hover:shadow-[var(--brand-primary)]/5 hover:border-[var(--brand-primary)]/20">

            
            <div className="relative z-10 flex flex-col gap-5">
              <div className="relative flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-white text-[var(--brand-primary)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[var(--brand-primary)] group-hover:text-white dark:bg-white/5 dark:text-[var(--brand-accent)]">
                <Icon className="size-7" />
              </div>
              
              <div className="space-y-2">
                {fact.title && (
                  <h4 className="heading-item text-xl tracking-tight text-[var(--text-heading)]">
                    {fact.title}
                  </h4>
                )}
                <p className="text-[15px] leading-relaxed text-[var(--text-body-subtle)] transition-colors group-hover:text-[var(--text-body)]">
                  {fact.text}
                </p>
              </div>
            </div>
          </div>
        );

        if (isMobile) {
          return (
            <div key={index} className="min-w-[85%] snap-center sm:min-w-0 h-full p-1">
              {cardContent}
            </div>
          );
        }

        return (
          <Reveal
            key={index}
            delay={index * 80}
            className="min-w-[85%] snap-center sm:min-w-0 h-full"
          >
            {cardContent}
          </Reveal>
        );
      })}
      <div className="w-12 flex-shrink-0 sm:hidden" aria-hidden="true" />
    </SwipableRow>
  );

  return (
    <section className={cn("section-muted relative z-20 py-12 lg:py-20", className)}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] soft-grid" />
        <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-[var(--brand-primary)]/[0.015] blur-3xl" />
      </div>

      <div className="shell-container relative z-10">
        <div className="flex flex-col gap-10">
          {isMobile ? (
            <Reveal delay={100}>{factsContent}</Reveal>
          ) : (
            factsContent
          )}
        </div>
      </div>
    </section>
  );
}
