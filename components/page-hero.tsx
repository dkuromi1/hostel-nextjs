import type { ReactNode, ElementType } from "react";
import { Check } from "lucide-react";

import { BookingActions } from "@/components/booking-actions";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";

type HighlightItem = {
  text: string;
  icon?: ElementType;
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
    <section className="relative overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <Reveal className="relative z-10 flex flex-col items-start gap-8">
          <Badge>{eyebrow}</Badge>
          <div className="flex flex-col gap-5">
            <h1 className="font-heading text-5xl leading-none tracking-[-0.075em] text-foreground md:text-7xl">
              {title}
            </h1>
            <p className="max-w-[64ch] text-lg leading-8 text-muted-foreground">
              {description}
            </p>
          </div>
          {!hideActions && <BookingActions />}
          {highlights ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => {
                const text = typeof item === "string" ? item : item.text;
                const Icon = typeof item === "object" && item.icon ? item.icon : Check;
                return (
                  <li
                    key={text}
                    className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-card/70 px-4 py-3 text-sm text-foreground shadow-[0_16px_40px_-28px_rgba(11,32,29,0.45)] dark:shadow-none transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <Icon className="size-4 shrink-0 text-emerald-600" />
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
