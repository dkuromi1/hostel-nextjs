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
  mobileText?: string;
  icon?: IconName;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: readonly (string | HighlightItem)[];
  highlightVariant?: "ledger" | "timeline" | "pills";
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
  highlightVariant = "ledger",
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
        "shell-container relative z-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center min-w-0 w-full max-w-full",
        hasBackground ? "w-full" : ""
      )}>
        <Reveal className="relative z-10 flex flex-col items-start gap-8 min-w-0 w-full max-w-full">
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
            highlightVariant === "timeline" ? (
              <div className="relative flex flex-col w-full">
                {highlights.map((item, index) => {
                  const text = typeof item === "string" ? item : item.text;
                  const mobileText = typeof item === "object" ? item.mobileText : undefined;
                  const title = typeof item === "object" ? item.title : undefined;
                  const Icon = typeof item === "object" && item.icon ? resolveIcon(item.icon) : resolveIcon("Check");
                  const isLast = index === highlights.length - 1;

                  return (
                    <div key={title || text} className="group relative flex items-start gap-4 sm:gap-5">
                      {/* Node column with perfectly centered vertical line */}
                      <div className="relative flex flex-col items-center self-stretch shrink-0">
                        <div className={cn(
                          "relative z-10 flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110",
                          hasBackground
                            ? "border-emerald-400/40 bg-slate-950/85 text-emerald-400 shadow-emerald-500/20 group-hover:border-emerald-400 group-hover:shadow-emerald-500/40"
                            : "border-[var(--brand-primary)]/40 bg-white text-[var(--brand-primary)] shadow-sm group-hover:border-[var(--brand-primary)]"
                        )}>
                          <Icon className="size-3.5 sm:size-4" />
                        </div>
                        {!isLast && (
                          <div 
                            className="w-[1.5px] flex-1 bg-gradient-to-b from-emerald-400/70 via-emerald-400/35 to-emerald-400/15 my-1.5" 
                            aria-hidden="true" 
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className={cn("flex flex-1 flex-col gap-1 min-w-0 pt-1", !isLast && "pb-5 sm:pb-6")}>
                        {title ? (
                          <h3 className={cn(
                            "font-sans font-bold text-sm sm:text-base leading-snug tracking-tight transition-colors duration-300",
                            hasBackground ? "text-white group-hover:text-emerald-100" : "text-[var(--text-heading)]"
                          )}>
                            {title}
                          </h3>
                        ) : null}
                        <p className={cn(
                          "text-xs sm:text-[13px] leading-relaxed font-normal max-w-[54ch] transition-colors duration-300",
                          hasBackground ? "text-white/80 group-hover:text-white/95" : "text-[var(--text-body-subtle)] group-hover:text-[var(--text-body)]"
                        )}>
                          {mobileText ? (
                            <>
                              <span className="sm:hidden">{mobileText}</span>
                              <span className="hidden sm:inline">{text}</span>
                            </>
                          ) : (
                            text
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : highlightVariant === "pills" ? (
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full">
                {highlights.map((item) => {
                  const text = typeof item === "string" ? item : item.text;
                  const mobileText = typeof item === "object" ? item.mobileText : undefined;
                  const title = typeof item === "object" ? item.title : undefined;
                  const Icon = typeof item === "object" && item.icon ? resolveIcon(item.icon) : resolveIcon("Check");
                  const label = title || text;

                  return (
                    <div
                      key={label}
                      title={text !== label ? text : undefined}
                      className={cn(
                        "group relative inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs sm:text-[13px] font-semibold tracking-tight transition-all duration-300 select-none cursor-default",
                        hasBackground
                          ? "border-white/20 bg-slate-950/40 text-white shadow-lg shadow-black/30 backdrop-blur-md hover:border-emerald-400/50 hover:bg-slate-900/60 hover:shadow-emerald-500/10 hover:-translate-y-0.5"
                          : "border-[var(--border)] bg-card/80 text-[var(--text-heading)] shadow-sm backdrop-blur-md hover:border-[var(--brand-primary)]/40 hover:bg-card hover:-translate-y-0.5"
                      )}
                    >
                      <div className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
                        hasBackground ? "text-emerald-400" : "text-[var(--brand-primary)]"
                      )}>
                        <Icon className="size-3.5" />
                      </div>
                      <span>
                        {mobileText && !title ? (
                          <>
                            <span className="sm:hidden">{mobileText}</span>
                            <span className="hidden sm:inline">{label}</span>
                          </>
                        ) : (
                          label
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Direction A: Curated Editorial Ledger (without numbers) */
              <div className={cn(
                "w-full rounded-2xl border backdrop-blur-xl transition-all duration-500 overflow-hidden",
                hasBackground
                  ? "border-white/15 bg-slate-950/45 shadow-[0_16px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
                  : "border-[var(--border)] bg-card/80 shadow-lg"
              )}>
                <div className={cn(
                  "divide-y",
                  hasBackground ? "divide-white/10" : "divide-[var(--border)]"
                )}>
                  {highlights.map((item) => {
                    const text = typeof item === "string" ? item : item.text;
                    const mobileText = typeof item === "object" ? item.mobileText : undefined;
                    const title = typeof item === "object" ? item.title : undefined;
                    const Icon = typeof item === "object" && item.icon ? resolveIcon(item.icon) : resolveIcon("Check");

                    return (
                      <div
                        key={text}
                        className={cn(
                          "group relative flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 transition-colors duration-300",
                          hasBackground ? "hover:bg-white/[0.05]" : "hover:bg-[var(--muted)]/50"
                        )}
                      >
                        {/* Subtle icon badge */}
                        <div className="flex shrink-0 pt-0.5">
                          <div className={cn(
                            "flex size-8 items-center justify-center rounded-lg transition-colors duration-300",
                            hasBackground 
                              ? "bg-white/[0.08] text-white/90 group-hover:bg-white/[0.15] group-hover:text-white" 
                              : "bg-[var(--muted)] text-[var(--text-heading)] group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)]"
                          )}>
                            <Icon className="size-4" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col gap-1 min-w-0">
                          {title ? (
                            <h3 className={cn(
                              "font-sans font-semibold text-sm sm:text-[0.95rem] leading-snug tracking-tight transition-colors duration-300",
                              hasBackground ? "text-white group-hover:text-white" : "text-[var(--text-heading)]"
                            )}>
                              {title}
                            </h3>
                          ) : null}
                          <p className={cn(
                            "text-xs sm:text-[13px] leading-relaxed font-normal transition-colors duration-300",
                            hasBackground ? "text-white/80 group-hover:text-white/95" : "text-[var(--text-body-subtle)] group-hover:text-[var(--text-body)]"
                          )}>
                            {mobileText ? (
                              <>
                                <span className="sm:hidden">{mobileText}</span>
                                <span className="hidden sm:inline">{text}</span>
                              </>
                            ) : (
                              text
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          ) : null}
        </Reveal>
        <Reveal delay={120} className="relative min-w-0 w-full max-w-full">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
