import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function BookingComLogo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex size-8 shrink-0 items-center justify-center rounded-[22%] bg-[#003580] shadow-sm">
        <span className="font-sans text-md font-black text-white translate-x-[-1px]">
          B
        </span>
        {/* The signature Booking.com dot */}
        <span className="absolute bottom-[24%] right-[24%] size-1 rounded-full bg-[#00AEEF]" />
      </div>
      <span className="text-sm font-semibold tracking-[-0.03em] text-[#003b95]">
        Booking.com
      </span>
    </div>
  );
}

export function HostelworldLogo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex size-8 shrink-0 items-center justify-center rounded-[22%] bg-[#F25621] shadow-sm">
        <span className="font-sans text-xl font-black text-white translate-y-[1px]">
          H
        </span>
      </div>
      <span className="text-sm font-semibold tracking-[-0.03em] text-[#f25621]">
        Hostelworld
      </span>
    </div>
  );
}

