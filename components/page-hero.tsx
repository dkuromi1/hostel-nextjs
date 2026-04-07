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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top_left,rgba(13,148,136,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_36%)]" />
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <Reveal className="relative z-10 space-y-8">
          <Badge>{eyebrow}</Badge>
          <div className="space-y-5">
            <h1 className="font-heading text-5xl leading-none tracking-[-0.075em] text-slate-950 md:text-7xl">
              {title}
            </h1>
            <p className="max-w-[64ch] text-lg leading-8 text-slate-600">
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
                    className="flex items-center gap-3 rounded-2xl border border-emerald-600/10 bg-white/70 px-4 py-3 text-sm text-slate-700 shadow-[0_16px_40px_-28px_rgba(11,32,29,0.45)] transition-colors hover:border-emerald-200 hover:bg-emerald-50/50"
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
