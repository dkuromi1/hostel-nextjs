import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, SunMedium } from "lucide-react";
// no siteConfig import needed anymore

async function getThethWeather() {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=42.3983&longitude=19.7772&current=temperature_2m,weather_code",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function getWeatherDetails(code: number) {
  // WMO weather codes mapping
  if (code === 0) return { label: "Clear Skies", icon: Sun, colorClass: "text-amber-400" };
  if (code === 1 || code === 2) return { label: "Partly Cloudy", icon: SunMedium, colorClass: "text-amber-400" };
  if (code === 3) return { label: "Overcast", icon: Cloud, colorClass: "text-[var(--text-muted)]" };
  if (code === 45 || code === 48) return { label: "Foggy", icon: CloudFog, colorClass: "text-[var(--text-muted)]" };
  if (code >= 51 && code <= 67) return { label: "Raining", icon: CloudRain, colorClass: "text-[var(--brand-accent)]" };
  if (code >= 71 && code <= 86) return { label: "Snowing", icon: CloudSnow, colorClass: "text-[var(--brand-accent)]/80" };
  if (code >= 95) return { label: "Thunderstorm", icon: CloudLightning, colorClass: "text-[var(--brand-primary)]" };
  return { label: "Clear", icon: Sun, colorClass: "text-amber-400" };
}

export async function ThethWeather({ variant = "default" }: { variant?: "default" | "small" } = {}) {

  const weather = await getThethWeather();
  
  if (!weather || !weather.current) {
    return null;
  }

  const { temperature_2m, weather_code } = weather.current;
  const details = getWeatherDetails(weather_code);
  const Icon = details.icon;

  if (variant === "small") {
    return (
      <div className="group flex w-fit items-center gap-3 rounded-[22px] border border-white/16 bg-[var(--surface-dark)]/42 pl-2.5 pr-4 py-2 text-white shadow-[0_18px_45px_-30px_rgba(0,0,0,0.5)] backdrop-blur-[5px] transition-all duration-300 hover:border-white/24 hover:bg-[var(--surface-dark)]/52">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <Icon className={`size-4.5 ${details.colorClass}`} strokeWidth={2} />
        </div>
        <div className="flex flex-col py-0.5">
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/65 leading-none mb-1">
            Theth Currently
          </span>
          <span className="text-sm font-medium text-white/92 leading-none">
            {Math.round(temperature_2m)}°C
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-fit items-center gap-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-5 py-4 shadow-sm shadow-[var(--glass-shadow)]/10">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--muted)] shadow-sm border border-[var(--border)]">
        <Icon className={`size-6 ${details.colorClass}`} strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-primary)] opacity-80">
          Theth National Park Currently
        </p>
        <p className="mt-0.5 font-heading text-2xl leading-none tracking-tight text-[var(--text-heading)]">
          {Math.round(temperature_2m)}°C 
          <span className="ml-2 font-sans text-sm font-medium text-[var(--text-muted)]">
            {details.label}
          </span>
        </p>
      </div>
    </div>
  );
}
