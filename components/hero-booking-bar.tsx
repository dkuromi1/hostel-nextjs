import { Calendar, Users } from "@/lib/icon-registry";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-data";

export function HeroBookingBar({ className }: { className?: string }) {
  return (
    <div className={cn(
      "relative z-20 w-full max-w-4xl",
      className
    )}>
      <div className="flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/20 bg-[var(--surface-dark)]/40 p-4 shadow-2xl backdrop-blur-3xl md:flex-row md:items-center md:gap-0 lg:p-3">
        {/* Arrive Date */}
        <div className="group flex flex-1 flex-col px-6 py-2 transition-colors hover:bg-white/5 md:border-r md:border-white/10">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-accent)]/80">
            Arrive Date
          </label>
          <div className="mt-1 flex items-center justify-between">
            <input 
              type="text" 
              defaultValue="11/08/2026"
              className="w-full bg-transparent font-heading text-lg text-white outline-none placeholder:text-white/40"
              placeholder="Pick a date"
            />
            <Calendar className="size-4 text-white/40" />
          </div>
        </div>

        {/* Depart Date */}
        <div className="group flex flex-1 flex-col px-6 py-2 transition-colors hover:bg-white/5 md:border-r md:border-white/10">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-accent)]/80">
            Depart Date
          </label>
          <div className="mt-1 flex items-center justify-between">
            <input 
              type="text" 
              defaultValue="15/08/2026"
              className="w-full bg-transparent font-heading text-lg text-white outline-none placeholder:text-white/40"
              placeholder="Pick a date"
            />
            <Calendar className="size-4 text-white/40" />
          </div>
        </div>

        {/* Guests */}
        <div className="group flex flex-1 flex-col px-6 py-2 transition-colors hover:bg-white/5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-accent)]/80">
            Guests
          </label>
          <div className="mt-1 flex items-center justify-between">
            <select className="appearance-none bg-transparent font-heading text-lg text-white outline-none">
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3" selected>3 Guests</option>
              <option value="4">4 Guests</option>
            </select>
            <Users className="size-4 text-white/40" />
          </div>
        </div>

        {/* Search Button */}
        <div className="p-1 md:ml-4">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--brand-whatsapp)] px-8 font-heading text-lg font-bold text-white shadow-whatsapp transition-all hover:scale-[1.02] hover:bg-[var(--brand-whatsapp-dark)] active:scale-95 md:h-16"
          >
            Check Availability
          </a>
        </div>
      </div>
    </div>
  );
}
