"use client";
import { resolveIcon } from "@/lib/icon-registry";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SwipableRow } from "@/components/swipable-row";
import { TestimonialCarousel, type Testimonial } from "@/components/testimonial-carousel";
import { useIsMobile } from "@/lib/use-is-mobile";
import type { ExtendReason } from "@/lib/site-data";

export interface TestimonialsVibeSectionProps {
  testimonials: Testimonial[];
  extendReasons: ExtendReason[];
  copy: {
    eyebrow: string;
    title: string;
    description: string;
  };
}

export function TestimonialsVibeSection({ testimonials, extendReasons, copy }: TestimonialsVibeSectionProps) {
  const isMobile = useIsMobile();

  const reasonsContent = (
    <SwipableRow
      itemCount={extendReasons.length}
      className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-[var(--layout-grid-gutter)]"
    >
      {extendReasons.map((reason, index) => {
        const Icon = resolveIcon(reason.icon);
        const ordinal = String(index + 1).padStart(2, "0");

        const cardContent = (
          <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.15] hover:shadow-2xl hover:shadow-black/30">

            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Watermark icon */}
            <div className="absolute -right-4 -top-4 text-white/[0.04] transition-all duration-700 group-hover:text-white/[0.07] group-hover:scale-110 group-hover:-rotate-6" aria-hidden="true">
              <Icon className="size-32" />
            </div>

            {/* Ordinal */}
            <span className="mb-4 block font-mono text-xs font-bold tracking-[0.2em] text-[var(--brand-primary)]/60">
              {ordinal}
            </span>

            {/* Icon chip */}
            <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[var(--brand-primary)]/15 text-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]/20 transition-all duration-300 group-hover:bg-[var(--brand-primary)]/25 group-hover:ring-[var(--brand-primary)]/40">
              <Icon className="size-5" />
            </div>

            {/* Text */}
            <h3 className="mb-2 font-heading text-lg font-semibold leading-snug tracking-tight text-white">
              {reason.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/55">
              {reason.description}
            </p>
          </div>
        );

        if (isMobile) {
          return (
            <div key={reason.title} className="min-w-[82vw] snap-center sm:min-w-0 h-full">
              {cardContent}
            </div>
          );
        }

        return (
          <Reveal
            key={reason.title}
            delay={100 + index * 120}
            className="min-w-[82vw] snap-center sm:min-w-0 h-full"
          >
            {cardContent}
          </Reveal>
        );
      })}
      <div className="w-12 flex-shrink-0 sm:hidden" aria-hidden="true" />
    </SwipableRow>
  );

  return (
    <section className="section-slate py-[var(--layout-section-spacing)] relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(110,231,183,0.05),transparent_40%)]" />
      </div>
      
      <div className="shell-container flex flex-col gap-10 lg:flex-row lg:items-start relative z-10">
        {/* Left Column: Testimonials */}
        <Reveal delay={0} className="lg:w-[40%] flex flex-col lg:sticky lg:top-32">
          <TestimonialCarousel testimonials={testimonials.slice(0, 5)} className="w-full" variant="dark" />
        </Reveal>

        {/* Right Column: Vibe Content */}
        <div className="flex-1 space-y-8 lg:max-w-[60%] lg:sticky lg:top-32">
          <Reveal delay={100}>
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.title}
              description={copy.description}
              variant="light"
            />
          </Reveal>

          {isMobile ? (
            <Reveal delay={300}>{reasonsContent}</Reveal>
          ) : (
            reasonsContent
          )}
        </div>
      </div>
    </section>
  );
}
