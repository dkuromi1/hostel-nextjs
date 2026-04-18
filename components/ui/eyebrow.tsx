import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: string;
  className?: string;
  variant?: "default" | "sun";
};

export function Eyebrow({
  children,
  className,
  variant = "default",
}: EyebrowProps) {
  return (
    <div
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm backdrop-blur-md transition-all duration-500",
        variant === "default"
          ? "border-slate-200/50 bg-white/60 text-slate-800 hover:border-emerald-500/30 hover:bg-white hover:text-emerald-950 hover:shadow-lg hover:shadow-emerald-500/10"
          : "border-amber-200/30 bg-amber-500/10 text-amber-900 hover:border-amber-400/50 hover:bg-amber-500/20 hover:text-amber-950 hover:shadow-lg hover:shadow-amber-500/20",
        className
      )}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 duration-1000",
            variant === "default" ? "bg-emerald-400" : "bg-amber-400"
          )}
        ></span>
        <span
          className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]",
            variant === "default"
              ? "bg-emerald-500 shadow-emerald-500/80"
              : "bg-amber-500 shadow-amber-500/80"
          )}
        ></span>
      </span>
      <span className="relative z-10 pt-[1px]">{children}</span>

      {/* Sweeping shine effect */}
      <div
        className={cn(
          "absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[150%]",
          variant === "default" ? "via-emerald-100/40" : "via-amber-100/40"
        )}
      />
    </div>
  );
}
