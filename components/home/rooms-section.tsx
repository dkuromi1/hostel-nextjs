import Link from "next/link";
import { ArrowRight, Check } from "@/lib/icon-registry";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/ui/section-label";
import { ImageCarousel } from "@/components/image-carousel";
import { EditorialButton } from "@/components/ui/editorial-button";
import { resolveIcon } from "@/lib/icon-registry";

import { cn } from "@/lib/utils";
import type { RoomType } from "@/lib/site-data";

export interface RoomsSectionProps {
  roomsSection: {
    titleEyebrowPrefix: string;
    title: string;
    description: string;
    buttonLabel: string;
    detailsLabel: string;
  };
  roomTypes: RoomType[];
}

export function RoomsSection({ roomsSection, roomTypes }: RoomsSectionProps) {
  return (
    <section className="py-[var(--layout-section-spacing)]">
      <div className="shell-container space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={`${roomsSection.titleEyebrowPrefix} ${roomTypes[0]?.price ?? ""}`}
            title={roomsSection.title}
            description={roomsSection.description}
          />
          <EditorialButton
            href="/rooms"
            label={roomsSection.buttonLabel}
          />

        </div>

        <div className="grid gap-[var(--layout-grid-gutter)] lg:grid-cols-2">
          {roomTypes.map((room, index) => (
            <Reveal key={room.name} delay={index * 100}>
              <Panel className="flex h-full flex-col overflow-hidden">
                <div className="relative min-h-[var(--room-image-height)]">
                  <ImageCarousel
                    images={room.images}
                    className="absolute inset-0 h-full rounded-none"
                    autoPlayInterval={0}
                  />
                  <div className="pointer-events-none absolute inset-0 z-10 flex p-5 sm:px-6 sm:py-4 items-start sm:items-end">
                    <Badge className="bg-black/40 border border-white/10 text-white shadow-md backdrop-blur-md pointer-events-auto">
                      {room.price}/night
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4 p-5 sm:p-6">
                  <div>
                    <SectionLabel variant="emerald" className="mb-2">
                      {room.label}
                    </SectionLabel>
                    <h3 className="mt-3 heading-card text-[var(--text-heading)]">
                      {room.name}
                    </h3>
                    <p className="mt-3 text-section-desc text-[var(--text-body-subtle)] line-clamp-3">
                      {room.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {room.amenities.map((amenity, idx) => {
                      const AmenityIcon = resolveIcon(amenity.icon);
                      return (
                        <div
                          key={idx}
                          className="flex w-fit items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--muted)]/50 px-2.5 py-1.5 text-[var(--text-body-subtle)] transition-all duration-300 hover:border-[var(--brand-primary)]/10 hover:shadow-sm hover:bg-[var(--glass-bg)]"
                        >
                          <AmenityIcon className="size-3 shrink-0 text-[var(--brand-primary)]" />
                          <span className="whitespace-nowrap text-xs font-medium">
                            {amenity.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <SectionLabel weight="bold" className="mb-1 opacity-70">
                      {roomsSection.detailsLabel}
                    </SectionLabel>
                    <ul className="grid gap-2">
                      {room.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 text-[13px] leading-tight text-[var(--text-body-subtle)]"
                        >
                          <Check
                            className="mt-0.5 size-3.5 shrink-0 text-[var(--brand-primary)]"
                            strokeWidth={2}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
