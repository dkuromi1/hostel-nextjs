import Image from "next/image";

import { BookingActions } from "@/components/booking-actions";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

type CtaStripProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  imageClassName?: string;
};

export function CtaStrip({
  eyebrow,
  title,
  description,
  image,
  alt,
  imageClassName,
}: CtaStripProps) {
  return (
    <Panel className="overflow-hidden bg-slate-950 text-white">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <Badge variant="sun">{eyebrow}</Badge>
          <div className="space-y-3">
            <h2 className="font-heading text-4xl leading-none tracking-[-0.06em] text-white md:text-5xl">
              {title}
            </h2>
            <p className="max-w-[58ch] text-base leading-8 text-slate-300 md:text-lg">
              {description}
            </p>
          </div>
          <BookingActions className="max-w-3xl" />
        </div>
        <div className="relative min-h-72">
          <Image
            src={image}
            alt={alt}
            fill
            className={cn("object-cover", imageClassName)}
            sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 50vw, 700px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.1),rgba(2,6,23,0.45))]" />
        </div>
      </div>
    </Panel>
  );
}
