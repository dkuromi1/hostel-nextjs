import type { ReactNode } from "react";

import { BookingActions } from "@/components/booking-actions";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { resolveIcon, type IconName } from "@/lib/icon-registry";

type HighlightItem = {
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
};

export function PageHero({
  eyebrow,
  title,
  description,
  highlights,
  children,
  hideActions = false,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-24 sm:pb-32 pt-8 sm:pt-24">
      <div className="shell-container grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
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
          {!hideActions && <BookingActions />}
          {highlights ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => {
                const text = typeof item === "string" ? item : item.text;
                const Icon = typeof item === "object" && item.icon ? resolveIcon(item.icon) : resolveIcon("Check");
                return (
                  <li
                    key={text}
                    className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-card/70 px-4 py-3 text-sm text-foreground shadow-[0_16px_40px_-28px_var(--shadow-interactive-soft)] dark:shadow-none transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <Icon className="size-4 shrink-0 text-[var(--brand-primary)]" />
                    <span>{text}</span>
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
