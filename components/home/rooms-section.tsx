import Link from "next/link";
import { ArrowRight, Check, Star } from "@/lib/icon-registry";
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
    <section className="py-[var(--layout-section-spacing)] relative">
      {/* Top section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" aria-hidden="true" />
      
      <div className="w-full px-4 sm:px-6 lg:px-12 2xl:px-20 space-y-10 relative z-10">
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
          {roomTypes.map((room, index) => {
            const isFirst = index === 0;
            return (
              <Reveal key={room.name} delay={index * 100}>
                <Panel className="flex h-full flex-col overflow-hidden">
                  <div className="relative min-h-[var(--room-image-height)]">
                    <ImageCarousel
                      images={room.images}
                      className="absolute inset-0 h-full rounded-none"
                      autoPlayInterval={isFirst ? 5000 : 0}
                    />
                    <div className="pointer-events-none absolute inset-0 z-10 flex p-5 sm:px-6 sm:py-4 items-start sm:items-end">
                      <Badge className="bg-black/40 border border-white/10 text-white shadow-md backdrop-blur-md pointer-events-auto">
                        {room.price}/night
                      </Badge>
                    </div>
                    {isFirst && (
                      <div className="absolute top-5 right-5 z-20">
                        <div className="relative overflow-hidden rounded-full bg-amber-400 px-3 py-1.5 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:bg-amber-500 group/popular">
                          {/* Glossy shine */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover/popular:translate-x-full transition-transform duration-1000 ease-in-out" />
                          
                          <div className="relative z-10 flex items-center gap-2.5 text-slate-900">
                            <Star className="size-3 text-slate-900 fill-slate-900" />
                            <div className="h-3 w-px bg-slate-900/20" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                              Most Popular
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6 p-card-premium flex-1 flex flex-col bg-white dark:bg-card">
                    <div>
                      <SectionLabel variant="emerald" className="mb-3">
                        {room.label}
                      </SectionLabel>
                      <h3 className="mt-3 heading-card text-[var(--text-heading)]">
                        {room.name}
                      </h3>
                      <p className="mt-4 text-section-desc text-[var(--text-body-subtle)] line-clamp-3">
                        {room.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {room.amenities.slice(0, 4).map((amenity, idx) => {
                        const AmenityIcon = resolveIcon(amenity.icon);
                        return (
                          <div
                            key={idx}
                            className="flex w-fit items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--muted)]/50 px-3 py-2 text-[var(--text-body-subtle)] transition-all duration-300 hover:border-[var(--brand-primary)]/10 hover:shadow-sm hover:bg-[var(--glass-bg)]"
                          >
                            <AmenityIcon className="size-3.5 shrink-0 text-[var(--brand-primary)]" />
                            <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider">
                              {amenity.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-3 pt-4">
                      <SectionLabel weight="bold" className="opacity-70 text-[10px] uppercase tracking-widest">
                        {roomsSection.detailsLabel}
                      </SectionLabel>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {room.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2 text-[13px] leading-tight text-[var(--text-body-subtle)]"
                          >
                            <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--brand-primary)]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Panel>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
