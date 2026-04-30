"use client";

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Home, AlertCircle, MapPin } from '@/lib/icon-registry';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Panel } from './ui/panel';
import { activeInstance } from '@/instances';
import { isLowEndDevice } from '@/lib/performance';
import { siteConfig } from '@/lib/site-data';

// --- Types ---
type MapboxMap = import('mapbox-gl').Map;
type MapboxGeoJSONData = import('mapbox-gl').GeoJSONSourceSpecification["data"];
type MapboxAnySourceData = import('mapbox-gl').AnySourceData;

interface MapPOI {
    name: string;
    category: string;
    coords: [number, number];
    minZoom?: number;
}

// --- Constants & Helpers (from location-map-inner) ---
const {
    hostelCoords: HOSTEL_COORDS,
    thethDropoffCoords: THETH_DROPOFF_COORDS,
    valbonaVillageCoords: VALBONA_VILLAGE_COORDS,
    komaniFerryCoords: KOMANI_FERRY_COORDS,
    bliniParkCoords: BLINI_PARK_COORDS,
    pedonaleCoords: PEDONALE_COORDS,
    queries,
    styles
} = activeInstance.mapConfig;

const THETH_VALBONA_MAP_QUERY = queries.thethValbona;
const SHALA_RIVER_MAP_QUERY = queries.shalaRiver;
const KOMANI_FERRY_MAP_QUERY = queries.komaniFerry;
const STANDARD_STYLE = styles.standard;
const SATELLITE_STYLE = styles.satellite;

const THETH_VALBONA_MIDPOINT_COORDS: [number, number] = [
    (THETH_DROPOFF_COORDS[0] + VALBONA_VILLAGE_COORDS[0]) / 2,
    (THETH_DROPOFF_COORDS[1] + VALBONA_VILLAGE_COORDS[1]) / 2,
];
const SHALA_RIVER_MIDPOINT_COORDS: [number, number] = [
    (KOMANI_FERRY_COORDS[0] + BLINI_PARK_COORDS[0]) / 2,
    (KOMANI_FERRY_COORDS[1] + BLINI_PARK_COORDS[1]) / 2,
];

const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isNarrow = window.innerWidth < 768;
    return hasTouch && isNarrow;
};

const shouldUseLiteMap = () => isLowEndDevice();

const getPreferredView = () => {
    if (shouldUseLiteMap()) {
        return { pitch: 0, bearing: 0 };
    }
    return { pitch: 45, bearing: -20 };
};

