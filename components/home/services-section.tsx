"use client";
import { resolveIcon } from "@/lib/icon-registry";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
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
          <div
            className="group flex h-full gap-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 transition-all duration-300 hover:border-[var(--brand-primary)]/20 hover:shadow-md"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--muted)] text-[var(--text-body)] shadow-sm ring-1 ring-[var(--foreground)]/5 transition-all duration-300 group-hover:bg-[var(--brand-primary-light)] group-hover:text-[var(--brand-primary)] group-hover:ring-[var(--brand-primary)]/20">
              <Icon className="size-5" strokeWidth={1.5} />
            </div>
            <div className="space-y-1.5 pt-0.5">
              <h3 className="text-[15px] font-bold tracking-tight text-[var(--text-heading)]">
                {service.title}
              </h3>
              <p className="text-sm leading-snug text-[var(--text-body-subtle)] line-clamp-2 transition-colors group-hover:text-[var(--text-body)]">
                {service.description}
              </p>
            </div>
          </div>
        );

        if (isMobile) {
          return (
            <div key={idx} className="min-w-[85%] snap-center sm:min-w-0 h-full">
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
    <section className="py-[var(--layout-section-spacing)]">
      <div className="shell-container space-y-12">
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
