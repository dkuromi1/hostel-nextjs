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
          <Panel className="group relative h-full p-8 transition-all duration-500 hover:border-[var(--brand-primary)]/30 hover:shadow-xl hover:shadow-[var(--brand-primary)]/5">
            <div className="relative z-10 flex flex-col h-full gap-5">
              <div className="flex items-center gap-4">
                <div className="relative flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-white text-[var(--brand-primary)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--brand-primary)] group-hover:text-white dark:bg-white/5 dark:text-[var(--brand-accent)] dark:group-hover:bg-[var(--brand-primary)]">
                  <Icon className="size-6 transition-transform duration-500" />
                </div>
                
                {fact.title && (
                  <h4 className="heading-item text-[var(--text-heading)] dark:text-white">
                    {fact.title}
                  </h4>
                )}
              </div>
              <p className="text-card-body leading-relaxed transition-colors group-hover:text-[var(--text-body)] dark:text-white/80 dark:group-hover:text-white">
                {fact.text}
              </p>
            </div>
          </Panel>
        );

        if (isMobile) {
          return (
            <div key={index} className="min-w-[85%] snap-center sm:min-w-0 h-full">
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
    <section className={cn("relative z-20 py-12 lg:py-20", className)}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] soft-grid" />
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
