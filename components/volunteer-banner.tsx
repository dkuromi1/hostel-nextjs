import { siteConfig } from "@/lib/site-data";

export function VolunteerBanner() {
  if (!siteConfig.volunteersNeeded) return null;

  const primaryContactHref = siteConfig.whatsappUrl || `https://wa.me/${siteConfig.phoneRaw}`;

  return (
    <div className="bg-[#1e1b4b] border-b border-indigo-400/10 px-4 py-1.5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-indigo-50/90 shadow-sm">
      🙌 We&apos;re looking for volunteers!{" "}
      <a
        href={primaryContactHref}
        target="_blank"
        rel="noreferrer"
        className="text-white underline decoration-indigo-400/30 underline-offset-4 hover:text-indigo-200 hover:decoration-indigo-400 transition-all duration-300"
      >
        Contact us<span className="hidden sm:inline"> to apply</span> →
      </a>
    </div>
  );
}
