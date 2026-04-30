"use client";

import { CheckCircle2 } from "@/lib/icon-registry";
import { Reveal } from "../reveal";
import { Panel } from "../ui/panel";

interface Item {
  name: string;
  description: string;
}

interface Category {
  name: string;
  items: Item[];
}

interface PackingListProps {
  categories: Category[];
}

export function PackingList({ categories }: PackingListProps) {
  return (
    <Reveal>
      <Panel className="p-0 overflow-hidden bg-white">
        {/* Responsive Grid: Stacked on mobile/tablet, Side-by-side categories on desktop */}
        <div className="grid divide-y divide-[var(--border)]/50 lg:grid-cols-3 lg:divide-y-0 lg:divide-x">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col">
              {/* Items List */}
              <div className="flex flex-col divide-y divide-[var(--border)]/30 h-full">
                {category.items.map((item) => (
                  <div key={item.name} className="group p-6 transition-colors hover:bg-[var(--muted)]/30 h-full">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] transition-transform group-hover:scale-110">
                          <CheckCircle2 className="size-4" strokeWidth={2.5} />
                        </div>
                        <h3 className="font-heading text-base font-bold text-[var(--text-heading)]">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--text-body-subtle)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
                {/* Empty spacer to keep columns even if items vary in count (though here they are 2-2-2) */}
                <div className="flex-1 bg-white" />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </Reveal>
  );
}
