import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { DirectBookingCard } from "@/components/direct-booking-card";
import { LazyVideo } from "@/components/lazy-video";

export interface AtmosphereSectionProps {
  atmosphere: {
    rooftopImage?: string;
    rooftopImageAlt: string;
    rooftopEyebrow: string;
    rooftopTitle: string;
    badgeEyebrow?: string;
    badgeTitleLine1?: string;
    badgeTitleLine2?: string;
    roomImage?: string;
    roomImageAlt: string;
    roomLabel?: string;
    roomTitle?: string;
    videoSrc?: string;
    videoPoster?: string;
    videoLabel?: string;
    videoTitle?: string;
    directBookingLabel: string;
    directBookingTitle: string;
    directBookingDescription: string;
    directBookingButton: string;
  };
  whatsappUrl?: string;
}

export function AtmosphereSection({ atmosphere, whatsappUrl }: AtmosphereSectionProps) {
  const rooftopImage = atmosphere.rooftopImage ?? "/images/rooftop_social.webp";
  const badgeEyebrow = atmosphere.badgeEyebrow ?? "Undisputed";
  const badgeTitleLine1 = atmosphere.badgeTitleLine1 ?? "Best View";
  const badgeTitleLine2 = atmosphere.badgeTitleLine2 ?? "in Town";
  const roomImage = atmosphere.roomImage ?? "/images/rooms_1.webp";
  const roomLabel = atmosphere.roomLabel ?? "Signature Sleep";
  const roomTitle = atmosphere.roomTitle ?? "Boutique dorms";
  const videoSrc = atmosphere.videoSrc ?? "/videos/videoplayback.mp4";
  const videoPoster = atmosphere.videoPoster ?? "/images/video-poster.webp";
  const videoLabel = atmosphere.videoLabel ?? "Inside Look";
  const videoTitle = atmosphere.videoTitle ?? "Step inside the hostel";

  return (
    <section className="relative z-10 mt-[30px] md:mt-[30px] lg:mt-[11px] pt-8 pb-[var(--layout-section-spacing)] lg:pt-12">
      <div className="shell-container max-w-5xl">
        <div className="flex flex-col gap-[var(--layout-grid-gutter)] lg:grid lg:grid-cols-[1.9fr_1.1fr] lg:grid-rows-[1fr_auto] lg:gap-[var(--layout-grid-gutter)]">

          {/* DESKTOP ONLY: Direct Booking card — Bottom-left */}
          <Reveal delay={100} className="hidden lg:flex lg:row-start-2 h-full">
            <DirectBookingCard variant="inline" className="h-full w-full" whatsappUrl={whatsappUrl} content={atmosphere} />
          </Reveal>

          {/* Rooftop image — Top-left */}
          <Reveal className="lg:row-start-1 relative group h-full">
            <div className="relative h-full">
              <div className="media-frame !border-0 ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_-42px_rgba(0,0,0,0.5)] relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-auto lg:min-h-[26rem] h-full overflow-hidden">
                <Image
                  src={rooftopImage}
                  alt={atmosphere.rooftopImageAlt}
                  fill
                  className="object-cover"
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 66vw, 924px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white z-10">
                  <SectionLabel colorScheme="light" className="text-[10px]">
                    {atmosphere.rooftopEyebrow}
                  </SectionLabel>
                  <p className="mt-1 max-w-sm font-heading text-lg md:text-xl lg:text-2xl leading-tight tracking-tight">
                    {atmosphere.rooftopTitle}
                  </p>
                </div>
              </div>

              {/* Floating Sticker/Badge */}
              <div className="absolute -top-6 -right-[14px] lg:-top-10 lg:-right-6 z-30 -rotate-12 group-hover:rotate-0 transition-all duration-700 ease-out scale-100 group-hover:scale-110">
                <div className="relative size-[134px] lg:size-[170px] rounded-full flex items-center justify-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] group/badge">
                  {/* Layered Backgrounds */}
                  <div className="absolute inset-0 rounded-full bg-slate-950/90 backdrop-blur-md border border-white/10" />
                  <div className="absolute inset-1 rounded-full border border-amber-400/20" />

                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-[9.8px] lg:text-[11.2px] font-bold uppercase tracking-[0.25em] text-amber-200/60 mb-1.5">{badgeEyebrow}</span>

                    <div className="flex flex-col items-center -space-y-1.5 lg:-space-y-3">
                      <span className="font-cormorant text-[28px] lg:text-[42px] italic font-medium text-white leading-none">{badgeTitleLine1}</span>
                      <span className="font-cormorant text-[28px] lg:text-[42px] italic font-medium text-white leading-none">{badgeTitleLine2}</span>
                    </div>

                    {/* Decorative element */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-[0.5px] w-6 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                      <div className="size-1.5 rounded-full bg-amber-400/60 shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
                      <div className="h-[0.5px] w-6 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                    </div>
                  </div>

                  {/* Shine Effect on hover */}
                  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right column */}
          <div className="flex flex-col gap-[var(--layout-grid-gutter)] lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div className="grid grid-cols-2 gap-[var(--layout-grid-gutter)] sm:grid-cols-[1.1fr_1fr] lg:grid-cols-1 lg:h-full">

              {/* Room image */}
              <Reveal delay={60} className="flex min-w-0 relative z-20 w-full h-full">
                <div className="media-frame !border-0 ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_-42px_rgba(0,0,0,0.5)] relative w-full h-full aspect-[9/16] sm:aspect-[4/3] overflow-hidden">
                  <Image
                    src={roomImage}
                    alt={atmosphere.roomImageAlt}
                    fill
                    className="object-cover object-[75%_center]"
                    loading="eager"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 60vw, (max-width: 1400px) 33vw, 466px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white z-10">
                    <SectionLabel colorScheme="light" className="text-[10px]">
                      {roomLabel}
                    </SectionLabel>
                    <p className="mt-1 font-heading text-base sm:text-lg font-medium text-white leading-tight">
                      {roomTitle}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Video */}
              <Reveal delay={120} className="flex min-w-0 relative w-full h-full sm:row-span-2 lg:row-span-1">
                <div className="media-frame !border-0 ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_-42px_rgba(0,0,0,0.5)] relative w-full h-full overflow-hidden aspect-[9/16] sm:aspect-auto">
                  <LazyVideo
                    src={videoSrc}
                    poster={videoPoster}
                    className="w-full h-full"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white z-20">
                    <SectionLabel colorScheme="light" className="text-[10px]">
                      {videoLabel}
                    </SectionLabel>
                    <p className="mt-1 font-heading text-base sm:text-lg font-medium text-white leading-tight">
                      {videoTitle}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Tablet-only booking card (hidden on mobile <640px and desktop >=1024px) */}
              <Reveal delay={80} className="hidden sm:block sm:col-span-1 lg:hidden h-full">
                <DirectBookingCard variant="block" className="h-full" whatsappUrl={whatsappUrl} content={atmosphere} />
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
