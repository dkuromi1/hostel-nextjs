import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, SunMedium } from "@/lib/icon-registry";
import { cn } from "@/lib/utils";
import type { WeatherConfig } from "@/lib/types/site";

async function fetchWeather(latitude: number, longitude: number) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`,
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
  if (code === 3) return { label: "Overcast", icon: Cloud, colorClass: "text-slate-400" };
  if (code === 45 || code === 48) return { label: "Foggy", icon: CloudFog, colorClass: "text-slate-400" };
  if (code >= 51 && code <= 67) return { label: "Raining", icon: CloudRain, colorClass: "text-sky-400" };
  if (code >= 71 && code <= 86) return { label: "Snowing", icon: CloudSnow, colorClass: "text-blue-200" };
  if (code >= 95) return { label: "Thunderstorm", icon: CloudLightning, colorClass: "text-amber-300" };
  return { label: "Clear", icon: Sun, colorClass: "text-amber-400" };
}

interface RegionalWeatherProps {
  config: WeatherConfig;
  variant?: "default" | "small";
}

export async function RegionalWeather({ config, variant = "default" }: RegionalWeatherProps) {

  const weather = await fetchWeather(config.latitude, config.longitude);

  if (!weather || !weather.current) {
    return null;
  }

  const { temperature_2m, weather_code } = weather.current;
  const details = getWeatherDetails(weather_code);
  const Icon = details.icon;

  if (variant === "small") {
    return (
      <div className="group flex w-fit flex-col rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-2 shadow-sm shadow-[var(--glass-shadow)]/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)] opacity-85 leading-none mb-1.5">
          {config.label}
        </span>
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--muted)] border border-[var(--border)] shadow-sm">
            <Icon className={cn("size-4", details.colorClass)} strokeWidth={2} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-baseline gap-1.5 leading-none">
              {config.sublabel && (
                <span className="text-[10px] font-medium text-[var(--text-muted)] leading-none">
                  {config.sublabel}
                </span>
              )}
              <span className="text-sm font-bold text-[var(--text-heading)] leading-none">
                {Math.round(temperature_2m)}°C
              </span>
            </div>
            <span className="text-[10px] font-medium text-[var(--text-muted)] leading-none mt-1">
              {details.label}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-fit items-center gap-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-5 py-4 shadow-sm shadow-[var(--glass-shadow)]/10">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--muted)] shadow-sm border border-[var(--border)]">
        <Icon className={`size-6 ${details.colorClass}`} />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-primary)] opacity-80">
          {config.label} <br /> {config.sublabel}
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
