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
          <Panel className="group relative flex h-full flex-col justify-between p-8 transition-all duration-300 hover:border-[var(--brand-primary)]/20 hover:shadow-md">
            <div>
              <div className="float-left mb-3 mr-4 flex size-12 items-center justify-center rounded-[var(--radius-2xl)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 group-hover:bg-[var(--brand-primary)]/20">
                <Icon className="size-5" />
              </div>
              <h3 className="heading-item mb-1.5 text-[var(--text-heading)]">
                {reason.title}
              </h3>
              <p className="text-card-body">
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
    <section className="py-[var(--layout-section-spacing)]">
      <div className="shell-container flex flex-col gap-10 lg:flex-row lg:items-start relative">
        {/* Left Column: Testimonials */}
        <Reveal delay={0} className="lg:w-[40%] flex flex-col lg:sticky lg:top-32">
          <TestimonialCarousel testimonials={testimonials.slice(0, 5)} className="w-full" />
        </Reveal>

        {/* Right Column: Vibe Content */}
        <div className="flex-1 space-y-8 lg:max-w-[60%] lg:sticky lg:top-32">
          <Reveal delay={100}>
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.title}
              description={copy.description}
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
