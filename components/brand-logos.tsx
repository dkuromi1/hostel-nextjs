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
        "flex shrink-0 items-center justify-center rounded-[25%] bg-[#003580] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)] transition-all duration-300",
        isSm ? "size-4" : "size-8",
        monochromeHover && "saturate-75 opacity-80 group-hover:saturate-100 group-hover:opacity-100",
        iconOnly && className
      )}
    >
      <svg
        viewBox="7.2 6.2 12.5 12.5"
        className="size-[70%] select-none"
        aria-hidden="true"
      >
        <path
          fill="white"
          d="M8.575 6.563h2.658c2.108 0 3.473 1.15 3.473 2.898 0 1.15-.575 1.82-.91 2.108l-.287.263.335.192c.815.479 1.318 1.389 1.318 2.395 0 1.988-1.51 3.257-3.857 3.257H7.449V7.713c0-.623.503-1.126 1.126-1.15zm1.7 1.868c-.479.024-.694.264-.694.79v1.893h1.676c.958 0 1.294-.743 1.294-1.365 0-.815-.503-1.318-1.318-1.318zm-.096 4.36c-.407.071-.598.31-.598.79v2.251h1.868c.934 0 1.509-.55 1.509-1.533 0-.934-.599-1.509-1.51-1.509z"
        />
        <circle cx="17.92" cy="16.53" r="1.34" fill="#00AEEF" />
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

export function GoogleLogo({ className, iconOnly, monochromeHover, size = "md" }: LogoProps) {
  const isSm = size === "sm";

  const mark = (
    <div
      role="img"
      aria-label="Google"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)] transition-all duration-300",
        isSm ? "size-4 rounded-[4px]" : "size-8",
        monochromeHover && "saturate-75 opacity-80 group-hover:saturate-100 group-hover:opacity-100",
        iconOnly && className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn(isSm ? "size-[70%]" : "size-[60%]")}
        aria-hidden="true"
      >
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
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
        "text-sm font-semibold tracking-[-0.03em] text-[#4285F4] transition-all duration-300",
        monochromeHover && "saturate-75 opacity-80 group-hover:saturate-100 group-hover:opacity-100"
      )}>
        Google
      </span>
    </div>
  );
}

