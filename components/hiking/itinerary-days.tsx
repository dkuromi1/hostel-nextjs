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
    <div className="grid gap-6 lg:grid-cols-3">
      {days.map((day, i) => {
        const Icon = resolveIcon(day.icon);
        return (
          <Reveal key={day.day} delay={i * 100}>
            <Panel className="flex h-full flex-col p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                  <Icon className="size-6" />
                </div>
                <div className="inline-flex rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary-dark)]">
                  {day.day}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-heading text-xl font-bold text-[var(--text-heading)]">
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
