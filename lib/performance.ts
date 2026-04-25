type NavigatorWithHints = Navigator & {
  connection?: {
    effectiveType?: string;
  };
  deviceMemory?: number;
};

let cachedLowEndDevice: boolean | null = null;

export function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedLowEndDevice !== null) return cachedLowEndDevice;

  const nav = navigator as NavigatorWithHints;
  const deviceMemory = nav.deviceMemory ?? 8;
  const hardwareConcurrency = nav.hardwareConcurrency ?? 4;
  const effectiveType = nav.connection?.effectiveType;
  const userAgent = nav.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isLowMemory = deviceMemory <= 2;
  const isLowCores = hardwareConcurrency <= 2;
  const isSlowConnection = effectiveType ? ["slow-2g", "2g", "3g"].includes(effectiveType) : false;
  const chromeVersion = Number.parseInt(userAgent.match(/Chrome\/(\d+)/)?.[1] ?? "", 10);
  const isOldChrome = Number.isFinite(chromeVersion) && chromeVersion > 0 && chromeVersion < 90;

  const score =
    (isMobile ? 1 : 0) +
    (isLowMemory ? 2 : 0) +
    (isLowCores ? 2 : 0) +
    (isSlowConnection ? 1 : 0) +
    (isOldChrome ? 1 : 0);

  cachedLowEndDevice = score >= 3;
  return cachedLowEndDevice;
}

export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches || isLowEndDevice();
}
