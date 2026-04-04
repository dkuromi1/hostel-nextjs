import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Mark only (no wordmark) — for compact UI like the site header. */
  iconOnly?: boolean;
};

export function BookingComLogo({ className, iconOnly }: LogoProps) {
  const mark = (
    <div
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-[22%] bg-[#003580] shadow-sm",
        iconOnly && className
      )}
    >
      <span className="translate-x-[-1px] font-sans text-lg font-black text-white">
        B
      </span>
      <span className="absolute bottom-[24%] right-[24%] size-1 rounded-full bg-[#00AEEF]" />
    </div>
  );

  if (iconOnly) {
    return mark;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {mark}
      <span className="text-sm font-semibold tracking-[-0.03em] text-[#003b95]">
        Booking.com
      </span>
    </div>
  );
}

export function HostelworldLogo({ className, iconOnly }: LogoProps) {
  const mark = (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-[22%] bg-[#F25621] shadow-sm",
        iconOnly && className
      )}
    >
      <span className="translate-y-px font-sans text-xl font-black text-white">H</span>
    </div>
  );

  if (iconOnly) {
    return mark;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {mark}
      <span className="text-sm font-semibold tracking-[-0.03em] text-[#f25621]">
        Hostelworld
      </span>
    </div>
  );
}

