import Image from "next/image";
import { Star, Award } from "lucide-react";
import { BookingComLogo, HostelworldLogo } from "@/components/brand-logos";
import { Reveal } from "@/components/reveal";
import { siteConfig, siteCopyContent } from "@/lib/site-data";

export function CompactGuestRatingsStrip() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-2">
      <a
        href={siteConfig.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-3 rounded-[22px] border border-white/16 bg-slate-950/42 px-4 py-3 text-white shadow-[0_18px_45px_-30px_rgba(2,6,23,0.7)] backdrop-blur-[5px] transition-all duration-300 hover:border-white/24 hover:bg-slate-950/52"
      >
        <div className="flex min-w-0 items-center gap-3">
          <BookingComLogo iconOnly className="size-9" />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
              {siteCopyContent.home.guestRatings.bookingSourceLabel}
            </p>
            <p className="truncate text-sm font-medium text-white/92">
              {siteCopyContent.home.guestRatings.bookingAwardTitle}
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-2xl bg-white/8 px-3 py-2 text-right ring-1 ring-white/12 shadow-sm">
          <p className="font-heading text-xl leading-none tracking-tight text-white text-center">
            {siteConfig.bookingRating}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/100">
            {siteCopyContent.home.guestRatings.bookingScoreSuffix}
          </p>
        </div>
      </a>

      <a
        href={siteConfig.hostelworldUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-3 rounded-[22px] border border-white/16 bg-slate-950/42 px-4 py-3 text-white shadow-[0_18px_45px_-30px_rgba(2,6,23,0.7)] backdrop-blur-[5px] transition-all duration-300 hover:border-white/24 hover:bg-slate-950/52"
      >
        <div className="flex min-w-0 items-center gap-3">
          <HostelworldLogo iconOnly className="size-9" />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
              {siteCopyContent.home.guestRatings.hostelworldSourceLabel}
            </p>
            <p className="truncate text-sm font-medium text-white/92">
              {siteCopyContent.home.guestRatings.hostelworldTitle}
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-2xl bg-white/8 px-3 py-2 text-right ring-1 ring-white/12 shadow-sm">
          <p className="font-heading text-xl leading-none tracking-tight text-white text-center">
            {siteConfig.hostelworldRating}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/100">
            ({siteConfig.hostelworldReviews} {siteCopyContent.home.guestRatings.hostelworldReviewsSuffix})
          </p>
        </div>
      </a>
    </div>
  );
}

export function GuestRatingsSection() {
  return (
    <section className="pb-8 sm:pb-16">
      <div className="shell-container">
        <Reveal>
          <div className="glass-panel rounded-[28px] p-4 sm:p-5">
            <div className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              <span className="faded-line h-px flex-1" />
              {siteCopyContent.home.guestRatings.label}
              <span className="faded-line h-px flex-1" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:items-stretch">
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-5 shadow-[0_20px_55px_-40px_var(--glass-shadow)] transition-all hover:scale-[1.01] hover:shadow-[0_20px_55px_-30px_var(--glass-shadow)]"
              >
                <div className="flex min-h-[3rem] flex-wrap items-center justify-between gap-x-2 gap-y-2">
                  <BookingComLogo className="min-w-0 shrink-0" />
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-400/15 px-2 py-1 text-yellow-600 dark:text-yellow-500">
                    <Star className="size-3" fill="currentColor" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {siteCopyContent.home.guestRatings.topRatedLabel}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center py-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="shrink-0 rounded-full bg-blue-500/12 p-1.5 text-blue-700 dark:text-blue-400">
                        <Award className="size-5" strokeWidth={1.8} />
                      </div>
                      <p className="text-sm font-medium leading-6 text-[var(--text-heading)] transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-400">
                        {siteCopyContent.home.guestRatings.bookingAwardTitle}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-tr-sm rounded-tl-sm rounded-br-sm rounded-bl-none bg-blue-700 px-3 py-1 text-center font-semibold text-white shadow-sm">
                      <p className="font-heading text-xl leading-none tracking-tight">
                        {siteConfig.bookingRating}
                      </p>
                      <p className="text-[8px] uppercase tracking-wider text-blue-50">
                        {siteCopyContent.home.guestRatings.bookingScoreSuffix}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-auto pt-2 text-sm leading-6 text-[var(--text-body-subtle)]">
                  {siteCopyContent.home.guestRatings.bookingDescription}
                </p>
              </a>

              <a
                href={siteConfig.hostelworldUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-5 shadow-[0_20px_55px_-40px_var(--glass-shadow)] transition-all hover:scale-[1.01] hover:shadow-[0_20px_55px_-30px_var(--glass-shadow)]"
              >
                <div className="flex min-h-[3rem] flex-wrap items-center justify-between gap-x-2 gap-y-2">
                  <HostelworldLogo className="h-7 w-auto shrink-0" />
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-400/15 px-2 py-1 text-yellow-600 dark:text-yellow-500">
                    <Star className="size-3" fill="currentColor" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {siteCopyContent.home.guestRatings.topRatedLabel}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center py-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="shrink-0 rounded-full bg-amber-500/12 p-1.5 text-amber-700 dark:text-amber-500">
                        <Star className="size-5" strokeWidth={1.8} />
                      </div>
                      <p className="text-sm font-medium leading-6 text-[var(--text-heading)] transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-500">
                        {siteCopyContent.home.guestRatings.hostelworldTitle}
                      </p>
                    </div>
                    <div className="relative h-15 w-25 shrink-0 overflow-hidden rounded-md shadow-sm">
                      <Image
                        src="/images/hostelworld_reviews.png"
                        alt={siteCopyContent.home.guestRatings.hostelworldImageAlt}
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-auto pt-2 text-sm leading-6 text-[var(--text-body-subtle)]" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
