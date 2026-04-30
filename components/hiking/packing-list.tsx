"use client";

import { resolveIcon } from "@/lib/icon-registry";
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

const getGearIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("footwear") || n.includes("boots")) return "Footprints";
  if (n.includes("maps") || n.includes("power")) return "Map";
  if (n.includes("layers") || n.includes("fleece")) return "Wind";
  if (n.includes("sun")) return "Sun";
  if (n.includes("water") || n.includes("snacks")) return "Droplets";
  if (n.includes("cash") || n.includes("lek")) return "Coins";
  return "CheckCircle2";
};

export function PackingList({ categories }: PackingListProps) {
  return (
    <Reveal>
      <Panel className="p-0 overflow-hidden">
        {/* Responsive Grid: Stacked on mobile/tablet, Side-by-side categories on desktop */}
        <div className="grid divide-y divide-[var(--border)]/50 lg:grid-cols-3 lg:divide-y-0 lg:divide-x">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col">
              {/* Category Header - Hidden if it's just general gear, but kept for structure */}
              <div className="flex flex-col divide-y divide-[var(--border)]/30 h-full">
                {category.items.map((item) => {
                  const Icon = resolveIcon(getGearIcon(item.name));
                  return (
                    <div key={item.name} className="group p-5 transition-all duration-300 hover:bg-[var(--muted)]/40 h-full">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]/10 transition-all duration-300 group-hover:bg-[var(--brand-primary)] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[var(--brand-primary)]/20">
                            <Icon className="size-5" strokeWidth={1.8} />
                          </div>
                          <h3 className="font-heading text-base font-bold tracking-tight text-[var(--text-heading)]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-sm leading-relaxed text-[var(--text-body-subtle)]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {/* Empty spacer to keep columns even */}
                <div className="flex-1" />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </Reveal>
  );
}
