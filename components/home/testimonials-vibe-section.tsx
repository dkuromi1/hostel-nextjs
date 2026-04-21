import { resolveIcon } from "@/lib/icon-registry";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SwipableRow } from "@/components/swipable-row";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import {
  extendReasons,
  siteCopyContent,
  testimonials,
} from "@/lib/site-data";

export function TestimonialsVibeSection() {
  return (
    <section className="py-8 sm:py-16 bg-[#f0f7ff]/60 dark:bg-transparent">
      <div className="shell-container flex flex-col gap-10 lg:flex-row lg:items-start relative">
        {/* Left Column: Testimonials */}
        <Reveal delay={0} className="lg:w-[40%] flex flex-col lg:sticky lg:top-32">
          <TestimonialCarousel testimonials={testimonials.slice(0, 5)} className="w-full" />
        </Reveal>

        {/* Right Column: Vibe Content */}
        <div className="flex-1 space-y-8 lg:max-w-[60%]">
          <Reveal delay={100}>
            <SectionHeading
              eyebrow={siteCopyContent.home.whyStayLonger.eyebrow}
              title={siteCopyContent.home.whyStayLonger.title}
              description={siteCopyContent.home.whyStayLonger.description}
            />
          </Reveal>

          <Reveal delay={300}>
            <SwipableRow
              itemCount={extendReasons.length}
              className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-4"
            >
              {extendReasons.map((reason, index) => {
                const Icon = resolveIcon(reason.icon);
                return (
                  <div key={reason.title} className="min-w-[82vw] snap-center sm:min-w-0 h-full">
                    <div className="group relative flex h-full flex-col justify-between overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] p-8 transition-all duration-300 hover:border-emerald-500/20 hover:shadow-md rounded-[28px]">
                      <div>
                        <div className="float-left mb-3 mr-4 flex size-12 items-center justify-center rounded-2xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 group-hover:bg-[var(--brand-primary)]/20">
                          <Icon className="size-5" strokeWidth={1.8} />
                        </div>
                        <h3 className="mb-2 heading-item text-[var(--text-heading)] pt-1">
                          {reason.title}
                        </h3>
                        <p className="text-card-body">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="w-12 flex-shrink-0 sm:hidden" aria-hidden="true" />
            </SwipableRow>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
