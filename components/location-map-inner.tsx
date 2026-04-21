"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Home } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { activeInstance } from '@/instances/scodrinon';
import { siteConfig } from '@/lib/site-data';

interface LocationMapInnerProps {
    accessToken: string;
}

const HOSTEL_COORDS: [number, number] = [19.51698538503564, 42.069258]; // [lng, lat]
const THETH_DROPOFF_COORDS: [number, number] = [19.772315376603874, 42.39677313338882];
const VALBONA_VILLAGE_COORDS: [number, number] = [19.88570882131251, 42.444877303358666];
const THETH_VALBONA_MIDPOINT_COORDS: [number, number] = [
    (THETH_DROPOFF_COORDS[0] + VALBONA_VILLAGE_COORDS[0]) / 2,
    (THETH_DROPOFF_COORDS[1] + VALBONA_VILLAGE_COORDS[1]) / 2,
];
const KOMANI_FERRY_COORDS: [number, number] = [19.826066248202096, 42.10881657873157];
const BLINI_PARK_COORDS: [number, number] = [19.80642220690339, 42.19953460048828];
const SHALA_RIVER_MIDPOINT_COORDS: [number, number] = [
    (KOMANI_FERRY_COORDS[0] + BLINI_PARK_COORDS[0]) / 2,
    (KOMANI_FERRY_COORDS[1] + BLINI_PARK_COORDS[1]) / 2,
];

const THETH_VALBONA_MAP_QUERY = 'theth-valbona-midpoint';
const SHALA_RIVER_MAP_QUERY = 'shala-river-midpoint';
const STANDARD_STYLE = 'mapbox://styles/mapbox/standard';
const SATELLITE_STYLE = 'mapbox://styles/mapbox/satellite-streets-v12';
const PEDONALE_COORDS: [number, number][] = [
    [19.513800410509983, 42.067007048478274],
    [19.514691128164753, 42.06795226804246],
    [19.51697176304084, 42.06913341207323],
    [19.5171140522808, 42.069314649661514]
];

interface MapPOI {
    name: string;
    category: string;
    coords: [number, number];
    minZoom?: number;
}

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
        type: 'FeatureCollection' as const,
        features: [{
            type: 'Feature' as const,
            properties: {},
            geometry: {
                type: 'Polygon' as const,
                coordinates: [ret]
            }
        }]
    };
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
    el.style.color = 'var(--text-heading)';
    el.style.fontSize = '9px';
    el.style.fontWeight = '600';
    el.style.borderRadius = '4px';
    el.style.whiteSpace = 'nowrap';
    el.style.textDecoration = 'none';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'center';
    el.style.gap = '1px';

    // Premium glassmorphism using CSS variables
    el.style.backgroundColor = 'var(--glass-bg)';
    el.style.backdropFilter = 'blur(4px)';
    el.style.border = '1px solid var(--glass-border)';
    el.style.boxShadow = '0 4px 6px -1px var(--glass-shadow)';

    // Apply any overrides
    if (overrides) {
        Object.assign(el.style, overrides);
    }
};

