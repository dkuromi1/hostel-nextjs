import { siteConfig } from "@/lib/site-data";

export function VolunteerBanner() {
  if (!siteConfig.volunteersNeeded) return null;

  return (
    <div className="bg-indigo-600 px-4 py-1 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
      🙌 We&apos;re looking for volunteers!{" "}
      <a
        href={`https://wa.me/${siteConfig.phoneRaw}`}
        target="_blank"
        rel="noreferrer"
        className="text-white underline underline-offset-4 hover:text-indigo-100 transition-colors"
      >
        WhatsApp us to apply →
      </a>
    </div>
  );
}
