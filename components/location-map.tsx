"use client";

import dynamic from 'next/dynamic';
import { Panel } from './ui/panel';
import { MapPin } from 'lucide-react';

// Lazy load the map with a skeleton loader to ensure 0 initial bundle size and no layout shift
const LocationMapInner = dynamic(() => import('./location-map-inner'), {
  ssr: false,
  loading: () => <MapSkeleton />
});

export function LocationMap() {
  const token = process.env.MAPBOX_ACCESS_TOKEN;

  if (!token) {
    return (
      <Panel className="flex h-full min-h-[400px] flex-col items-center justify-center bg-slate-100/50 p-8 text-center border-dashed border-2 border-slate-300">
        <MapPin className="size-12 mb-4 text-slate-300" />
        <h3 className="text-xl font-heading text-slate-900">Map Configuration Required</h3>
        <p className="mt-2 text-sm text-slate-600 max-w-xs">
          Please add <code>MAPBOX_ACCESS_TOKEN</code> to your <code>.env.local</code> file to enable the interactive location map.
        </p>
      </Panel>
    );
  }

  return (
    <div className="relative h-full w-full">
      <LocationMapInner accessToken={token} />
    </div>
  );
}

function MapSkeleton() {
  return (
    <Panel className="relative flex h-full min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-slate-900 border-none lg:min-h-full">
      {/* Animated grid background for the "loading" feel */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="size-16 animate-pulse rounded-full bg-sky-500/20 flex items-center justify-center">
          <MapPin className="size-8 text-sky-400 animate-bounce" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400/60 animate-pulse">
          Initializing Engine...
        </p>
      </div>

      {/* Glassmorphic border layer */}
      <div className="absolute inset-0 border-[8px] border-slate-900/50 pointer-events-none" />
    </Panel>
  );
}
