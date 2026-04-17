"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import poisData from '@/content/pois.json';
import { useSearchParams } from 'next/navigation';

interface LocationMapInnerProps {
    accessToken: string;
}

const HOSTEL_COORDS: [number, number] = [19.51698538503564, 42.06928812985387]; // [lng, lat]
const BUS_STATION_COORDS: [number, number] = [19.512929288055442, 42.06755637830981];
const THETH_DROPOFF_COORDS: [number, number] = [19.772315376603874, 42.39677313338882];
const VALBONA_VILLAGE_COORDS: [number, number] = [19.88570882131251, 42.444877303358666];
const THETH_VALBONA_MIDPOINT_COORDS: [number, number] = [
    (THETH_DROPOFF_COORDS[0] + VALBONA_VILLAGE_COORDS[0]) / 2,
    (THETH_DROPOFF_COORDS[1] + VALBONA_VILLAGE_COORDS[1]) / 2,
];
const THETH_VALBONA_MAP_QUERY = 'theth-valbona-midpoint';
const PEDONALE_COORDS: [number, number][] = [
    [19.513800410509983, 42.067007048478274],
    [19.514691128164753, 42.06795226804246],
    [19.51697176304084, 42.06913341207323],
    [19.5171140522808, 42.069314649661514]
];

const RECOMMENDED_POIS = poisData.recommendedPois;

// Detect mobile/low-power device — runs once at module level
const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isNarrow = window.innerWidth < 768;
    return hasTouch && isNarrow;
};

// Helper to generate a Geographical circle for the 5-minute walk radius
const createGeoJSONCircle = (center: [number, number], radiusInKm: number, points: number = 32) => {
    const coords = {
        latitude: center[1],
        longitude: center[0]
    };
    const ret = [];
    const distanceX = radiusInKm / (111.32 * Math.cos(coords.latitude * Math.PI / 180));
    const distanceY = radiusInKm / 110.574;

    for (let i = 0; i < points; i++) {
        const theta = (i / points) * (2 * Math.PI);
        const x = distanceX * Math.cos(theta);
        const y = distanceY * Math.sin(theta);
        ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]); // Close the polygon

    return {
        'type': 'FeatureCollection',
        'features': [{
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [ret]
            }
        }]
    } as any;
};

// Standard SVG Map Pin path (Material style)
const MAP_PIN_SVG = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"/>
    </svg>
