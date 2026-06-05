"use client";
import { resolveIcon } from "@/lib/icon-registry";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Panel } from "@/components/ui/panel";
import { SwipableRow } from "@/components/swipable-row";
import { useIsMobile } from "@/lib/use-is-mobile";
import type { ServiceItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

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

  const getJaggedStyles = (index: number) => {
    switch (index % 4) {
      case 0:
        return "lg:-translate-y-1 lg:rotate-[-0.1deg]";
      case 1:
        return "lg:translate-y-1.5 lg:rotate-[0.1deg]";
      case 2:
        return "lg:-translate-y-0.5 lg:rotate-[-0.05deg]";
      case 3:
        return "lg:translate-y-1 lg:rotate-[0.15deg]";
      default:
        return "";
    }
  };

  const getCardTheme = (index: number) => {
    const themes = [
      {
        // Modern Facilities
        iconColor: "text-sky-600 dark:text-sky-400",
        iconBg: "bg-sky-50 dark:bg-sky-500/10",
        iconRing: "ring-sky-500/10 dark:ring-sky-500/20",
        glowColor: "hover:shadow-sky-500/[0.08] dark:hover:shadow-sky-500/[0.15] hover:border-sky-500/30",
        hoverBg: "group-hover/service-card:bg-sky-600",
        glowDot: "bg-sky-400",
        backdropBg: "bg-sky-500/10 dark:bg-sky-500/20",
        badgeText: "Comfort & Tech"
      },
      {
        // Shared Kitchen
        iconColor: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
        iconRing: "ring-emerald-500/10 dark:ring-emerald-500/20",
        glowColor: "hover:shadow-emerald-500/[0.08] dark:hover:shadow-emerald-500/[0.15] hover:border-emerald-500/30",
        hoverBg: "group-hover/service-card:bg-emerald-600",
        glowDot: "bg-emerald-400",
        backdropBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
        badgeText: "Social Cooking"
      },
      {
        // Breakfast
        iconColor: "text-amber-600 dark:text-amber-400",
        iconBg: "bg-amber-50 dark:bg-amber-500/10",
        iconRing: "ring-amber-500/10 dark:ring-amber-500/20",
        glowColor: "hover:shadow-amber-500/[0.08] dark:hover:shadow-amber-500/[0.15] hover:border-amber-500/30",
        hoverBg: "group-hover/service-card:bg-amber-600",
        glowDot: "bg-amber-400",
        backdropBg: "bg-amber-500/10 dark:bg-amber-500/20",
        badgeText: "Morning Fuel"
      },
      {
        // Community
        iconColor: "text-rose-600 dark:text-rose-400",
        iconBg: "bg-rose-50 dark:bg-rose-500/10",
        iconRing: "ring-rose-500/10 dark:ring-rose-500/20",
        glowColor: "hover:shadow-rose-500/[0.08] dark:hover:shadow-rose-500/[0.15] hover:border-rose-500/30",
        hoverBg: "group-hover/service-card:bg-rose-600",
        glowDot: "bg-rose-400",
        backdropBg: "bg-rose-500/10 dark:bg-rose-500/20",
        badgeText: "Hostel Vibe"
      },
      {
        // Adventure Ready
        iconColor: "text-violet-600 dark:text-violet-400",
        iconBg: "bg-violet-50 dark:bg-violet-500/10",
        iconRing: "ring-violet-500/10 dark:ring-violet-500/20",
        glowColor: "hover:shadow-violet-500/[0.08] dark:hover:shadow-violet-500/[0.15] hover:border-violet-500/30",
        hoverBg: "group-hover/service-card:bg-violet-600",
        glowDot: "bg-violet-400",
        backdropBg: "bg-violet-500/10 dark:bg-violet-500/20",
        badgeText: "Trip Logistics"
      }
    ];
    return themes[index % themes.length];
  };

  const servicesContent = (
    <SwipableRow
      itemCount={services.length}
      className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[var(--layout-grid-gutter)]"
    >
      {services.map((service, idx) => {
        const Icon = resolveIcon(service.icon);
        const theme = getCardTheme(idx);
        const cardContent = (
          <div className={cn(
            "group/service-card relative h-full flex flex-col gap-6 p-card rounded-[var(--radius-2xl)] border border-[var(--border)] bg-white/70 dark:bg-zinc-950/60 backdrop-blur-md transition-all duration-500 hover:shadow-2xl",
            theme.glowColor
          )}>
            {/* Offset layered background sheet for tactile visual depth */}
            <div className={cn(
              "absolute -inset-px rounded-[var(--radius-2xl)] border border-[var(--border)] -z-10 opacity-30 transition-all duration-500 translate-x-2.5 translate-y-2.5 group-hover/service-card:translate-x-4 group-hover/service-card:translate-y-4 dark:bg-card/25",
              theme.backdropBg
            )} />

            {/* Horizontal Header: Icon + Title/Badge side-by-side */}
            <div className="flex items-center gap-4">
              {/* Glowing Icon Container */}
              <div className={cn(
                "relative flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-xl)] shadow-sm ring-1 transition-all duration-500 group-hover/service-card:-translate-y-0.5 group-hover/service-card:shadow-lg group-hover/service-card:ring-transparent",
                theme.iconBg,
                theme.iconRing,
                theme.hoverBg
              )}>
                <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-current opacity-[0.03] blur-[4px] transition-all duration-500 group-hover/service-card:opacity-0" />
                <Icon className={cn("size-6 transition-colors duration-500", theme.iconColor, "group-hover/service-card:text-white")} />
              </div>

              {/* Title + Badge stacked to the right of icon */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className={cn("text-[9px] font-bold uppercase tracking-[0.2em]", theme.iconColor)}>
                  {theme.badgeText}
                </span>
                <h3 className="heading-item text-[1.05rem] leading-tight tracking-tight text-[var(--text-heading)]">
                  {service.title}
                </h3>
              </div>
            </div>

            {/* Description spanning full width below the header */}
            <p className="text-[14.5px] leading-relaxed text-[var(--text-body-subtle)] transition-colors group-hover/service-card:text-[var(--text-body)]">
              {service.description}
            </p>
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
            className={cn("min-w-[85%] snap-center sm:min-w-0 h-full", getJaggedStyles(idx))}
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-amber-500/[0.035] blur-[120px] dark:bg-amber-500/[0.02]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-sky-500/[0.035] blur-[120px] dark:bg-sky-500/[0.02]" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-emerald-500/[0.02] blur-[100px]" />
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
