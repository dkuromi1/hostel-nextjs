/**
 * Netlify Image CDN Loader
 * 
 * This loader explicitly points Next.js image requests to Netlify's Image CDN.
 * This resolves issues where the automatic Next.js runtime on Netlify fails
 * to process optimized images via the default /_next/image endpoint.
 */
export default function netlifyLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If the image is already a full URL, just return it or proxy it
  if (src.startsWith('http')) {
    return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
  }

  // For local images (relative paths starting with /)
  // Ensure we have a leading slash but not two
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  return `/.netlify/images?url=${encodeURIComponent(normalizedSrc)}&w=${width}&q=${quality || 75}`;
}
