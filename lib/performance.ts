/**
 * Performance optimization utilities
 */

// Detect if device is low-end to reduce animations and effects
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // More accurate memory detection with higher fallback
  const deviceMemory = (navigator as any).deviceMemory || 8;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  
  // Enhanced mobile detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Detect specific low-end mobile patterns
  const isLowEndMobile = /Android.*[1-4]|iPhone.*[6-8]/i.test(navigator.userAgent);
  
  // More nuanced thresholds
  const isLowMemory = deviceMemory <= 2; // Only flag very low memory devices
  const isLowCores = hardwareConcurrency <= 2; // Only flag very low core count
  const isOldBrowser = navigator.userAgent.includes('Chrome/') && 
    parseInt(navigator.userAgent.match(/Chrome\/(\d+)/)?.[1] || '0') < 90;
  const isSlowConnection = (navigator as any).connection && 
    (navigator as any).connection.effectiveType && 
    ['slow-2g', '2g', '3g'].includes((navigator as any).connection.effectiveType);
  
  // Combine factors with weighted logic
  const lowEndScore = [
    isMobile ? 1 : 0,
    isLowEndMobile ? 2 : 0,
    isLowMemory ? 2 : 0,
    isLowCores ? 2 : 0,
    isOldBrowser ? 1 : 0,
    isSlowConnection ? 1 : 0,
  ].reduce((sum, score) => sum + score, 0);
  
  // Require at least 3 points to be considered low-end
  return lowEndScore >= 3;
}

// Reduce motion for users who prefer it or on low-end devices
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isLowEnd = isLowEndDevice();
  
  return prefersReducedMotion || isLowEnd;
}

// Optimized image loading with intersection observer
export function lazyLoadImage(img: HTMLImageElement, src: string) {
  if (!('IntersectionObserver' in window)) {
    img.src = src;
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '50px' }
  );

  observer.observe(img);
}

// Throttle function for performance-intensive events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
        timeoutId = null;
      }, delay - (currentTime - lastExecTime));
    }
  };
}

// Debounce function for input events
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
