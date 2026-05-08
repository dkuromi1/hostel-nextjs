"use client";
import { resolveIcon } from "@/lib/icon-registry";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Panel } from "@/components/ui/panel";
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
        const cardContent = (
          <Panel className="group relative flex h-full flex-col justify-between p-card-premium transition-all duration-300 bg-white !rounded-[var(--radius-lg)] border border-[var(--border)] hover:border-[#059669]/20 hover:shadow-xl hover:shadow-[#059669]/5 dark:bg-card">
            <div>
              <div className="float-left mb-3 mr-4 flex size-12 items-center justify-center rounded-[var(--radius-lg)] bg-[#059669]/10 text-[#059669] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 group-hover:bg-[#059669] group-hover:text-white">
                <Icon className="size-5" />
              </div>
              <h3 className="heading-item mb-1.5 text-gray-900 dark:text-white">
                {reason.title}
              </h3>
              <p className="text-card-body text-gray-600 dark:text-white/75">
                {reason.description}
              </p>
            </div>
          </Panel>
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
