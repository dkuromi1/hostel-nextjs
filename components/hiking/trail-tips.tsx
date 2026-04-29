"use client";

import { Info } from "lucide-react";
import { Reveal } from "../reveal";
import { Panel } from "../ui/panel";

interface Tip {
  title: string;
  description: string;
}

interface TrailTipsProps {
  tips: Tip[];
}

export function TrailTips({ tips }: TrailTipsProps) {
  return (
    <Reveal>
      <Panel className="p-0 overflow-hidden">
        <div className="grid divide-y divide-[var(--border)]/50 lg:grid-cols-3 lg:divide-y-0 lg:divide-x">
          {tips.map((tip, i) => (
            <div key={tip.title} className="group relative p-6 sm:p-8 transition-colors hover:bg-[var(--muted)]/30">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] transition-transform group-hover:scale-110">
                    <Info className="size-4" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[var(--text-heading)]">
                    {tip.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[var(--text-body-subtle)]">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </Reveal>
  );
}
