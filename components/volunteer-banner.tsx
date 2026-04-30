export interface VolunteerBannerProps {
  volunteersNeeded: boolean;
  whatsappUrl?: string;
  phoneRaw: string;
}

export function VolunteerBanner({ volunteersNeeded, whatsappUrl, phoneRaw }: VolunteerBannerProps) {
  if (!volunteersNeeded) return null;

  const primaryContactHref = whatsappUrl || `https://wa.me/${phoneRaw}`;

  return (
    <div className="group relative overflow-hidden bg-[var(--brand-tertiary)] border-b border-white/10 px-4 py-1.5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/90 shadow-lg">
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 antialiased">
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
