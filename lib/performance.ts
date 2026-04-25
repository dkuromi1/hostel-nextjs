type NavigatorWithHints = Navigator & {
  connection?: {
    effectiveType?: string;
  };
  deviceMemory?: number;
};

let cachedLowEndDevice: boolean | null = null;

/**
 * Reliable Performance Detection
 * Defaults to HIGH power. Only flags LOW if specific "old/budget" markers are met.
 */
export function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedLowEndDevice !== null) return cachedLowEndDevice;

  const nav = navigator as NavigatorWithHints;
  const ua = nav.userAgent;
  
  // 1. THE GPU DEALBREAKER
  // Mapbox GL v3 (3D) requires WebGL2. If missing, the device is legacy or bottom-tier.
  // We use this as a primary indicator for a "Low Power" environment.
  if (!(window as any).WebGL2RenderingContext) {
    cachedLowEndDevice = true;
    return true;
  }

  const isAndroid = /Android/i.test(ua);
  const isSafariFamily = /Safari/i.test(ua) && !/Chrome/i.test(ua);
  const isMobileIOS = /iPhone|iPad|iPod/i.test(ua);

  // 2. ANDROID / CHROME-LIKE (Reliable Spec Sniffing)
  if (isAndroid) {
    // Flag 4GB RAM and below (Common for budget phones that struggle with 3D)
    const isLowMemory = nav.deviceMemory && nav.deviceMemory <= 4;
    
    // Flag 4 cores and below (Modern flagships are almost all 8-core)
    const isWeakCPU = nav.hardwareConcurrency && nav.hardwareConcurrency <= 4;
    
    if (isLowMemory || isWeakCPU) {
      cachedLowEndDevice = true;
      return true;
    }
  }

  // 3. IOS / MOBILE SAFARI (OS Version Proxy)
  // Since Apple hides RAM/CPU, we flag based on the OS version.
  if (isMobileIOS) {
    // Matches "iPhone OS 14_" or "CPU OS 14_" (iPad)
    const isOldIOS = /(iPhone|CPU)\sOS\s([0-9]_|1[0-4]_)/.test(ua); 
    if (isOldIOS) {
      cachedLowEndDevice = true;
      return true;
    }
  }

  // DEFAULT: If no "low-power" flags were triggered, assume HIGH power.
  cachedLowEndDevice = false;
  return false;
}

export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches || isLowEndDevice();
}