const createGeoJSONCircle = (center: [number, number], radiusInKm: number, points: number = 32) => {
    const coords = { latitude: center[1], longitude: center[0] };
    const ret = [];
    const distanceX = radiusInKm / (111.32 * Math.cos(coords.latitude * Math.PI / 180));
    const distanceY = radiusInKm / 110.574;

    for (let i = 0; i < points; i++) {
        const theta = (i / points) * (2 * Math.PI);
        const x = distanceX * Math.cos(theta);
        const y = distanceY * Math.sin(theta);
        ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return {
        type: 'FeatureCollection' as const,
        features: [{
            type: 'Feature' as const,
            properties: {},
            geometry: { type: 'Polygon' as const, coordinates: [ret] }
        }]
    };
};

const MAP_PIN_SVG = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"/>
    </svg>
`;

const getPoiColor = (category: string) => {
    switch (category) {
        case 'eat': return '#10b981';
        case 'see': return '#0ea5e9';
        case 'shop': return '#f43f5e';
        case 'transit': return '#64748b';
        default: return '#94a3b8';
    }
};

const applyLabelStyle = (el: HTMLElement, isMobile: boolean, overrides?: Partial<CSSStyleDeclaration>) => {
    el.style.padding = '1.5px 8px';
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
    el.style.backgroundColor = 'var(--glass-bg)';
    el.style.backdropFilter = 'blur(4px)';
    el.style.border = '1px solid var(--glass-border)';
    el.style.boxShadow = '0 4px 6px -1px var(--glass-shadow)';
    if (overrides) Object.assign(el.style, overrides);
};

const getLightPreset = () => document.documentElement.classList.contains('dark') ? 'night' : 'day';

const applyBasePreset = (map: MapboxMap) => {
    try {
        map.setConfigProperty('basemap', 'lightPreset', getLightPreset());
        map.setConfigProperty('basemap', 'show3dObjects', !shouldUseLiteMap());
    } catch { }
};

const applyCustomizations = (map: MapboxMap, trailGeoJson: MapboxGeoJSONData | null, showRegionalTrails: boolean) => {
    const style = map.getStyle();
    if (!style) return;

    const layers = style.layers;
    const labelLayerId = layers?.find(l => l.type === 'symbol' && l.layout?.['text-field'])?.id;

    layers?.forEach((layer) => {
        if (layer.id.includes('poi-label') || layer.id.includes('poi-icon') || layer.id.includes('poi')) {
            const currentFilter = map.getFilter(layer.id) || ['all'];
            map.setFilter(layer.id, [
                'all', currentFilter,
                ['!=', ['get', 'category_en'], 'Lodging'],
                ['!=', ['get', 'category_en'], 'Hotel'],
                ['!=', ['get', 'category_en'], 'Hostel'],
                ['!=', ['get', 'maki'], 'lodging'],
                ['!=', ['get', 'maki'], 'hotel'],
                ['!=', ['get', 'maki'], 'hostel'],
                ['!=', ['get', 'type'], 'lodging'],
                ['!=', ['get', 'type'], 'hotel'],
                ['!=', ['get', 'type'], 'hostel']
            ]);
        }
    });

    if (!map.getSource('pedonale-street')) {
        map.addSource('pedonale-street', {
            type: 'geojson',
            data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: PEDONALE_COORDS } }
        } as MapboxAnySourceData);
    }

    if (!map.getLayer('pedonale-line')) {
        map.addLayer({
            'id': 'pedonale-line', 'type': 'line', 'source': 'pedonale-street',
            'layout': { 'line-cap': 'round', 'line-join': 'round' },
            'paint': { 'line-color': '#0ea5e9', 'line-width': 10, 'line-opacity': 0.5 }
        }, labelLayerId);
    }

    if (!map.getSource('walk-radius')) {
        map.addSource('walk-radius', { 'type': 'geojson', 'data': createGeoJSONCircle(HOSTEL_COORDS, 0.45) });
    }

    if (!map.getLayer('walk-radius-outline')) {
        map.addLayer({
            'id': 'walk-radius-outline', 'type': 'line', 'source': 'walk-radius',
            'layout': {}, 'paint': { 'line-color': '#0284c7', 'line-width': 3.5, 'line-dasharray': [2, 2], 'line-opacity': 0.95 }
        }, labelLayerId);
    }

    if (showRegionalTrails && trailGeoJson && !map.getSource('theth-valbona-track')) {
        map.addSource('theth-valbona-track', { type: 'geojson', data: trailGeoJson });
    }

    if (showRegionalTrails && !map.getLayer('theth-valbona-line') && map.getSource('theth-valbona-track')) {
        map.addLayer({
            'id': 'theth-valbona-line', 'type': 'line', 'source': 'theth-valbona-track',
            'layout': { 'line-cap': 'round', 'line-join': 'round' },
            'paint': { 'line-color': '#10b981', 'line-width': 3.5, 'line-dasharray': [2, 1], 'line-opacity': 0.8 }
        }, labelLayerId);
    }

    if (map.getLayer('add-3d-buildings')) map.removeLayer('add-3d-buildings');
    const isSatelliteStyle = style.sprite?.includes('satellite') || style.name?.toLowerCase().includes('satellite');
    if (map.getSource('composite') && !isSatelliteStyle && !shouldUseLiteMap()) {
        map.addLayer({
            'id': 'add-3d-buildings', 'source': 'composite', 'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'], 'type': 'fill-extrusion', 'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
                'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
                'fill-extrusion-opacity': 0.6
            }
        }, labelLayerId);
    }
};

// --- Main Components ---

function MapSkeleton() {
    return (
        <Panel className="relative flex h-full min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-[var(--surface-dark)] border-none lg:min-h-full">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="size-16 animate-pulse rounded-full bg-[var(--brand-primary)]/20 flex items-center justify-center">
                    <MapPin className="size-8 text-[var(--brand-primary)] animate-bounce" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]/60 animate-pulse">Initializing Engine...</p>
            </div>
            <div className="absolute inset-0 border-[8px] border-[var(--surface-dark)]/50 pointer-events-none" />
        </Panel>
    );
}

function LocationMapInner({ accessToken, defaultPoi, variant = "local" }: { accessToken: string, defaultPoi?: string, variant?: "local" | "regional" }) {
    const searchParams = useSearchParams();
    const poiQuery = defaultPoi || searchParams?.get('poi') || '';
    const initialPoiQueryRef = useRef(poiQuery);
    const recommendedPoisRef = useRef<MapPOI[]>([]);
    const trailGeoJsonRef = useRef<MapboxGeoJSONData | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<MapboxMap | null>(null);
    const sensitiveMarkersRef = useRef<HTMLElement[]>([]);
    const [isSatellite, setIsSatellite] = useState(false);
    const [mapError, setMapError] = useState<string | null>(null);
    const isSatelliteRef = useRef(false);

    useEffect(() => {
        if (!mapContainerRef.current) return;
        import('mapbox-gl/dist/mapbox-gl.css');

        let moveThrottleId: any = null;
        let map: MapboxMap | null = null;
        let styleTag: HTMLStyleElement | null = null;
        const mobile = isMobileDevice();
        const themeObserver = new MutationObserver(() => {
            if (map && !isSatelliteRef.current) applyBasePreset(map);
        });
        let isCancelled = false;

        const initMap = async () => {
            try {
                const mapbox = (await import('mapbox-gl')).default;
                mapbox.prewarm();

                if (siteConfig.features.showLocalPois) {
                    recommendedPoisRef.current = (await activeInstance.loaders.loadPois()).recommendedPois as MapPOI[];
                }
                if (siteConfig.features.showRegionalTrails) {
                    trailGeoJsonRef.current = await activeInstance.loaders.loadTrailGeoJson() as MapboxGeoJSONData;
                }

                if (isCancelled || !mapContainerRef.current) return;

                const q = initialPoiQueryRef.current?.toLowerCase() || '';
                let initialCenter = HOSTEL_COORDS;
                let initialZoom = 15.5;

                if (q) {
                    const matchedPoi = recommendedPoisRef.current.find(p => q.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(q));
                    if (matchedPoi) {
                        initialCenter = matchedPoi.coords as [number, number];
                        initialZoom = 16.5;
                    } else if (siteConfig.features.showRegionalTrails && (q === THETH_VALBONA_MAP_QUERY || activeInstance.mapConfig.keywords.theth.every(k => q.includes(k)))) {
                        initialCenter = THETH_VALBONA_MIDPOINT_COORDS;
                        initialZoom = 11.0;
                    } else if (q === SHALA_RIVER_MAP_QUERY || activeInstance.mapConfig.keywords.shala.every(k => q.includes(k))) {
                        initialCenter = SHALA_RIVER_MIDPOINT_COORDS;
                        initialZoom = 10.0;
                    } else if (q === KOMANI_FERRY_MAP_QUERY || activeInstance.mapConfig.keywords.komani.every(k => q.includes(k))) {
                        initialCenter = KOMANI_FERRY_COORDS;
                        initialZoom = 13.0;
                    } else if (activeInstance.mapConfig.keywords.pedestrian.some(k => q.includes(k))) {
                        initialCenter = PEDONALE_COORDS[1] as [number, number];
                        initialZoom = 16.0;
                    }
                }

                mapbox.accessToken = accessToken;
                const preferredView = getPreferredView();
                const m = new mapbox.Map({
                    container: mapContainerRef.current, style: STANDARD_STYLE,
                    center: initialCenter, zoom: initialZoom,
                    pitch: preferredView.pitch, bearing: preferredView.bearing,
                    antialias: false, fadeDuration: mobile ? 0 : 300,
                    maxTileCacheSize: mobile ? 10 : 20, renderWorldCopies: false,
                });

                map = m;
                mapRef.current = m;
                m.addControl(new mapbox.NavigationControl({ showCompass: true }), 'bottom-right');
                m.addControl(new mapbox.FullscreenControl(), 'top-right');
                m.addControl(new mapbox.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-right');
                themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

                // Hostel Marker
                const el = document.createElement('div');
                el.style.display = 'flex'; el.style.flexDirection = 'column'; el.style.alignItems = 'center';
                el.style.cursor = 'pointer'; el.style.zIndex = '20'; el.style.position = 'relative';

                const floatingHead = document.createElement('div');
                floatingHead.style.display = 'flex'; floatingHead.style.flexDirection = 'column'; floatingHead.style.alignItems = 'center';
                floatingHead.style.animation = 'marker-float 3s ease-in-out infinite';

                const label = document.createElement('a');
                label.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.name + ' ' + siteConfig.address.addressLocality)}`;
                label.target = '_blank'; label.rel = 'noreferrer';
                applyLabelStyle(label, mobile, { marginBottom: '6px', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', border: '0.5px solid #0ea5e9' });
                label.classList.add('poi-label-el'); label.setAttribute('data-poi-label', 'hostel');
                if (!mobile) label.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';

                const mainText = document.createElement('div'); mainText.innerText = siteConfig.name;
                mainText.style.fontSize = '12px'; mainText.style.fontWeight = '700'; mainText.style.lineHeight = '1.2';
                const subText = document.createElement('div'); subText.innerText = 'click for directions';
                subText.style.fontSize = '9px'; subText.style.textTransform = 'uppercase'; subText.style.color = 'var(--text-muted)'; subText.style.lineHeight = '1.1';

                label.appendChild(mainText); label.appendChild(subText);
                floatingHead.appendChild(label);

                const circle = document.createElement('div');
                circle.className = 'marker-head'; circle.style.width = '20px'; circle.style.height = '20px';
                circle.style.backgroundColor = '#0ea5e9'; circle.style.borderRadius = '50%';
                circle.style.border = '2px solid white'; circle.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                floatingHead.appendChild(circle);

                const groundDot = document.createElement('div');
                groundDot.style.width = '8px'; groundDot.style.height = '4px'; groundDot.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
                groundDot.style.borderRadius = '50%'; groundDot.style.filter = 'blur(1px)'; groundDot.style.position = 'absolute'; groundDot.style.bottom = '0';

                el.appendChild(floatingHead); el.appendChild(groundDot);

                styleTag = document.createElement('style');
                styleTag.innerHTML = `
                    .marker-head { position: relative; }
                    .marker-head::after { content: ""; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border: 2px solid #0ea5e9; border-radius: 50%; animation: map-ping 2s infinite; opacity: 0; }
                    @keyframes marker-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                    @keyframes map-ping { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(3); opacity: 0; } }
                    .poi-marker-group { transition: opacity 0.3s ease-in-out; }
                    .zoom-hidden { opacity: 0 !important; pointer-events: none !important; }
                    .poi-highlight { outline: 2px solid #0ea5e9 !important; outline-offset: 2px; box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.2) !important; z-index: 50 !important; }
                    .mapboxgl-ctrl-scale { position: absolute !important; bottom: 12px !important; right: 200px !important; margin: 0 !important; border-radius: 4px; background: var(--glass-bg); backdrop-filter: blur(4px); border: 1px solid var(--glass-border); padding: 2px 6px; }
                `;
                document.head.appendChild(styleTag);
                new mapbox.Marker({ element: el, anchor: 'bottom' }).setLngLat(HOSTEL_COORDS).addTo(m);

                // POIs
                recommendedPoisRef.current.forEach(poi => {
                    const poiEl = document.createElement('div');
                    poiEl.className = 'poi-marker-group';
                    if (poi.minZoom) {
                        poiEl.classList.add('zoom-sensitive');
                        poiEl.setAttribute('data-min-zoom', poi.minZoom.toString());
                    }
                    poiEl.style.display = 'flex'; poiEl.style.flexDirection = 'column'; poiEl.style.alignItems = 'center'; poiEl.style.cursor = 'pointer';

                    const poiCircle = document.createElement('div');
                    poiCircle.innerHTML = MAP_PIN_SVG; poiCircle.style.width = '20px'; poiCircle.style.height = '20px';
                    poiCircle.style.color = getPoiColor(poi.category); poiCircle.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))';

                    const poiLabel = document.createElement('a');
                    poiLabel.href = `https://www.google.com/maps/search/?api=1&query=${poi.coords[1]},${poi.coords[0]}`;
                    poiLabel.target = '_blank'; poiLabel.rel = 'noreferrer'; poiLabel.innerText = poi.name;
                    applyLabelStyle(poiLabel, mobile); poiLabel.classList.add('poi-label-el'); poiLabel.setAttribute('data-poi-label', poi.name.toLowerCase());

                    poiEl.appendChild(poiLabel); poiEl.appendChild(poiCircle);
                    if (poi.minZoom && m.getZoom() < poi.minZoom) poiEl.classList.add('zoom-hidden');
                    if (poi.minZoom) sensitiveMarkersRef.current.push(poiEl);
                    new mapbox.Marker({ element: poiEl, anchor: 'bottom' }).setLngLat(poi.coords as [number, number]).addTo(m);
                });

                m.on('move', () => {
                    if (moveThrottleId !== null) return;
                    moveThrottleId = requestAnimationFrame(() => {
                        moveThrottleId = null;
                        const zoom = m.getZoom();
                        sensitiveMarkersRef.current.forEach(e => {
                            const minZ = parseFloat(e.getAttribute('data-min-zoom') || '0');
                            e.classList.toggle('zoom-hidden', zoom < minZ);
                        });
                        const legend = document.getElementById('map-legend');
                        if (legend) {
                            legend.classList.toggle('opacity-0', zoom <= 11);
                            legend.classList.toggle('pointer-events-none', zoom <= 11);
                            legend.classList.toggle('opacity-100', zoom > 11);
                        }
                    });
                });

                m.on('load', () => {
                    const preferredView = getPreferredView();
                    m.flyTo({ 
                        center: initialCenter, 
                        zoom: initialZoom, 
                        pitch: preferredView.pitch,
                        bearing: preferredView.bearing,
                        speed: 0.8, 
                        curve: 1, 
                        essential: true 
                    });
                    applyBasePreset(m);
                    applyCustomizations(m, trailGeoJsonRef.current, siteConfig.features.showRegionalTrails);
                    setTimeout(() => mapRef.current?.resize(), 100);
                });

                m.on('style.load', () => {
                    if (!isSatelliteRef.current) applyBasePreset(m);
                    applyCustomizations(m, trailGeoJsonRef.current, siteConfig.features.showRegionalTrails);
                    setTimeout(() => mapRef.current?.resize(), 50);
                });
            } catch (err) {
                console.error('Failed to initialize map:', err);
                setMapError(err instanceof Error ? err.message : 'WebGL failure');
            }
        };

        void initMap();

        return () => {
            isCancelled = true;
            if (moveThrottleId) cancelAnimationFrame(moveThrottleId);
            sensitiveMarkersRef.current = [];
            themeObserver.disconnect();
            if (map) map.remove();
            if (styleTag && document.head.contains(styleTag)) document.head.removeChild(styleTag);
        };
    }, [accessToken]);

    useEffect(() => {
        if (!siteConfig.features.showLocalExperienceMap || !mapRef.current || !poiQuery) return;
        const q = poiQuery.toLowerCase();
        let targetCenter = HOSTEL_COORDS; let targetZoom = 15.5;
        document.querySelectorAll('.poi-label-el').forEach(el => el.classList.remove('poi-highlight'));

        const matchedPoi = recommendedPoisRef.current.find(p => q.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(q));
        if (matchedPoi) {
            targetCenter = matchedPoi.coords as [number, number]; targetZoom = 16.5;
            document.querySelector(`[data-poi-label="${matchedPoi.name.toLowerCase()}"]`)?.classList.add('poi-highlight');
        } else if (siteConfig.features.showRegionalTrails && (q === THETH_VALBONA_MAP_QUERY || activeInstance.mapConfig.keywords.theth.every(k => q.includes(k)))) {
            targetCenter = THETH_VALBONA_MIDPOINT_COORDS; targetZoom = 11.5;
            document.querySelector('[data-poi-label="theth drop off/pick up"]')?.classList.add('poi-highlight');
            document.querySelector('[data-poi-label="valbona village"]')?.classList.add('poi-highlight');
        } else if (q === SHALA_RIVER_MAP_QUERY || activeInstance.mapConfig.keywords.shala.every(k => q.includes(k))) {
            targetCenter = SHALA_RIVER_MIDPOINT_COORDS; targetZoom = 10.5;
            document.querySelector('[data-poi-label="komani lake ferry (shala & valbona)"]')?.classList.add('poi-highlight');
            document.querySelector('[data-poi-label="blini park (shala river trip stop)"]')?.classList.add('poi-highlight');
        } else if (q === KOMANI_FERRY_MAP_QUERY || activeInstance.mapConfig.keywords.komani.every(k => q.includes(k))) {
            targetCenter = KOMANI_FERRY_COORDS; targetZoom = 13.5;
            document.querySelector('[data-poi-label="komani lake ferry (shala & valbona)"]')?.classList.add('poi-highlight');
        } else if (activeInstance.mapConfig.keywords.pedestrian.some(k => q.includes(k))) {
            targetCenter = PEDONALE_COORDS[1] as [number, number]; targetZoom = 16.5;
        } else if (activeInstance.mapConfig.keywords.property.some(k => q.includes(k)) || q === siteConfig.shortName.toLowerCase()) {
            document.querySelector('[data-poi-label="hostel"]')?.classList.add('poi-highlight');
        }
        const preferredView = getPreferredView();
        mapRef.current.flyTo({ 
            center: targetCenter, 
            zoom: targetZoom, 
            pitch: preferredView.pitch,
            bearing: preferredView.bearing,
            speed: 1.2, 
            curve: 1, 
            essential: true 
        });
    }, [poiQuery]);

    const toggleStyle = () => {
        if (!mapRef.current) return;
        const nextIsSatellite = !isSatellite;
        setIsSatellite(nextIsSatellite);
        isSatelliteRef.current = nextIsSatellite;
        mapRef.current.setStyle(nextIsSatellite ? SATELLITE_STYLE : STANDARD_STYLE);
    };

    if (mapError) return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 p-8 text-center dark:bg-gray-900">
            <AlertCircle className="mb-4 size-12 text-red-500" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">Map Unavailable</h3>
            <p className="mb-4 max-w-md text-sm text-gray-600 dark:text-gray-400">{mapError}</p>
        </div>
    );

    return (
        <div className="absolute inset-0 h-full w-full overflow-hidden">
            <div ref={mapContainerRef} className="h-full w-full" />
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                <button
                    onClick={() => {
                        const isRegional = variant === "regional";
                        const preferredView = getPreferredView();
                        mapRef.current?.flyTo({
                            center: isRegional ? THETH_VALBONA_MIDPOINT_COORDS : HOSTEL_COORDS,
                            zoom: isRegional ? 11.0 : 15.0,
                            pitch: preferredView.pitch,
                            bearing: preferredView.bearing,
                            speed: 1.2,
                            curve: 1,
                            essential: true
                        });
                    }}
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-black/60 active:scale-95"
                >
                    <Home className="size-3 text-sky-400" strokeWidth={2.5} /><span>Home</span>
                </button>
                <button onClick={toggleStyle} className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-black/60 active:scale-95">
                    <div className="size-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />{isSatellite ? 'View Streets' : 'View Aerial'}
                </button>
            </div>
            <div id="map-legend" className="absolute bottom-4 left-4 z-10 flex flex-col gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md p-2.5 text-[9px] font-bold uppercase tracking-widest text-[var(--text-heading)] shadow-lg transition-opacity duration-500 opacity-100">
                {variant === "local" && (
                    <>
                        <div className="flex items-center gap-3"><div className="h-0.5 w-6 border-t border-dashed border-[var(--brand-primary)] opacity-90" /><span>5 Minute Walk Area</span></div>
                        <div className="flex items-center gap-3"><div className="h-1.5 w-6 rounded-full bg-[var(--brand-primary)]/40" /><span>The Pedestrian Street</span></div>
                    </>
                )}
                {variant === "regional" && siteConfig.features.showRegionalTrails && (
                    <div className="flex items-center gap-3"><div className="h-0.5 w-6 border-t-[3.5px] border-dotted border-[#10b981] opacity-90" /><span>Hiking Trail</span></div>
                )}
            </div>
        </div>
    );
}