export default function LocationMapInner({ accessToken }: LocationMapInnerProps) {
    const searchParams = useSearchParams();
    const poiQuery = searchParams?.get('poi') || '';
    const initialPoiQueryRef = useRef(poiQuery);
    const recommendedPoisRef = useRef<MapPOI[]>([]);
    const trailGeoJsonRef = useRef<mapboxgl.GeoJSONSourceSpecification["data"] | null>(null);

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const sensitiveMarkersRef = useRef<HTMLElement[]>([]);
    const [isSatellite, setIsSatellite] = React.useState(false);
    const isSatelliteRef = useRef(false);

    const getLightPreset = () =>
        document.documentElement.classList.contains('dark') ? 'night' : 'day';

    const applyBasePreset = (map: mapboxgl.Map) => {
        try {
            map.setConfigProperty('basemap', 'lightPreset', getLightPreset());
        } catch {
            // Ignore when the active style does not support Mapbox Standard config properties.
        }
    };

    // Reusable function to apply our "Boutique" customizations
    const applyCustomizations = (map: mapboxgl.Map) => {
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
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: PEDONALE_COORDS
                    }
                }
            } as mapboxgl.AnySourceData);
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

        // HIKING TRAIL: Theth to Valbona
        if (siteConfig.features.showRegionalTrails && trailGeoJsonRef.current && !map.getSource('theth-valbona-track')) {
            map.addSource('theth-valbona-track', {
                type: 'geojson',
                data: trailGeoJsonRef.current
            });
        }

        if (siteConfig.features.showRegionalTrails && !map.getLayer('theth-valbona-line') && map.getSource('theth-valbona-track')) {
            map.addLayer({
                'id': 'theth-valbona-line',
                'type': 'line',
                'source': 'theth-valbona-track',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#10b981', // emerald-500
                    'line-width': 3.5,
                    'line-dasharray': [2, 1],
                    'line-opacity': 0.8
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
        if (!siteConfig.features.showLocalExperienceMap) return;

        let moveThrottleId: ReturnType<typeof requestAnimationFrame> | null = null;
        let map: mapboxgl.Map | null = null;
        let style: HTMLStyleElement | null = null;
        const mobile = isMobileDevice();
        const themeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (map && !isSatelliteRef.current) {
                        applyBasePreset(map);
                    }
                }
            });
        });
        let isCancelled = false;

        const initMap = async () => {
            if (siteConfig.features.showLocalPois) {
                const poisModule = await activeInstance.loaders.loadPois();
                recommendedPoisRef.current = poisModule.recommendedPois as MapPOI[];
            } else {
                recommendedPoisRef.current = [];
            }

            if (siteConfig.features.showRegionalTrails) {
                const tracksModule = await activeInstance.loaders.loadTrailGeoJson();
                trailGeoJsonRef.current = tracksModule as mapboxgl.GeoJSONSourceSpecification["data"];
            } else {
                trailGeoJsonRef.current = null;
            }

            if (isCancelled || !mapContainerRef.current) {
                return;
            }

            const q = initialPoiQueryRef.current ? initialPoiQueryRef.current.toLowerCase() : '';
            let initialCenter = HOSTEL_COORDS;
            let initialZoom = 15.5;

            if (q) {
                const matchedPoi = recommendedPoisRef.current.find((p) => q.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(q));
                if (matchedPoi) {
                    initialCenter = matchedPoi.coords as [number, number];
                    initialZoom = 16.5;
                } else if (siteConfig.features.showRegionalTrails && (q === THETH_VALBONA_MAP_QUERY || (q.includes('theth') && q.includes('valbona')))) {
                    initialCenter = THETH_VALBONA_MIDPOINT_COORDS;
                    initialZoom = 10.5;
                } else if (q === SHALA_RIVER_MAP_QUERY || (q.includes('shala') && q.includes('river'))) {
                    initialCenter = SHALA_RIVER_MIDPOINT_COORDS;
                    initialZoom = 10.5;
                } else if (q.includes("pedestrian") || q.includes("idromeno")) {
                    initialCenter = PEDONALE_COORDS[1] as [number, number];
                    initialZoom = 16.5;
                }
            }

            mapboxgl.accessToken = accessToken;

            const m = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: STANDARD_STYLE,
                center: HOSTEL_COORDS,
                zoom: 13,
                pitch: 45,
                bearing: -17.6,
                antialias: false,
                fadeDuration: 300,
                maxTileCacheSize: mobile ? 20 : undefined,
            });

            map = m;
            mapRef.current = m;

            m.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');
            m.addControl(new mapboxgl.FullscreenControl(), 'top-right');
            themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

            // --- 1. HOSTEL MARKER (Premium Floating Pin) ---
            const elevation = 0;

            const el = document.createElement('div');
            el.className = 'hostel-marker-container';
            el.setAttribute('data-poi', 'hostel');
            el.style.display = 'flex';
            el.style.flexDirection = 'column';
            el.style.alignItems = 'center';
            el.style.cursor = 'pointer';
            el.style.zIndex = '20';
            el.style.position = 'relative';

            // Floating Head (Label + Icon)
            const floatingHead = document.createElement('div');
            floatingHead.style.display = 'flex';
            floatingHead.style.flexDirection = 'column';
            floatingHead.style.alignItems = 'center';
            floatingHead.style.animation = 'marker-float 3s ease-in-out infinite';
            floatingHead.style.marginBottom = `${elevation}px`;

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
            label.classList.add('poi-label-el');
            label.setAttribute('data-poi-label', 'hostel');
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
            subText.style.color = 'var(--text-muted)';
            subText.style.lineHeight = '1.1';

            label.appendChild(mainText);
            label.appendChild(subText);
            floatingHead.appendChild(label);

            const circle = document.createElement('div');
            circle.className = 'marker-head';
            circle.style.width = '20px';
            circle.style.height = '20px';
            circle.style.backgroundColor = '#0ea5e9';
            circle.style.borderRadius = '50%';
            circle.style.border = '2px solid white';
            circle.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            floatingHead.appendChild(circle);

            // Vertical Stem
            const stem = document.createElement('div');
            stem.style.position = 'absolute';
            stem.style.bottom = '4px';
            stem.style.width = '2px';
            stem.style.height = `${elevation}px`;
            stem.style.background = 'linear-gradient(to top, rgba(14, 165, 233, 0.8), rgba(14, 165, 233, 0.2))';
            stem.style.zIndex = '-1';

            // Ground Reference (Shadow/Dot)
            const groundDot = document.createElement('div');
            groundDot.style.width = '8px';
            groundDot.style.height = '4px';
            groundDot.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
            groundDot.style.borderRadius = '50%';
            groundDot.style.filter = 'blur(1px)';
            groundDot.style.position = 'absolute';
            groundDot.style.bottom = '0';

            el.appendChild(floatingHead);
            el.appendChild(stem);
            el.appendChild(groundDot);

            style = document.createElement('style');
            style.innerHTML = `
            .marker-head { position: relative; }
            .marker-head::after {
                content: ""; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px;
                border: 2px solid #0ea5e9; border-radius: 50%; animation: map-ping 2s infinite; opacity: 0;
            }
            @keyframes marker-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }
            @keyframes map-ping { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(3); opacity: 0; } }
            .poi-marker-group { transition: opacity 0.3s ease-in-out; }
            .zoom-hidden { opacity: 0 !important; pointer-events: none !important; }
            .poi-highlight { 
                outline: 2px solid #0ea5e9 !important; 
                outline-offset: 2px;
                box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.2) !important;
                z-index: 50 !important; 
            }
        `;
            document.head.appendChild(style);

            new mapboxgl.Marker({ element: el, anchor: 'bottom' }).setLngLat(HOSTEL_COORDS).addTo(m);


            // --- 2. RECOMMENDED POIS ---
            recommendedPoisRef.current.forEach(poi => {
                const poiEl = document.createElement('div');
                poiEl.className = 'poi-marker-group';
                if (poi.minZoom) {
                    poiEl.classList.add('zoom-sensitive');
                    poiEl.setAttribute('data-min-zoom', poi.minZoom.toString());
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
                poiLabel.classList.add('poi-label-el');
                poiLabel.setAttribute('data-poi-label', poi.name.toLowerCase());

                poiEl.appendChild(poiLabel);
                poiEl.appendChild(poiCircle);

                // Set initial visibility
                const currentZoom = m.getZoom();
                if (poi.minZoom && currentZoom < poi.minZoom) {
                    poiEl.classList.add('zoom-hidden');
                }

                if (poi.minZoom) {
                    sensitiveMarkersRef.current.push(poiEl);
                }

                new mapboxgl.Marker({ element: poiEl, anchor: 'bottom' }).setLngLat(poi.coords as [number, number]).addTo(m);
            });

            // Throttled move handler — uses cached marker refs instead of querySelectorAll on every frame.
            // On mobile, the per-frame DOM traversal + class toggling caused layout thrashing.
            m.on('move', () => {
                if (moveThrottleId !== null) return;
                moveThrottleId = requestAnimationFrame(() => {
                    moveThrottleId = null;
                    const zoom = m.getZoom();

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

            m.on('load', () => {
                // Smooth fly-in animation from regional overview to hostel
                m.flyTo({ center: initialCenter, zoom: initialZoom, speed: 0.8, curve: 1, essential: true });
                applyBasePreset(m);
                applyCustomizations(m);

                // Force a resize calculation after parent layout stabilization
                setTimeout(() => {
                    if (mapRef.current) mapRef.current.resize();
                }, 100);
            });

            m.on('style.load', () => {
                if (!isSatelliteRef.current) {
                    applyBasePreset(m);
                }
                applyCustomizations(m);

                // Re-calculate size after style swap to prevent 'gray box' issues
                setTimeout(() => {
                    if (mapRef.current) mapRef.current.resize();
                }, 50);
            });
        };

        void initMap();

        return () => {
            isCancelled = true;
            if (moveThrottleId !== null) cancelAnimationFrame(moveThrottleId);
            sensitiveMarkersRef.current = [];
            themeObserver.disconnect();
            if (map) {
                map.remove();
            }
            if (style && document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, [accessToken]);

    // Handle dynamic POI queries via URL params without remounting the map
    useEffect(() => {
        if (!siteConfig.features.showLocalExperienceMap || !mapRef.current || !poiQuery) return;

        const q = poiQuery.toLowerCase();
        let targetCenter = HOSTEL_COORDS;
        let targetZoom = 15.5;

        // Clear previous highlights
        document.querySelectorAll('.poi-label-el').forEach(el => el.classList.remove('poi-highlight'));

        const matchedPoi = recommendedPoisRef.current.find((p) => q.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(q));
        if (matchedPoi) {
            targetCenter = matchedPoi.coords as [number, number];
            targetZoom = 16.5;
            const el = document.querySelector(`[data-poi-label="${matchedPoi.name.toLowerCase()}"]`);
            if (el) el.classList.add('poi-highlight');
        } else if (siteConfig.features.showRegionalTrails && (q === THETH_VALBONA_MAP_QUERY || (q.includes('theth') && q.includes('valbona')))) {
            targetCenter = THETH_VALBONA_MIDPOINT_COORDS;
            targetZoom = 10.5;
            const theth = document.querySelector('[data-poi-label="theth drop off/pick up"]');
            const valbona = document.querySelector('[data-poi-label="valbona village"]');
            if (theth) theth.classList.add('poi-highlight');
            if (valbona) valbona.classList.add('poi-highlight');
        } else if (q === SHALA_RIVER_MAP_QUERY || (q.includes('shala') && q.includes('river'))) {
            targetCenter = SHALA_RIVER_MIDPOINT_COORDS;
            targetZoom = 10.5;
            const ferry = document.querySelector('[data-poi-label="komani lake ferry (shala & valbona)"]');
            const blini = document.querySelector('[data-poi-label="blini park (shala river trip stop)"]');
            if (ferry) ferry.classList.add('poi-highlight');
            if (blini) blini.classList.add('poi-highlight');
        } else if (q.includes("pedestrian") || q.includes("idromeno")) {
            targetCenter = PEDONALE_COORDS[1] as [number, number];
            targetZoom = 16.5;
        } else if (q.includes('hostel') || q === 'scodrinon') {
            const el = document.querySelector(`[data-poi-label="hostel"]`);
            if (el) el.classList.add('poi-highlight');
        }

        mapRef.current.flyTo({ center: targetCenter, zoom: targetZoom, speed: 1.2, curve: 1, essential: true });
    }, [poiQuery]);

    const toggleStyle = () => {
        if (!mapRef.current) return;
        const nextIsSatellite = !isSatellite;
        setIsSatellite(nextIsSatellite);
        isSatelliteRef.current = nextIsSatellite;
        mapRef.current.setStyle(
            nextIsSatellite
                ? SATELLITE_STYLE
                : STANDARD_STYLE
        );
    };

    const recenterOnHostel = () => {
        if (!mapRef.current) return;
        mapRef.current.flyTo({
            center: HOSTEL_COORDS,
            zoom: 15.5,
            pitch: 45,
            bearing: -17.6,
            speed: 1.2,
            curve: 1,
            essential: true
        });
    };

    return (
        <div className="absolute inset-0 h-full w-full overflow-hidden">
            <div ref={mapContainerRef} className="h-full w-full" />

            {/* Custom Map Controls */}
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                <button
                    onClick={recenterOnHostel}
                    title="Recenter on Hostel"
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-black/60 active:scale-95"
                >
                    <Home className="size-3 text-sky-400" strokeWidth={2.5} />
                    <span>Home</span>
                </button>

                <button
                    onClick={toggleStyle}
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-black/60 active:scale-95"
                >
                    <div className="size-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                    {isSatellite ? 'View Streets' : 'View Aerial'}
                </button>
            </div>

            {/* Map Legend - Hidden at regional zoom levels (< 11) using DOM manipulation */}
            <div id="map-legend" className="absolute bottom-4 left-4 z-10 flex flex-col gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md p-2.5 text-[9px] font-bold uppercase tracking-widest text-[var(--text-heading)] shadow-lg transition-opacity duration-500 opacity-100">
                <div className="flex items-center gap-3">
                    <div className="h-0.5 w-6 border-t border-dashed border-[var(--brand-primary)] opacity-90" />
                    <span>5 Minute Walk Area</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-1.5 w-6 rounded-full bg-[var(--brand-primary)]/40" />
                    <span>The Pedestrian Street</span>
                </div>

                {siteConfig.features.showRegionalTrails ? (
                    <div className="flex items-center gap-3">
                        <div className="h-0.5 w-6 border-t-[3.5px] border-dotted border-[#10b981] opacity-90" />
                        <span>Hiking Trail</span>
                    </div>
                ) : null}

                {siteConfig.features.showLocalPois ? <div className="my-1 h-px w-full bg-[var(--border)]" /> : null}

                {siteConfig.features.showLocalPois ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-[#10b981]" />
                            <span>Eat / Drink</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-[#0ea5e9]" />
                            <span>See / Do</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-[#f43f5e]" />
                            <span>Shop</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-[#64748b]" />
                            <span>Transit</span>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
