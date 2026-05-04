import type { ReactNode } from "react";

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
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-8 sm:pb-16 pt-8 sm:pt-16">
      <div className="shell-container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <Reveal className="relative z-10 flex flex-col items-start gap-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <div className="flex flex-col gap-5">
            <h1 className="heading-page text-foreground">
              {title}
            </h1>
            <p className="max-w-[64ch] text-section-desc">
              {description}
            </p>
          </div>
          {!hideActions && <BookingActions bookingChannels={bookingChannels} contactChannels={contactChannels} />}
          {highlights ? (
            <ul className="grid w-full gap-4 sm:grid-cols-2">
              {highlights.map((item) => {
                const text = typeof item === "string" ? item : item.text;
                const title = typeof item === "object" ? item.title : undefined;
                const Icon = typeof item === "object" && item.icon ? resolveIcon(item.icon) : resolveIcon("Check");
                
                return (
                  <li
                    key={text}
                    className="group flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)]/50 p-4 transition-all duration-300 hover:border-[var(--brand-primary)]/30 hover:bg-[var(--glass-bg)] hover:shadow-md dark:hover:shadow-primary/5"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--glass-bg)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-300 group-hover:bg-[var(--brand-primary-light)] group-hover:text-[var(--brand-primary)] group-hover:ring-[var(--brand-primary)]/20">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex flex-col gap-0.5 py-0.5">
                      {title && (
                        <span className="text-[13px] font-bold leading-none tracking-tight text-[var(--text-heading)]">
                          {title}
                        </span>
                      )}
                      <span className={cn(
                        "text-[13px] leading-snug text-[var(--text-body-subtle)]",
                        !title && "text-[14px] font-medium text-[var(--text-body)]"
                      )}>
                        {text}
                      </span>
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
