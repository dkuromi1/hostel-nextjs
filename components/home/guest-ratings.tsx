import { cn } from "@/lib/utils";
import { Star, Award } from "@/lib/icon-registry";
import { ChannelIcon } from "@/components/channel-icon";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import type { GuestRatingCard } from "@/lib/site-data";

export interface GuestRatingsData {
  label: string;
  topRatedLabel: string;
  bookingSourceLabel: string;
  bookingAwardTitle: string;
  bookingScoreSuffix: string;
  bookingDescription: string;
  hostelworldSourceLabel: string;
  hostelworldTitle: string;
  hostelworldReviewsSuffix: string;
  hostelworldImageAlt: string;
}

export interface GuestRatingsProps {
  copy: GuestRatingsData;
  ratings: GuestRatingCard[];
}

export function CompactGuestRatingsStrip({
  copy,
  ratings,
}: GuestRatingsProps) {
  const visibleRatings = ratings.slice(0, 2);
  if (visibleRatings.length === 0) return null;

  return (
    <div className="grid w-full gap-[var(--layout-grid-gutter)] sm:grid-cols-2">
      {visibleRatings.map((rating) => (
        <a
          key={rating.id}
          href={rating.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-w-0 items-center justify-between gap-2 rounded-xl border border-white/16 bg-black/40 px-3 py-2.5 text-white shadow-[0_18px_45px_-30px_rgba(0,0,0,0.5)] backdrop-blur-[5px] transition-all duration-300 hover:border-white/24 hover:bg-black/50 sm:gap-3 sm:rounded-[var(--radius-2xl)] sm:px-4 sm:py-3"
        >
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <ChannelIcon iconKey={rating.icon} iconOnly monochromeHover className="size-7 shrink-0 sm:size-9" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
                {rating.sourceLabel}
              </p>
              <p className="truncate text-sm font-medium text-white/92">
                {rating.title}
              </p>
            </div>
          </div>
          <div className="shrink-0 rounded-lg bg-white/8 px-2 py-1.5 text-right ring-1 ring-white/12 shadow-sm sm:rounded-[var(--radius-xl)] sm:px-3 sm:py-2">
            <p className="font-sans text-lg font-bold leading-none tracking-tight text-white text-center sm:text-xl">
              {rating.rating}
            </p>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/100 text-center sm:mt-1 sm:text-[10px]">
              {rating.reviews ? `(${rating.reviews} ${rating.reviewsSuffix ?? "reviews"})` : rating.scoreSuffix ?? copy.topRatedLabel}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

export function GuestReviewBadge({
  rating,
  reviews,
  text,
  className
}: {
  rating: string;
  reviews: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-lg bg-white px-3 h-10 shadow-sm ring-1 ring-black/5 justify-center", className)}>
      <Star className="size-4 text-amber-500 shrink-0" fill="currentColor" stroke="none" />
      <div className="flex items-baseline gap-1.5 whitespace-nowrap">
        <span className="text-base font-black text-slate-900 leading-none">{rating}</span>
        <span className="text-sm font-medium text-slate-600 leading-none">
          {text.replace(/'/g, "").split(' ')[0]} ({reviews})
        </span>
      </div>
    </div>
  );
}

export function GuestRatingsSection({
  copy,
  ratings,
}: GuestRatingsProps) {
  const visibleRatings = ratings.slice(0, 2);
  if (visibleRatings.length === 0) return null;

  return (
    <section className="pb-8 sm:pb-16 pt-8 sm:pt-12 relative">
      {/* Top gradient fade from dark testimonials section */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--brand-tertiary)]/5 to-transparent pointer-events-none" aria-hidden="true" />
      
      <div className="shell-container relative z-10">
        <Reveal>
          <div className="flex justify-center mb-10">
            <SectionLabel>{copy.label}</SectionLabel>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-around items-center gap-16 lg:gap-24">
            {visibleRatings.map((rating, index) => (
              <a
                key={rating.id}
                href={rating.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative flex flex-col gap-6 sm:items-center max-w-sm",
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse sm:text-right"
                )}
              >
                <div className={cn(
                  "relative flex size-24 shrink-0 items-center justify-center text-white shadow-2xl transition-transform duration-500 group-hover:scale-110",
                  index % 2 === 0 ? "rounded-full bg-blue-600" : "rounded-[var(--radius-3xl)] bg-amber-600 group-hover:rotate-6"
                )}>
                  <div className="text-center">
                    <p className="text-3xl font-black leading-none">{rating.rating}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">
                      {rating.badgeText ?? rating.scoreSuffix ?? copy.topRatedLabel}
                    </p>
                  </div>
                  <div className={cn(
                    "absolute size-8 rounded-full flex items-center justify-center shadow-lg",
                    index % 2 === 0 ? "-top-2 -right-2 bg-yellow-400 text-blue-900" : "-bottom-2 -left-2 bg-white text-amber-600"
                  )}>
                    {index % 2 === 0 ? <Star className="size-4" fill="currentColor" /> : <Award className="size-4" />}
                  </div>
                </div>

                <div className={cn("space-y-3 flex flex-col", index % 2 === 1 && "sm:items-end")}>
                  <ChannelIcon iconKey={rating.icon} className="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-2xl font-heading tracking-tight text-[var(--text-heading)]">
                    {rating.title}
                  </h3>
                  {rating.description ? (
                    <p className="text-[15px] leading-relaxed text-[var(--text-body-subtle)]">
                      {rating.description}
                    </p>
                  ) : rating.reviews ? (
                    <GuestReviewBadge
                      rating={rating.rating}
                      reviews={rating.reviews}
                      text={rating.title}
                    />
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
