import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Mark only (no wordmark) — for compact UI like the site header. */
  iconOnly?: boolean;
  monochromeHover?: boolean;
  size?: "sm" | "md";
};

export function BookingComLogo({ className, iconOnly, monochromeHover, size = "md" }: LogoProps) {
  const isSm = size === "sm";
  
  const mark = (
    <div
      role="img"
      aria-label="Booking.com"
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#003580] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)] transition-all duration-300",
        isSm ? "size-4 rounded-[4px]" : "size-8",
        monochromeHover && "saturate-75 opacity-80 group-hover:saturate-100 group-hover:opacity-100",
        iconOnly && className
      )}
    >
      <span className={cn(
        "font-sans font-extrabold text-white leading-none",
        isSm ? "text-[10px] translate-x-[-0.5px]" : "text-2xl translate-x-[-2px]"
      )}>
        B
      </span>
      <span className={cn(
        "absolute rounded-full bg-[#00AEEF]",
        isSm ? "bottom-[20%] right-[15%] size-1" : "bottom-[24%] right-[17%] size-1"
      )} />
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

export function HostelworldLogo({ className, iconOnly, monochromeHover, size = "md" }: LogoProps) {
  const isSm = size === "sm";

  const mark = (
    <div
      role="img"
      aria-label="Hostelworld"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#F25621] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)] transition-all duration-300",
        isSm ? "size-4 rounded-[4px]" : "size-8",
        monochromeHover && "saturate-75 opacity-80 group-hover:saturate-100 group-hover:opacity-100",
        iconOnly && className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className={cn("text-white", isSm ? "size-[70%]" : "size-full")}
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

