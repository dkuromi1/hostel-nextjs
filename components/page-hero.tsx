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
      {topRight && (
        <div className="absolute right-4 top-4 z-40 sm:right-6 sm:top-6 lg:right-10 lg:top-10">
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
          <Eyebrow 
            className={cn(hasBackground && "text-white")}
            variant={hasBackground ? "footer" : "default"}
          >
            {eyebrow}
          </Eyebrow>
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
              {highlights.map((item) => {
                const text = typeof item === "string" ? item : item.text;
                const title = typeof item === "object" ? item.title : undefined;
                const Icon = typeof item === "object" && item.icon ? resolveIcon(item.icon) : resolveIcon("Check");
                
                return (
                  <li
                    key={text}
                    className={cn(
                      "group flex items-start gap-4 rounded-2xl border p-4 transition-all duration-300",
                      hasBackground 
                        ? "border-white/10 bg-white/5 backdrop-blur-md hover:border-white/30 hover:bg-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                        : "border-[var(--border)] bg-[var(--card)]/50 hover:border-[var(--brand-primary)]/30 hover:bg-[var(--glass-bg)] hover:shadow-md dark:hover:shadow-primary/5"
                    )}
                  >
                    <div className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 transition-all duration-300",
                      hasBackground
                        ? "bg-white/10 text-white ring-white/20 group-hover:bg-[var(--brand-primary)] group-hover:text-white"
                        : "bg-[var(--glass-bg)] ring-[var(--border)] group-hover:bg-[var(--brand-primary-light)] group-hover:text-[var(--brand-primary)] group-hover:ring-[var(--brand-primary)]/20"
                    )}>
                      <Icon className="size-5" />
                    </div>
                    <div className="flex flex-col gap-1.5 py-0.5">
                      {title && (
                        <div className={cn(
                          "heading-item font-bold m-0",
                          hasBackground ? "text-white" : "text-[var(--text-heading)]"
                        )}>
                          {title}
                        </div>
                      )}
                      <div className={cn(
                        "text-card-body transition-colors m-0",
                        hasBackground ? "text-white/80 group-hover:text-white" : "group-hover:text-[var(--text-body)]",
                        !title && (hasBackground ? "font-medium text-white" : "font-medium text-[var(--text-body)]")
                      )}>
                        {text}
                      </div>
                    </div>
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