export function LocationMap({ defaultPoi, variant = "local" }: { defaultPoi?: string, variant?: "local" | "regional" }) {
    const isEnabled = siteConfig.features.showLocalExperienceMap;
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const poiQuery = searchParams?.get("poi") ?? "";

    const isLowEnd = isLowEndDevice();
    const isContactPage = pathname === '/contact';
    const forceManualLoad = isLowEnd || isContactPage;

    useEffect(() => {
        if (!isEnabled || forceManualLoad) return;
        const node = containerRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShouldLoad(true);
                observer.disconnect();
            }
        }, { rootMargin: '200px 0px', threshold: 0.15 });
        observer.observe(node);
        return () => observer.disconnect();
    }, [isEnabled, forceManualLoad]);

    if (!isEnabled) return null;
    if (!token) return (
        <Panel className="flex h-full min-h-[400px] flex-col items-center justify-center bg-[var(--muted)]/50 p-8 text-center border-dashed border-2 border-[var(--border)]">
            <MapPin className="size-12 mb-4 text-[var(--text-muted)]" />
            <h3 className="text-xl font-heading text-[var(--text-heading)]">Map Configuration Required</h3>
            <p className="mt-2 text-sm text-[var(--text-body-subtle)] max-w-xs">Add <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to <code>.env.local</code>.</p>
        </Panel>
    );

    const shouldRenderMap = shouldLoad || Boolean(poiQuery) || Boolean(defaultPoi);

    return (
        <div ref={containerRef} className="relative h-full w-full">
            {shouldRenderMap ? (
                <Suspense fallback={<MapSkeleton />}>
                    <LocationMapInner accessToken={token} defaultPoi={defaultPoi} variant={variant} />
                </Suspense>
            ) : forceManualLoad ? (
                <MapPreview
                    mapsHref={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.name + ' ' + siteConfig.location)}`}
                    onLoad={() => setShouldLoad(true)}
                />
            ) : (
                <MapSkeleton />
            )}
        </div>
    );
}

function MapPreview({ mapsHref, onLoad }: { mapsHref: string; onLoad: () => void }) {
    return (
        <Panel className="relative flex h-full min-h-[400px] w-full flex-col items-center justify-center overflow-hidden border-none bg-[var(--surface-dark)] lg:min-h-full">
            <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.4),rgba(15,23,42,0.9))]" />

            <div className="relative z-10 flex max-w-md flex-col items-center gap-4 px-6 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-sky-500/15 ring-1 ring-sky-400/20">
                    <MapPin className="size-8 text-sky-400" />
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400/70">
                        Interactive Map
                    </p>
                    <h3 className="text-xl font-semibold text-white">
                        Explore the local area
                    </h3>
                    <p className="text-sm text-slate-300">
                        We load our interactive map on demand to keep your experience fast and smooth.
                    </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={onLoad}
                        className="rounded-full bg-[var(--brand-primary)] px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                    >
                        Load Interactive Map
                    </button>
                    <Link
                        href={mapsHref}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
                    >
                        Open Google Maps
                    </Link>
                </div>
            </div>

            <div className="absolute inset-0 border-[8px] border-[var(--surface-dark)]/50 pointer-events-none" />
        </Panel>
    );
}
