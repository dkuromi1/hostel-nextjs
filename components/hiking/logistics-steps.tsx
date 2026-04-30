"use client";

import { Reveal } from "../reveal";
import { Panel } from "../ui/panel";

interface Step {
  title: string;
  price: string;
  description: string;
}

interface LogisticsStepsProps {
  steps: Step[];
}

export function LogisticsSteps({ steps }: LogisticsStepsProps) {
  return (
    <Reveal>
      <Panel className="p-0 overflow-hidden">
        <div className="divide-y divide-[var(--border)]/50">
          {steps.map((step, i) => (
            <div key={step.title} className="group relative flex gap-6 p-6 transition-colors hover:bg-[var(--muted)]/30">
              {/* Vertical connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[3rem] top-20 bottom-0 w-px bg-gradient-to-b from-[var(--brand-primary)]/30 to-transparent z-0" />
              )}
              
              <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--muted)] font-heading text-xl font-bold text-[var(--brand-primary)] shadow-sm transition-transform group-hover:scale-110">
                {i + 1}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-heading text-lg font-bold text-[var(--text-heading)]">
                    {step.title}
                  </h3>
                  {step.price && (
                    <span className="inline-flex min-w-[3.5rem] items-center justify-center rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-bold text-[var(--brand-primary)]">
                      {step.price}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-[var(--text-body-subtle)]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </Reveal>
  );
}
