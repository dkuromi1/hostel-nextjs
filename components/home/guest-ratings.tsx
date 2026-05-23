import Image from "next/image";
import { cn } from "@/lib/utils";
import { Star, Award } from "@/lib/icon-registry";
import { BookingComLogo, HostelworldLogo } from "@/components/brand-logos";
import { Reveal } from "@/components/reveal";
import { Panel } from "@/components/ui/panel";
import { SectionLabel } from "@/components/ui/section-label";
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
  bookingUrl: string;
  hostelworldUrl: string;
  bookingRating: string;
  hostelworldRating: string;
  hostelworldReviews: string;
}

export function CompactGuestRatingsStrip({
  copy,
  bookingUrl,
  hostelworldUrl,
  bookingRating,
  hostelworldRating,
  hostelworldReviews,
}: GuestRatingsProps) {
  return (
    <div className="grid w-full gap-[var(--layout-grid-gutter)] sm:grid-cols-2">
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-w-0 items-center justify-between gap-2 rounded-xl border border-white/16 bg-black/40 px-3 py-2.5 text-white shadow-[0_18px_45px_-30px_rgba(0,0,0,0.5)] backdrop-blur-[5px] transition-all duration-300 hover:border-white/24 hover:bg-black/50 sm:gap-3 sm:rounded-[var(--radius-2xl)] sm:px-4 sm:py-3"
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <BookingComLogo iconOnly monochromeHover className="size-7 shrink-0 sm:size-9" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
              {copy.bookingSourceLabel}
            </p>
            <p className="truncate text-sm font-medium text-white/92">
              {copy.bookingAwardTitle}
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-lg bg-white/8 px-2 py-1.5 text-right ring-1 ring-white/12 shadow-sm sm:rounded-[var(--radius-xl)] sm:px-3 sm:py-2">
          <p className="font-sans text-lg font-bold leading-none tracking-tight text-white text-center sm:text-xl">
            {bookingRating}
          </p>
          <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/100 text-center sm:mt-1 sm:text-[10px]">
            {copy.bookingScoreSuffix}
          </p>
        </div>
      </a>

      <a
        href={hostelworldUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-w-0 items-center justify-between gap-2 rounded-xl border border-white/16 bg-black/40 px-3 py-2.5 text-white shadow-[0_18px_45px_-30px_rgba(0,0,0,0.5)] backdrop-blur-[5px] transition-all duration-300 hover:border-white/24 hover:bg-black/50 sm:gap-3 sm:rounded-[var(--radius-2xl)] sm:px-4 sm:py-3"
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <HostelworldLogo iconOnly monochromeHover className="size-7 shrink-0 sm:size-9" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
              {copy.hostelworldSourceLabel}
            </p>
            <p className="truncate text-sm font-medium text-white/92">
              {copy.hostelworldTitle}
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-lg bg-white/8 px-2 py-1.5 text-right ring-1 ring-white/12 shadow-sm sm:rounded-[var(--radius-xl)] sm:px-3 sm:py-2">
          <p className="font-sans text-lg font-bold leading-none tracking-tight text-white text-center sm:text-xl">
            {hostelworldRating}
          </p>
          <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/100 text-center sm:mt-1 sm:text-[10px]">
            ({hostelworldReviews} {copy.hostelworldReviewsSuffix})
          </p>
        </div>
      </a>
    </div>
  );
}

export function HostelworldRatingBadge({ 
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
  bookingUrl,
  hostelworldUrl,
  bookingRating,
  hostelworldRating,
  hostelworldReviews,
}: GuestRatingsProps) {
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
            {/* Booking.com Side */}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-6 sm:flex-row sm:items-center max-w-sm"
            >
              <div className="relative flex size-24 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition-transform duration-500 group-hover:scale-110">
                <div className="text-center">
                  <p className="text-3xl font-black leading-none">{bookingRating}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">{copy.bookingScoreSuffix}</p>
                </div>
                <div className="absolute -top-2 -right-2 size-8 rounded-full bg-yellow-400 flex items-center justify-center text-blue-900 shadow-lg">
                  <Star className="size-4" fill="currentColor" />
                </div>
              </div>
              
              <div className="space-y-3">
                <BookingComLogo className="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-heading tracking-tight text-[var(--text-heading)]">
                  {copy.bookingAwardTitle}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--text-body-subtle)]">
                  {copy.bookingDescription}
                </p>
              </div>
            </a>

            {/* Hostelworld Side */}
            <a
              href={hostelworldUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-6 sm:flex-row-reverse sm:items-center sm:text-right max-w-sm"
            >
              <div className="relative flex size-24 shrink-0 items-center justify-center rounded-[var(--radius-3xl)] bg-amber-600 text-white shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <div className="text-center">
                  <p className="text-3xl font-black leading-none">{hostelworldRating}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">Superb</p>
                </div>
                <div className="absolute -bottom-2 -left-2 size-8 rounded-full bg-white flex items-center justify-center text-amber-600 shadow-lg">
                  <Award className="size-4" />
                </div>
              </div>

              <div className="space-y-3 flex flex-col sm:items-end">
                <HostelworldLogo className="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-heading tracking-tight text-[var(--text-heading)]">
                  {copy.hostelworldTitle}
                </h3>
                <HostelworldRatingBadge 
                  rating={hostelworldRating} 
                  reviews={hostelworldReviews} 
                  text={copy.hostelworldTitle}
                />
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

