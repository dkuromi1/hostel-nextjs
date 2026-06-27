"use client";

import { resolveIcon } from "@/lib/icon-registry";
import { Reveal } from "../reveal";
import { Panel } from "../ui/panel";

interface Day {
  day: string;
  title: string;
  description: string;
  icon: string;
}

interface ItineraryDaysProps {
  days: Day[];
}

const CARD_PALETTE = [
  {
    icon:    "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    hover:   "group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-emerald-400/30",
    glow:    "bg-emerald-400/10",
    line:    "via-emerald-500/50",
    label:   "text-emerald-600/80 dark:text-emerald-400/80 group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
  },
  {
    icon:    "bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
    hover:   "group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-sky-400/30",
    glow:    "bg-sky-400/10",
    line:    "via-sky-500/50",
    label:   "text-sky-600/80 dark:text-sky-400/80 group-hover:text-sky-600 dark:group-hover:text-sky-400",
  },
  {
    icon:    "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    hover:   "group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-amber-400/30",
    glow:    "bg-amber-400/10",
    line:    "via-amber-500/50",
    label:   "text-amber-600/80 dark:text-amber-400/80 group-hover:text-amber-600 dark:group-hover:text-amber-400",
  },
];

export function ItineraryDays({ days }: ItineraryDaysProps) {
  return (
    <div className="grid gap-[var(--layout-grid-gutter)] lg:grid-cols-3">
      {days.map((day, i) => {
        const Icon = resolveIcon(day.icon);
        const c = CARD_PALETTE[i % CARD_PALETTE.length];
        return (
          <Reveal key={day.day} delay={i * 100}>
            <Panel className="group relative flex h-full flex-col overflow-hidden p-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent ${c.line} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="relative mb-8">
                <div className={`absolute -top-4 -left-4 size-20 ${c.glow} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative flex items-center justify-between">
                  <div className={`flex size-14 items-center justify-center rounded-2xl shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${c.icon} ${c.hover}`}>
                    <Icon className="size-7" />
                  </div>
                  <span className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${c.label}`}>
                    {day.day}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-heading text-xl font-extrabold leading-tight tracking-tight text-[var(--text-heading)]">
                  {day.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-body-subtle)]">
                  {day.description}
                </p>
              </div>
            </Panel>
          </Reveal>
        );
      })}
    </div>
  );
}

