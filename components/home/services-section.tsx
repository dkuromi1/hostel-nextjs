"use client";
import { resolveIcon } from "@/lib/icon-registry";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Panel } from "@/components/ui/panel";
import { SwipableRow } from "@/components/swipable-row";
import { useIsMobile } from "@/lib/use-is-mobile";
import type { ServiceItem } from "@/lib/site-data";

export interface IncludedServicesSectionProps {
  services: ServiceItem[];
  copy: {
    eyebrow: string;
    title: string;
    description: string;
  };
}

export function IncludedServicesSection({ services, copy }: IncludedServicesSectionProps) {
  const isMobile = useIsMobile();

  const servicesContent = (
    <SwipableRow
      itemCount={services.length}
      className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[var(--layout-grid-gutter)]"
    >
      {services.map((service, idx) => {
        const Icon = resolveIcon(service.icon);
        const cardContent = (
          <div className="group h-full flex flex-col gap-6 p-card rounded-[var(--radius-lg)] border border-[var(--border)] bg-white dark:bg-card transition-all duration-300 hover:shadow-xl hover:shadow-[var(--brand-primary)]/5 hover:border-[var(--brand-primary)]/20">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-white text-[var(--brand-primary)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[var(--brand-primary)] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[var(--brand-primary)]/20 dark:bg-white/5">
              <Icon className="size-7" />
            </div>
            <div className="space-y-3">
              <h3 className="heading-item text-xl tracking-tight text-[var(--text-heading)]">
                {service.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-[var(--text-body-subtle)] transition-colors group-hover:text-[var(--text-body)]">
                {service.description}
              </p>
            </div>
          </div>
        );

        if (isMobile) {
          return (
            <div key={idx} className="min-w-[85%] snap-center sm:min-w-0 h-full p-1">
              {cardContent}
            </div>
          );
        }

        return (
          <Reveal
            key={idx}
            delay={idx * 100}
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
    <section className="section-muted py-[var(--layout-section-spacing)] relative overflow-hidden">
      {/* Top section divider transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" aria-hidden="true" />
      
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-[var(--accent)]/[0.015] blur-3xl" />
      </div>
      
      <div className="shell-container space-y-12 relative z-10">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.title}
              description={copy.description}
            />
          </div>
        </Reveal>

        {isMobile ? (
          <Reveal delay={100}>{servicesContent}</Reveal>
        ) : (
          servicesContent
        )}
      </div>
    </section>
  );
}
