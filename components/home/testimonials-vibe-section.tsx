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
      className="-mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-[var(--layout-grid-gutter)]"
    >
      {extendReasons.map((reason, index) => {
        const Icon = resolveIcon(reason.icon);
        const cardContent = (
          <div className="group relative h-full overflow-hidden rounded-2xl glass-card-metallic p-6 backdrop-blur-sm shadow-xl">

            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Watermark icon */}
            <div className="absolute -right-4 -top-4 text-white/[0.04] transition-all duration-700 group-hover:text-white/[0.07] group-hover:scale-110 group-hover:-rotate-6" aria-hidden="true">
              <Icon className="size-32" />
            </div>

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
    </SwipableRow>
  );

  return (
    <section className="section-slate py-[var(--layout-section-spacing)] relative overflow-hidden">
      {/* Mountain illustration background */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 560"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 w-full h-full"
        >
          {/* Sky gradient */}
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f1a2e" stopOpacity="1" />
              <stop offset="100%" stopColor="#1a2a45" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="glow1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor="#4ade80" stopOpacity="0.06" />
              <stop offset="60%" stopColor="#4ade80" stopOpacity="0.06" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="mountain1Grad" x1="0.3" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#162d4b" />
              <stop offset="100%" stopColor="#0f1e35" />
            </linearGradient>
            <linearGradient id="mountain2Grad" x1="0.3" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#112640" />
              <stop offset="100%" stopColor="#0c1929" />
            </linearGradient>
            <linearGradient id="mountain3Grad" x1="0.3" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#0b1c31" />
              <stop offset="100%" stopColor="#081420" />
            </linearGradient>
            <linearGradient id="mountain4Grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#07182a" />
              <stop offset="100%" stopColor="#060e1a" />
            </linearGradient>
            <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4eaff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#a0c8f0" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="moonGlow" cx="75%" cy="18%" r="20%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="horizonGlow" cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.06" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Sky base */}
          <rect width="1440" height="560" fill="url(#skyGrad)" />

          {/* Soft atmospheric glows */}
          <rect width="1440" height="560" fill="url(#moonGlow)" />
          <rect width="1440" height="560" fill="url(#horizonGlow)" />
          <rect width="1440" height="120" y="220" fill="url(#glow1)" />

          {/* Stars (subtle dots) */}
          {[
            [80, 45], [140, 28], [210, 60], [290, 18], [370, 50],
            [450, 32], [530, 65], [620, 22], [700, 48], [780, 30],
            [860, 58], [940, 25], [1020, 42], [1110, 15], [1200, 55],
            [1280, 35], [1360, 20], [160, 75], [330, 85], [500, 90],
            [670, 70], [840, 88], [1010, 78], [1180, 68], [1340, 82],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={i % 3 === 0 ? 1.2 : 0.7}
              fill="white"
              opacity={i % 4 === 0 ? 0.6 : 0.3}
            />
          ))}

          {/* ── Layer 5 — Distant far-back range (very muted) ── */}
          <path
            d="M0,380 L80,310 L160,340 L240,290 L320,330 L400,280 L480,315 L560,275 L640,300 L720,265 L800,295 L880,270 L960,305 L1040,260 L1120,290 L1200,275 L1280,310 L1360,285 L1440,300 L1440,560 L0,560 Z"
            fill="url(#mountain4Grad)"
            opacity="0.5"
          />

          {/* ── Layer 4 — Mid-far peaks ── */}
          <path
            d="M0,400 L60,340 L130,370 L200,320 L290,355 L370,300 L440,338 L520,290 L600,325 L680,280 L760,318 L840,285 L920,322 L1000,278 L1080,310 L1160,295 L1240,330 L1320,298 L1400,318 L1440,310 L1440,560 L0,560 Z"
            fill="url(#mountain3Grad)"
            opacity="0.7"
          />

          {/* Snow caps layer 4 */}
          <path
            d="M370,300 L395,315 L420,305 L440,338"
            fill="url(#snowGrad)"
            opacity="0.25"
          />
          <path
            d="M680,280 L705,295 L730,288 L760,318"
            fill="url(#snowGrad)"
            opacity="0.25"
          />

          {/* ── Layer 3 — Mid-ground range ── */}
          <path
            d="M-40,430 L40,360 L100,395 L170,345 L250,380 L330,325 L420,362 L510,308 L590,348 L670,295 L750,338 L830,302 L910,345 L990,295 L1080,335 L1160,308 L1240,348 L1320,318 L1400,345 L1480,325 L1480,560 L-40,560 Z"
            fill="url(#mountain2Grad)"
            opacity="0.85"
          />

          {/* Snow caps layer 3 */}
          <path
            d="M510,308 L535,325 L560,316 L590,348"
            fill="url(#snowGrad)"
            opacity="0.35"
          />
          <path
            d="M990,295 L1015,313 L1040,305 L1080,335"
            fill="url(#snowGrad)"
            opacity="0.35"
          />
          <path
            d="M670,295 L695,312 L718,304 L750,338"
            fill="url(#snowGrad)"
            opacity="0.3"
          />

          {/* ── Foreground — single continuous range, full width ── */}
          <path
            d="M-60,480 L20,400 L80,430 L150,370 L230,410 L310,355 L400,395 L490,340 L570,378 L650,348 L730,385 L810,342 L900,420 L980,365 L1060,408 L1140,352 L1220,392 L1300,355 L1380,388 L1500,335 L1500,560 L-60,560 Z"
            fill="url(#mountain1Grad)"
            opacity="0.95"
          />
          {/* Snow caps — foreground */}
          <path
            d="M310,355 L338,374 L364,363 L400,395"
            fill="url(#snowGrad)"
            opacity="0.45"
          />
          <path
            d="M490,340 L516,358 L540,349 L570,378"
            fill="url(#snowGrad)"
            opacity="0.4"
          />
          {/* Centre peak snow cap */}
          <path
            d="M810,342 L835,360 L858,351 L900,420"
            fill="url(#snowGrad)"
            opacity="0.42"
          />
          <path
            d="M1140,352 L1165,370 L1190,361 L1220,392"
            fill="url(#snowGrad)"
            opacity="0.45"
          />
          <path
            d="M1300,355 L1325,372 L1350,363 L1380,388"
            fill="url(#snowGrad)"
            opacity="0.4"
          />



          {/* Bottom fade — blends mountains into the section floor */}
          <defs>
            <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#060e1a" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <rect x="0" y="380" width="1440" height="180" fill="url(#bottomFade)" />
        </svg>
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
