import Image from "next/image";

import { BookingActions } from "@/components/booking-actions";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

type CtaStripProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  imageClassName?: string;
  bookingChannels?: any[];
  contactChannels?: any[];
};

export function CtaStrip({
  eyebrow,
  title,
  description,
  image,
  alt,
  imageClassName,
  bookingChannels = [],
  contactChannels = [],
}: CtaStripProps) {
  return (
    <Panel className="overflow-hidden bg-[var(--brand-tertiary-dark)] text-white">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6 p-card-premium">
          <Eyebrow variant="footer">{eyebrow}</Eyebrow>
          <div className="space-y-3">
            <h2 className="heading-section text-white md:text-5xl">
              {title}
            </h2>
            <p className="max-w-[58ch] text-section-desc text-[var(--text-on-dark)]/90">
              {description}
            </p>
          </div>
          <BookingActions className="max-w-3xl" bookingChannels={bookingChannels} contactChannels={contactChannels} forceLight={true} />
        </div>
        <div className="relative min-h-72">
          <Image
            src={image}
            alt={alt}
            fill
            className={cn("object-cover editorial-image", imageClassName)}
            sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 50vw, 700px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.1),rgba(2,6,23,0.45))]" />
        </div>
      </div>
    </Panel>
  );
}
