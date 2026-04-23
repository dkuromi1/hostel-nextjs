import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/ui/section-label";
import { ImageCarousel } from "@/components/image-carousel";
import { resolveIcon } from "@/lib/icon-registry";
import { cn } from "@/lib/utils";
import {
  fourBedDormImages,
  podDormImages,
  roomTypes,
  siteCopyContent,
} from "@/lib/site-data";

export function RoomsSection() {
  return (
    <section className="py-8 sm:py-16">
      <div className="shell-container space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={`${siteCopyContent.home.roomsSection.titleEyebrowPrefix} ${roomTypes[0].price}`}
            title={siteCopyContent.home.roomsSection.title}
            description={siteCopyContent.home.roomsSection.description}
          />
          <Link
            href="/rooms"
            className={cn(
              "group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full px-8 py-4",
              "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white",
              "text-sm font-bold tracking-tight antialiased",
              "shadow-[0_20px_50px_-12px_rgba(2,6,23,0.5)] ring-1 ring-white/15",
              "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(5,150,105,0.25)] hover:ring-white/25",
              "active:scale-95 active:translate-y-0"
            )}
          >
            <div className="absolute inset-0 z-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-emerald-50">
              {siteCopyContent.home.roomsSection.buttonLabel}
            </span>
            <div className="relative z-10 flex size-7 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover:bg-emerald-500 group-hover:scale-110">
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
                    images={room.name.includes("18-Bed") ? podDormImages : fourBedDormImages}
                    className="absolute inset-0 h-full rounded-none"
                    autoPlayInterval={0}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent z-10 flex p-5 sm:px-6 sm:py-4 items-start sm:items-end">
                    <Badge className="bg-white/20 text-white shadow-sm backdrop-blur-md pointer-events-auto">
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
                          <AmenityIcon className="size-3.5 shrink-0 text-emerald-600" />
                          <span className="whitespace-nowrap text-[11px] font-medium tracking-tight">
                            {amenity.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3">
                    <SectionLabel weight="bold" className="mb-4">
                      {siteCopyContent.home.roomsSection.detailsLabel}
                    </SectionLabel>
                    <ul className="grid gap-3">
                      {room.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-sm leading-6 text-[var(--text-body-subtle)]"
                        >
                          <Check
                            className="mt-1 size-4 shrink-0 text-emerald-600"
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
