import { siteConfig } from "@/lib/site-data";
import { Sparkles } from "lucide-react";

export function VolunteerBanner() {
  if (!siteConfig.volunteersNeeded) return null;

  const primaryContactHref = siteConfig.whatsappUrl || `https://wa.me/${siteConfig.phoneRaw}`;

  return (
    <div className="group relative overflow-hidden bg-gradient-to-r from-indigo-950 via-[#1e1b4b] to-indigo-950 border-b border-indigo-400/15 px-4 py-1.5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-indigo-50/90 shadow-lg">
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 antialiased">
        <Sparkles className="size-3 text-amber-400 animate-pulse" />
        <span className="hidden xs:inline">We&apos;re looking for volunteers!</span>
        <span className="xs:hidden">Volunteers Needed</span>
        <a
          href={primaryContactHref}
          target="_blank"
          rel="noreferrer"
          className="ml-1 text-white underline decoration-amber-400/30 underline-offset-4 hover:text-amber-200 hover:decoration-amber-400 transition-all duration-300"
        >
          Contact us<span className="hidden sm:inline">&nbsp;to apply</span> →
        </a>
      </div>
    </div>

  );
}
