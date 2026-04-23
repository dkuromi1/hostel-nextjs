"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import { Panel } from "./ui/panel";
import { MapPin } from "lucide-react";

const LocationMapInner = dynamic(() => import("./location-map-inner"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export function LocationMapContent({
  accessToken,
  shouldLoad,
}: {
  accessToken: string;
  shouldLoad: boolean;
}) {
  const searchParams = useSearchParams();
  const poiQuery = searchParams?.get("poi") ?? "";
  const shouldRenderMap = shouldLoad || Boolean(poiQuery);

  return shouldRenderMap ? <LocationMapInner accessToken={accessToken} /> : <MapSkeleton />;
}

function MapSkeleton() {
  return (
    <Panel className="relative flex h-full min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-slate-900 border-none lg:min-h-full">
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="size-16 animate-pulse rounded-full bg-sky-500/20 flex items-center justify-center">
          <MapPin className="size-8 text-sky-400 animate-bounce" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400/60 animate-pulse">
          Initializing Engine...
        </p>
      </div>

      <div className="absolute inset-0 border-[8px] border-slate-900/50 pointer-events-none" />
    </Panel>
  );
}
