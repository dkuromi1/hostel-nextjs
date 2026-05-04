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

export function ItineraryDays({ days }: ItineraryDaysProps) {
  return (
    <div className="grid gap-[var(--layout-grid-gutter)] lg:grid-cols-3">
      {days.map((day, i) => {
        const Icon = resolveIcon(day.icon);
        return (
          <Reveal key={day.day} delay={i * 100}>
            <Panel className="group flex h-full flex-col p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-t-2 border-transparent hover:border-[var(--brand-primary)]/30">
              <div className="relative mb-8">
                <div className="absolute -top-4 -left-4 size-20 bg-[var(--brand-primary)]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-between">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-[var(--muted)] text-[var(--brand-primary)] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--brand-primary)] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[var(--brand-primary)]/20">
                    <Icon className="size-7" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-primary)]/80 group-hover:text-[var(--brand-primary)] transition-colors">
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
