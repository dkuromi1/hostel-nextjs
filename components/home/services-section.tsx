import { resolveIcon } from "@/lib/icon-registry";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SwipableRow } from "@/components/swipable-row";
import { freeServices, siteCopyContent } from "@/lib/site-data";

export function IncludedServicesSection() {
  return (
    <section className="py-8 sm:py-16">
      <div className="shell-container space-y-12">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={siteCopyContent.home.includedStay.eyebrow}
              title={siteCopyContent.home.includedStay.title}
              description={siteCopyContent.home.includedStay.description}
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <SwipableRow
            itemCount={freeServices.length}
            className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {freeServices.map((service, idx) => {
              const Icon = resolveIcon(service.icon);
              return (
                <div
                  key={idx}
                  className="min-w-[85%] snap-center sm:min-w-0 h-full"
                >
                  <div
                    className="group flex h-full gap-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 transition-all duration-300 hover:border-[var(--brand-primary)]/20 hover:shadow-md"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--muted)] text-[var(--text-body)] shadow-sm ring-1 ring-[var(--foreground)]/5 transition-all duration-300 group-hover:bg-[var(--brand-primary-light)] group-hover:text-[var(--brand-primary)] group-hover:ring-[var(--brand-primary)]/20">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1.5 pt-0.5">
                      <h3 className="text-[15px] font-bold tracking-tight text-[var(--text-heading)]">
                        {service.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[var(--text-body-subtle)] line-clamp-2 transition-colors group-hover:text-[var(--text-body)]">
                        {service.description}
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
    </section>
  );
}
