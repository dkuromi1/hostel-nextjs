import type { ReactNode } from "react";
import Image from "next/image";

import { BookingActions } from "@/components/booking-actions";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { resolveIcon, type IconName } from "@/lib/icon-registry";
import type { BusinessChannel } from "@/lib/site-data";

type HighlightItem = {
  title?: string;
  text: string;
  icon?: IconName;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: readonly (string | HighlightItem)[];
  children: ReactNode;
  hideActions?: boolean;
  bookingChannels?: BusinessChannel[];
  contactChannels?: BusinessChannel[];
  backgroundImage?: string;
  backgroundAlt?: string;
  backgroundPosition?: string;
  topRight?: ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  highlights,
  children,
  hideActions = false,
  bookingChannels = [],
  contactChannels = [],
  backgroundImage,
  backgroundAlt,
  backgroundPosition = "center",
  topRight,
  className,
}: PageHeroProps) {
  const hasBackground = !!backgroundImage;

  return (
    <section className={cn(
      "relative overflow-hidden pb-8 sm:pb-16 pt-8 sm:pt-16",
      hasBackground ? "min-h-[45dvh] sm:min-h-[60dvh] flex flex-col justify-center" : "",
      className
    )}>
      {/* Bottom section divider for transitions */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent z-20" aria-hidden="true" />
      {topRight && (
        <div className="absolute right-4 top-4 z-40 sm:right-6 sm:top-6 lg:right-10 lg:top-10 hidden sm:block">
          {topRight}
        </div>
      )}
      {hasBackground && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={backgroundAlt || ""}
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            style={{ objectPosition: backgroundPosition }}
            sizes="100vw"
          />
          <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(2,6,23,0.85)_0%,rgba(2,6,23,0.6)_40%,rgba(2,6,23,0.2)_100%)] dark:bg-[linear-gradient(to_right,rgba(2,6,23,0.9)_0%,rgba(2,6,23,0.7)_50%,rgba(2,6,23,0.3)_100%)]" />
        </div>
      )}

      <div className={cn(
        "shell-container relative z-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center",
        hasBackground ? "w-full" : ""
      )}>
        <Reveal className="relative z-10 flex flex-col items-start gap-8">
          <div className="flex flex-wrap items-center justify-between gap-4 w-full sm:block">
            <Eyebrow 
              className={cn(hasBackground && "text-white")}
              variant={hasBackground ? "footer" : "default"}
            >
              {eyebrow}
            </Eyebrow>
            {topRight && (
              <div className="sm:hidden ml-auto">
                {topRight}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <h1 className={cn(
              "heading-page",
              hasBackground ? "text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]" : "text-foreground"
            )}>
              {title}
            </h1>
            <p className={cn(
              "max-w-[64ch] text-section-desc",
              hasBackground ? "text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]" : ""
            )}>
              {description}
            </p>
          </div>
          {!hideActions && (
            <BookingActions 
              bookingChannels={bookingChannels} 
              contactChannels={contactChannels} 
              forceLight={hasBackground}
              className={cn(hasBackground && "gap-4")}
            />
          )}
          {highlights ? (
            <ul className="grid w-full gap-4 sm:grid-cols-2">
              {highlights.map((item, index) => {
                const text = typeof item === "string" ? item : item.text;
                const title = typeof item === "object" ? item.title : undefined;
                const Icon = typeof item === "object" && item.icon ? resolveIcon(item.icon) : resolveIcon("Check");
                
                // Color theme mapping for a premium visual upgrade
                const themes = [
                  {
                    iconColor: hasBackground ? "text-sky-300 group-hover:text-white" : "text-sky-600 dark:text-sky-400 group-hover:text-white",
                    iconBg: hasBackground ? "bg-sky-500/10 ring-sky-500/20 group-hover:bg-sky-500" : "bg-sky-50 dark:bg-sky-500/10 ring-sky-500/10 dark:ring-sky-500/20 group-hover:bg-sky-600",
                    glowBorder: hasBackground ? "group-hover:border-sky-500/40" : "group-hover:border-sky-500/30",
                    backdropBg: hasBackground ? "bg-sky-500/5 border-sky-500/15" : "bg-sky-500/5 dark:bg-sky-500/10 border-[var(--border)]",
                  },
                  {
                    iconColor: hasBackground ? "text-emerald-300 group-hover:text-white" : "text-emerald-600 dark:text-emerald-400 group-hover:text-white",
                    iconBg: hasBackground ? "bg-emerald-500/10 ring-emerald-500/20 group-hover:bg-emerald-500" : "bg-emerald-50 dark:bg-emerald-500/10 ring-emerald-500/10 dark:ring-emerald-500/20 group-hover:bg-emerald-600",
                    glowBorder: hasBackground ? "group-hover:border-emerald-500/40" : "group-hover:border-emerald-500/30",
                    backdropBg: hasBackground ? "bg-emerald-500/5 border-emerald-500/15" : "bg-emerald-500/5 dark:bg-emerald-500/10 border-[var(--border)]",
                  },
                  {
                    iconColor: hasBackground ? "text-amber-300 group-hover:text-white" : "text-amber-600 dark:text-amber-400 group-hover:text-white",
                    iconBg: hasBackground ? "bg-amber-500/10 ring-amber-500/20 group-hover:bg-amber-500" : "bg-amber-50 dark:bg-amber-500/10 ring-amber-500/10 dark:ring-amber-500/20 group-hover:bg-amber-600",
                    glowBorder: hasBackground ? "group-hover:border-amber-500/40" : "group-hover:border-amber-500/30",
                    backdropBg: hasBackground ? "bg-amber-500/5 border-amber-500/15" : "bg-amber-500/5 dark:bg-amber-500/10 border-[var(--border)]",
                  }
                ];
                const theme = themes[index % themes.length];

                return (
                  <li
                    key={text}
                    className={cn(
                      "group relative flex flex-col gap-3 rounded-2xl border p-4 sm:p-5 transition-all duration-500",
                      hasBackground 
                        ? "border-white/[0.12] bg-black/50 backdrop-blur-lg hover:bg-black/60 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                        : "border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-md hover:bg-[var(--glass-bg)] hover:shadow-xl dark:hover:shadow-primary/5",
                      theme.glowBorder
                    )}
                  >
                    {/* Layered backdrop sheet for physical depth */}
                    <div className={cn(
                      "absolute -inset-px rounded-2xl border -z-10 opacity-30 transition-all duration-500 translate-x-2.5 translate-y-2.5 group-hover:translate-x-4 group-hover:translate-y-4 dark:bg-card/20",
                      theme.backdropBg
                    )} />

                    {/* Icon + title row */}
                    <div className="relative z-10 flex items-center gap-3">
                      <div className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:ring-transparent",
                        theme.iconBg
                      )}>
                        <Icon className={cn("size-[18px] transition-colors duration-500", theme.iconColor)} />
                      </div>
                      {title ? (
                        <div className={cn(
                          "font-sans font-bold text-sm sm:text-[0.925rem] leading-snug tracking-tight m-0 transition-colors duration-300 min-w-0",
                          hasBackground ? "text-white" : "text-[var(--text-heading)]"
                        )}>
                          {title}
                        </div>
                      ) : (
                        <div className={cn(
                          "text-card-body font-medium transition-colors duration-300 m-0 min-w-0",
                          hasBackground ? "text-white group-hover:text-white" : "text-[var(--text-body)] group-hover:text-[var(--text-body)]"
                        )}>
                          {text}
                        </div>
                      )}
                    </div>

                    {/* Description — full bubble width, wraps under icon */}
                    {title && (
                      <div className={cn(
                        "relative z-10 text-[13px] leading-relaxed font-medium transition-colors duration-300",
                        hasBackground ? "text-white/85 group-hover:text-white/95" : "text-[var(--text-body-subtle)] group-hover:text-[var(--text-body)]"
                      )}>
                        {text}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </Reveal>
        <Reveal delay={120} className="relative">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
