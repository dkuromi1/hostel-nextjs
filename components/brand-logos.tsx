import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Mark only (no wordmark) — for compact UI like the site header. */
  iconOnly?: boolean;
  monochromeHover?: boolean;
};

export function BookingComLogo({ className, iconOnly, monochromeHover }: LogoProps) {
  const mark = (
    <div
      role="img"
      aria-label="Booking.com"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#003580] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)] transition-all duration-300",
        monochromeHover && "saturate-75 opacity-80 group-hover:saturate-100 group-hover:opacity-100",
        iconOnly && className
      )}
    >
      <span className="translate-x-[-2px] font-sans text-2xl font-extrabold text-white">
        B
      </span>
      <span className="absolute bottom-[24%] right-[17%] size-1 rounded-full bg-[#00AEEF]" />
    </div>

  );

  if (iconOnly) {
    return mark;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {mark}
      <span className={cn(
        "text-sm font-semibold tracking-[-0.03em] text-[#003b95] transition-all duration-300",
        monochromeHover && "saturate-75 opacity-80 group-hover:saturate-100 group-hover:opacity-100"
      )}>
        Booking.com
      </span>
    </div>
  );
}

export function HostelworldLogo({ className, iconOnly, monochromeHover }: LogoProps) {
  const mark = (
    <div
      role="img"
      aria-label="Hostelworld"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#F25621] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)] transition-all duration-300",
        monochromeHover && "saturate-75 opacity-80 group-hover:saturate-100 group-hover:opacity-100",
        iconOnly && className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="size-full text-white"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M 16 16 L 38 16 L 38 32 L 34 32 L 50 50 L 34 68 L 38 68 L 38 84 L 16 84 Z M 84 16 L 62 16 L 62 32 L 66 32 L 50 50 L 66 68 L 62 68 L 62 84 L 84 84 Z" />
      </svg>
    </div>

  );

  if (iconOnly) {
    return mark;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {mark}
      <span className={cn(
        "text-sm font-semibold tracking-[-0.03em] text-[#f25621] transition-all duration-300",
        monochromeHover && "saturate-75 opacity-80 group-hover:saturate-100 group-hover:opacity-100"
      )}>
        Hostelworld
      </span>
    </div>
  );
}

