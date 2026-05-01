import Link from "next/link";
import { ArrowRight, Check } from "@/lib/icon-registry";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/ui/section-label";
import { ImageCarousel } from "@/components/image-carousel";
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
    <section className="py-8 sm:py-16">
      <div className="shell-container space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={`${roomsSection.titleEyebrowPrefix} ${roomTypes[0]?.price ?? ""}`}
            title={roomsSection.title}
            description={roomsSection.description}
          />
          <Link
            href="/rooms"
            className={cn(
              "group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full px-8 py-4",
              "bg-gradient-to-br from-black via-zinc-900 to-black",
              "text-sm font-semibold tracking-tight text-white",
              "shadow-lg shadow-black/50 ring-1 ring-white/10",
              "transition-all duration-300 hover:shadow-xl hover:shadow-black/60 hover:-translate-y-0.5",
              "active:scale-95 active:translate-y-0"
            )}
          >
            <div className="absolute inset-0 z-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
            <span className="relative z-10">
              {roomsSection.buttonLabel}
            </span>
            <div className="relative z-10 flex size-7 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover:bg-[var(--brand-accent)] group-hover:scale-110">
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </div>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {roomTypes.map((room, index) => (
            <Reveal key={room.name} delay={index * 100}>
              <Panel className="flex h-full flex-col overflow-hidden">
                <div className="relative min-h-[18rem]">
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

                <div className="space-y-6 p-6 sm:p-8">
                  <div>
                    <SectionLabel variant="emerald" className="mb-3">
                      {room.label}
                    </SectionLabel>
                    <h3 className="mt-3 heading-card text-[var(--text-heading)]">
                      {room.name}
                    </h3>
                    <p className="mt-4 text-section-desc">
                      {room.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, idx) => {
                      const AmenityIcon = resolveIcon(amenity.icon);
                      return (
                        <div
                          key={idx}
                          className="flex w-fit items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 px-3 py-2 text-[var(--text-body)]"
                        >
                          <AmenityIcon className="size-3.5 shrink-0 text-[var(--brand-primary)]" />
                          <span className="whitespace-nowrap text-xs font-medium tracking-tight">
                            {amenity.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3">
                    <SectionLabel weight="bold" className="mb-4">
                      {roomsSection.detailsLabel}
                    </SectionLabel>
                    <ul className="grid gap-3">
                      {room.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-sm leading-6 text-[var(--text-body-subtle)]"
                        >
                          <Check
                            className="mt-1 size-4 shrink-0 text-[var(--brand-primary)]"
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
