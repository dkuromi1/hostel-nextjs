import Image from "next/image";
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

export function GuestRatingsSection({
  copy,
  bookingUrl,
  hostelworldUrl,
  bookingRating,
  hostelworldRating,
  hostelworldReviews,
}: GuestRatingsProps) {
  return (
    <section className="pb-8 sm:pb-16">
      <div className="shell-container">
        <Reveal>
          <Panel className="p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="faded-line h-px flex-1" />
              <SectionLabel>{copy.label}</SectionLabel>
              <span className="faded-line h-px flex-1" />
            </div>
            <div className="mt-4 grid gap-[var(--layout-grid-gutter)] sm:grid-cols-2 sm:items-stretch">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-5 shadow-[0_20px_55px_-40px_var(--glass-shadow)] transition-all hover:scale-[1.01] hover:shadow-[0_20px_55px_-30px_var(--glass-shadow)]"
              >
                <div className="flex min-h-[3rem] flex-wrap items-center justify-between gap-x-2 gap-y-2">
                  <BookingComLogo className="min-w-0 shrink-0" />
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-400/15 px-2 py-1 text-yellow-600 dark:text-yellow-500">
                    <Star className="size-3" fill="currentColor" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {copy.topRatedLabel}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center py-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="shrink-0 rounded-full bg-blue-500/12 p-1.5 text-blue-700 dark:text-blue-400">
                        <Award className="size-5" />
                      </div>
                      <p className="truncate text-sm font-medium leading-6 text-[var(--text-heading)] transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-400">
                        {copy.bookingAwardTitle}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-[var(--radius-sm)] bg-blue-700 px-3 py-1 text-center font-semibold text-white shadow-sm">
                      <p className="font-sans text-xl leading-none tracking-tight font-bold">
                        {bookingRating}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-blue-50">
                        {copy.bookingScoreSuffix}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-auto pt-2 text-sm leading-6 text-[var(--text-body-subtle)]">
                  {copy.bookingDescription}
                </p>
              </a>

              <a
                href={hostelworldUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-5 shadow-[0_20px_55px_-40px_var(--glass-shadow)] transition-all hover:scale-[1.01] hover:shadow-[0_20px_55px_-30px_var(--glass-shadow)]"
              >
                <div className="flex min-h-[3rem] flex-wrap items-center justify-between gap-x-2 gap-y-2">
                  <HostelworldLogo className="h-7 w-auto shrink-0" />
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-400/15 px-2 py-1 text-yellow-600 dark:text-yellow-500">
                    <Star className="size-3" fill="currentColor" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {copy.topRatedLabel}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center py-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="shrink-0 rounded-full bg-amber-500/12 p-1.5 text-amber-700 dark:text-amber-500">
                        <Star className="size-5" />
                      </div>
                      <p className="truncate text-sm font-medium leading-6 text-[var(--text-heading)] transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-500">
                        {copy.hostelworldTitle}
                      </p>
                    </div>
                    <div className="relative h-12 w-28 shrink-0 overflow-hidden rounded-[var(--radius-md)] shadow-sm">
                      <Image
                        src="/images/hostelworld_reviews.png"
                        alt={copy.hostelworldImageAlt}
                        fill
                        className="object-contain object-right"
                        sizes="120px"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-auto pt-2 text-sm leading-6 text-[var(--text-body-subtle)]" />
              </a>
            </div>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}