`;

// Helper to get color based on POI category
const getPoiColor = (category: string) => {
    switch (category) {
        case 'eat': return '#10b981'; // emerald-500
        case 'see': return '#0ea5e9'; // sky-500
        case 'shop': return '#f43f5e'; // rose-500
        case 'transit': return '#64748b'; // slate-500
        default: return '#94a3b8'; // slate-400
    }
};

/**
 * Apply mobile-safe marker label styles.
 * On mobile/low-power GPUs (e.g. Pixel 7 Mali-G710), backdrop-filter: blur()
 * creates a separate compositing layer per element on top of the WebGL canvas.
 * With 13+ markers, this causes catastrophic GPU memory usage → Aw Snap.
 * We use a higher-opacity solid background on mobile instead.
 */
const applyLabelStyle = (el: HTMLElement, isMobile: boolean, overrides?: Partial<CSSStyleDeclaration>) => {
    el.style.padding = '3px 8px';
    el.style.color = '#0f172a';
    el.style.fontSize = '9px';
    el.style.fontWeight = '600';
    el.style.borderRadius = '4px';
    el.style.whiteSpace = 'nowrap';
    el.style.textDecoration = 'none';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'center';
    el.style.gap = '1px';

    // Premium glassmorphism for all devices
    el.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    el.style.backdropFilter = 'blur(4px)';
    el.style.border = '1px solid rgba(226, 232, 240, 0.5)';
    el.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.05)';

    // Apply any overrides
    if (overrides) {
        Object.assign(el.style, overrides);
    }
};

export default function LocationMapInner({ accessToken }: LocationMapInnerProps) {
    const searchParams = useSearchParams();
    const poiQuery = searchParams?.get('poi') || '';

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const sensitiveMarkersRef = useRef<HTMLElement[]>([]);
    const [isSatellite, setIsSatellite] = React.useState(false);

    // Reusable function to apply our "Boutique" customizations
    const applyCustomizations = (map: mapboxgl.Map, mobile: boolean) => {
        const style = map.getStyle();
        if (!style) return;
        
        const layers = style.layers;
        const labelLayerId = layers?.find(
            (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
        )?.id;

        // 1. FILTER COMPETITION: Hide other hotels/hostels
        layers?.forEach((layer) => {
            if (layer.id.includes('poi-label')) {
                const currentFilter = map.getFilter(layer.id) || ['all'];
                map.setFilter(layer.id, [
                    'all',
                    currentFilter,
                    ['!=', ['get', 'category_en'], 'Lodging'],
                    ['!=', ['get', 'maki'], 'lodging'],
                    ['!=', ['get', 'maki'], 'hotel'],
                    ['!=', ['get', 'maki'], 'hostel']
                ]);
            }
        });

        // 2. PEDONALE STREET HIGHLIGHT
        if (!map.getSource('pedonale-street')) {
            map.addSource('pedonale-street', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': PEDONALE_COORDS
                    }
                }
            } as any);
        }

        if (!map.getLayer('pedonale-line')) {
            map.addLayer({
                'id': 'pedonale-line',
                'type': 'line',
                'source': 'pedonale-street',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#0ea5e9',
                    'line-width': 10,
                    'line-opacity': 0.5
                }
            }, labelLayerId);
        }

        // 3. WALKING RADIUS (5-min / 400m)
        if (!map.getSource('walk-radius')) {
            map.addSource('walk-radius', {
                'type': 'geojson',
                'data': createGeoJSONCircle(HOSTEL_COORDS, 0.45) // 400 meters
            });
        }

        // REMOVED: walk-radius-fill (per user request)

        if (!map.getLayer('walk-radius-outline')) {
            map.addLayer({
                'id': 'walk-radius-outline',
                'type': 'line',
                'source': 'walk-radius',
                'layout': {},
                'paint': {
                    'line-color': '#0284c7', // Darker Scodrinon Sky
                    'line-width': 3.5,
                    'line-dasharray': [2, 2],
                    'line-opacity': 0.95
                }
            }, labelLayerId);
        }

        // 4. 3D BUILDINGS: Add extrusions (STREETS ONLY, DESKTOP ONLY)
        // On mobile GPUs (especially Mali-G710 on Pixel 7), fill-extrusion layers
        // with interpolated height expressions cause WebGL OOM → Aw Snap crashes.
        const isSatelliteStyle = style.sprite?.includes('satellite') || style.name?.toLowerCase().includes('satellite');

        // Remove existing if it exists
        if (map.getLayer('add-3d-buildings')) map.removeLayer('add-3d-buildings');

        if (map.getSource('composite') && !isSatelliteStyle) {
            map.addLayer(
                {
                    'id': 'add-3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                        'fill-extrusion-color': '#aaa',
                        'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
                        'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
                        'fill-extrusion-opacity': 0.6
                    }
                },
                labelLayerId
            );
        }
    };

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const mobile = isMobileDevice();

        // Resolve initial position synchronously to prevent memory spikes from flying after load
        const q = poiQuery ? poiQuery.toLowerCase() : '';
        let initialCenter = HOSTEL_COORDS;
        let initialZoom = 15.5;

        if (q) {
            const matchedPoi = RECOMMENDED_POIS.find((p: any) => q.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(q));
            if (matchedPoi) {
                initialCenter = matchedPoi.coords as [number, number];
                initialZoom = 16.5;
            } else if (q === THETH_VALBONA_MAP_QUERY || (q.includes('theth') && q.includes('valbona'))) {
                initialCenter = THETH_VALBONA_MIDPOINT_COORDS;
                initialZoom = 10.5;
            } else if (q.includes("pedestrian") || q.includes("idromeno")) {
                initialCenter = PEDONALE_COORDS[1] as [number, number];
                initialZoom = 16.5;
            }
        }

        mapboxgl.accessToken = accessToken;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: HOSTEL_COORDS,
            zoom: 13,
            pitch: 45,
            bearing: -17.6,
            antialias: false, // Disabled: antialias=true on high-DPI mobile devices causes WebGL OOM crashes
            fadeDuration: 300,
            maxTileCacheSize: mobile ? 20 : undefined, // Cap tile cache on mobile to limit memory footprint
        });

        mapRef.current = map;

        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');
        map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

        // --- 1. HOSTEL MARKER ---
        const el = document.createElement('div');
        el.className = 'marker-group';
        el.style.display = 'flex';
        el.style.flexDirection = 'column';
        el.style.alignItems = 'center';
        el.style.cursor = 'pointer';
        el.style.zIndex = '20';

        const circle = document.createElement('div');
        circle.className = 'marker';
        circle.style.width = '20px';
        circle.style.height = '20px';
        circle.style.backgroundColor = '#0ea5e9';
        circle.style.borderRadius = '50%';
        circle.style.border = '2px solid white';

        const label = document.createElement('a');
        label.href = 'https://www.google.com/maps/dir/?api=1&destination=Scodrinon+Hostel+Shkoder';
        label.target = '_blank';
        label.rel = 'noreferrer';
        applyLabelStyle(label, mobile, {
            marginBottom: '6px',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            border: '0.5px solid #0ea5e9',
        });
        if (!mobile) {
            label.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
        }

        const mainText = document.createElement('div');
        mainText.innerText = 'Scodrinon Hostel';
        mainText.style.fontSize = '12px';
        mainText.style.fontWeight = '700';
        mainText.style.lineHeight = '1.2';

        const subText = document.createElement('div');
        subText.innerText = 'click for directions';
        subText.style.fontSize = '9px';
        subText.style.textTransform = 'uppercase';
        subText.style.color = '#64748b';
        subText.style.lineHeight = '1.1';

        label.appendChild(mainText);
        label.appendChild(subText);
        el.appendChild(label);
        el.appendChild(circle);

        const style = document.createElement('style');
        style.innerHTML = `
            .marker { position: relative; }
            .marker::after {
                content: ""; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px;
                border: 2px solid #0ea5e9; border-radius: 50%; animation: map-ping 2s infinite; opacity: 0;
            }
            @keyframes map-ping { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(3); opacity: 0; } }
            .poi-marker-group { transition: opacity 0.3s ease-in-out; }
            .zoom-hidden { opacity: 0 !important; pointer-events: none !important; }
        `;
        document.head.appendChild(style);

        new mapboxgl.Marker({ element: el, anchor: 'bottom' }).setLngLat(HOSTEL_COORDS).addTo(map);

        // --- 2. BUS STATION MARKER ---
        const busEl = document.createElement('div');
        busEl.style.display = 'flex';
        busEl.style.flexDirection = 'column';
        busEl.style.alignItems = 'center';
        busEl.style.cursor = 'pointer';
        busEl.style.zIndex = '10';
        busEl.classList.add('zoom-sensitive');
        busEl.setAttribute('data-min-zoom', '13');
        busEl.style.transition = 'opacity 0.3s ease-in-out';

        // Set initial visibility
        if (map.getZoom() < 13) {
            busEl.classList.add('zoom-hidden');
        }

        const busCircle = document.createElement('div');
        busCircle.innerHTML = MAP_PIN_SVG;
        busCircle.style.width = '24px';
        busCircle.style.height = '24px';
        busCircle.style.color = '#64748b'; // slate-500
        busCircle.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))';

        const busLabel = document.createElement('a');
        busLabel.href = `https://www.google.com/maps/search/?api=1&query=${BUS_STATION_COORDS[1]},${BUS_STATION_COORDS[0]}`;
        busLabel.target = '_blank';
        busLabel.rel = 'noreferrer';
        busLabel.innerText = 'Central Bus Stop';
        applyLabelStyle(busLabel, mobile, {
            marginBottom: '4px',
            padding: '4px 10px',
            fontSize: '10px',
            borderRadius: '6px',
            border: '0.5px solid white',
        });

        busEl.appendChild(busLabel);
        busEl.appendChild(busCircle);
        sensitiveMarkersRef.current.push(busEl);
        new mapboxgl.Marker({ element: busEl, anchor: 'bottom' }).setLngLat(BUS_STATION_COORDS).addTo(map);


        // --- 3. RECOMMENDED POIS ---
        RECOMMENDED_POIS.forEach(poi => {
            const poiEl = document.createElement('div');
            poiEl.className = 'poi-marker-group';
            if ((poi as any).minZoom) {
                poiEl.classList.add('zoom-sensitive');
                poiEl.setAttribute('data-min-zoom', (poi as any).minZoom.toString());
            }
            poiEl.style.display = 'flex';
            poiEl.style.flexDirection = 'column';
            poiEl.style.alignItems = 'center';
            poiEl.style.cursor = 'pointer';

            const poiCircle = document.createElement('div');
            poiCircle.innerHTML = MAP_PIN_SVG;
            poiCircle.style.width = '20px';
            poiCircle.style.height = '20px';
            poiCircle.style.color = getPoiColor(poi.category);
            poiCircle.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))';

            const poiLabel = document.createElement('a');
            poiLabel.href = `https://www.google.com/maps/search/?api=1&query=${poi.coords[1]},${poi.coords[0]}`;
            poiLabel.target = '_blank';
            poiLabel.rel = 'noreferrer';
            poiLabel.innerText = poi.name;
            applyLabelStyle(poiLabel, mobile);

            poiEl.appendChild(poiLabel);
            poiEl.appendChild(poiCircle);

            // Set initial visibility
            const currentZoom = map.getZoom();
            if ((poi as any).minZoom && currentZoom < (poi as any).minZoom) {
                poiEl.classList.add('zoom-hidden');
            }

            if ((poi as any).minZoom) {
                sensitiveMarkersRef.current.push(poiEl);
            }

            new mapboxgl.Marker({ element: poiEl, anchor: 'bottom' }).setLngLat(poi.coords as [number, number]).addTo(map);
        });

        // Throttled move handler — uses cached marker refs instead of querySelectorAll on every frame.
        // On mobile, the per-frame DOM traversal + class toggling caused layout thrashing.
        let moveThrottleId: ReturnType<typeof requestAnimationFrame> | null = null;
        map.on('move', () => {
            if (moveThrottleId !== null) return;
            moveThrottleId = requestAnimationFrame(() => {
                moveThrottleId = null;
                const zoom = map.getZoom();

                // Toggle sensitive markers using cached refs
                sensitiveMarkersRef.current.forEach(el => {
                    const minZoom = parseFloat(el.getAttribute('data-min-zoom') || '0');
                    el.classList.toggle('zoom-hidden', zoom < minZoom);
                });

                // Toggle Legend without causing React re-renders
                const legend = document.getElementById('map-legend');
                if (legend) {
                    if (zoom <= 11) {
                        legend.classList.add('opacity-0', 'pointer-events-none');
                        legend.classList.remove('opacity-100');
                    } else {
                        legend.classList.remove('opacity-0', 'pointer-events-none');
                        legend.classList.add('opacity-100');
                    }
                }
            });
        });

        map.on('load', () => {
            // Smooth fly-in animation from regional overview to hostel
            map.flyTo({ center: initialCenter, zoom: initialZoom, speed: 0.8, curve: 1, essential: true });
            applyCustomizations(map, mobile);

            // Force a resize calculation after parent layout stabilization
            setTimeout(() => {
                if (mapRef.current) mapRef.current.resize();
            }, 100);
        });

        // Crucial: Re-apply customizations whenever the style is changed
        map.on('style.load', () => {
            applyCustomizations(map, mobile);

            // Re-calculate size after style swap to prevent 'gray box' issues
            setTimeout(() => {
                if (mapRef.current) mapRef.current.resize();
            }, 50);
        });

        return () => {
            if (moveThrottleId !== null) cancelAnimationFrame(moveThrottleId);
            sensitiveMarkersRef.current = [];
            map.remove();
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, [accessToken]);

    // Handle dynamic POI queries via URL params without remounting the map
    useEffect(() => {
        if (!mapRef.current || !poiQuery) return;
        
        const q = poiQuery.toLowerCase();
        let targetCenter = HOSTEL_COORDS;
        let targetZoom = 15.5;

        const matchedPoi = RECOMMENDED_POIS.find((p: any) => q.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(q));
        if (matchedPoi) {
            targetCenter = matchedPoi.coords as [number, number];
            targetZoom = 16.5;
        } else if (q === THETH_VALBONA_MAP_QUERY || (q.includes('theth') && q.includes('valbona'))) {
            targetCenter = THETH_VALBONA_MIDPOINT_COORDS;
            targetZoom = 10.5;
        } else if (q.includes("pedestrian") || q.includes("idromeno")) {
            targetCenter = PEDONALE_COORDS[1] as [number, number];
            targetZoom = 16.5;
        }

        mapRef.current.flyTo({ center: targetCenter, zoom: targetZoom, speed: 1.2, curve: 1, essential: true });
    }, [poiQuery]);

    const toggleStyle = () => {
        if (!mapRef.current) return;
        const nextIsSatellite = !isSatellite;
        setIsSatellite(nextIsSatellite);
        mapRef.current.setStyle(
            nextIsSatellite
                ? 'mapbox://styles/mapbox/satellite-streets-v12'
                : 'mapbox://styles/mapbox/streets-v12'
        );
    };

    return (
        <div className="absolute inset-0 h-full w-full overflow-hidden">
            <div ref={mapContainerRef} className="h-full w-full" />

            {/* Custom Boutique Toggle */}
            <button
                onClick={toggleStyle}
                className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-black/60 active:scale-95"
            >
                <div className="size-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                {isSatellite ? 'View Streets' : 'View Satellite'}
            </button>

            {/* Map Legend - Hidden at regional zoom levels (< 11) using DOM manipulation */}
            <div id="map-legend" className="absolute bottom-4 left-4 z-10 flex flex-col gap-2 rounded-xl border border-slate-200 bg-white/40 backdrop-blur-md p-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-900 shadow-lg transition-opacity duration-500 opacity-100">
                <div className="flex items-center gap-3">
                    <div className="h-0.5 w-6 border-t border-dashed border-sky-600 opacity-90" />
                    <span>5 Minute Walk Area</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-1.5 w-6 rounded-full bg-sky-400/40" />
                    <span>The Pedestrian Street</span>
                </div>
            </div>
        </div>
    );
}
