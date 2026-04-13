"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LocationMapInnerProps {
    accessToken: string;
}

const HOSTEL_COORDS: [number, number] = [19.51698538503564, 42.06928812985387]; // [lng, lat]
const BUS_STATION_COORDS: [number, number] = [19.512929288055442, 42.06755637830981];
const PEDONALE_COORDS: [number, number][] = [
    [19.513800410509983, 42.067007048478274],
    [19.514691128164753, 42.06795226804246],
    [19.51697176304084, 42.06913341207323],
    [19.5171140522808, 42.069314649661514]
];

const RECOMMENDED_POIS = [
    { name: 'Fontana', coords: [19.51683043811039, 42.068970393417366, 0], category: 'eat', minZoom: 15 },
    { name: 'Puri', coords: [19.51009801624253, 42.06929457675185, 0], category: 'eat', minZoom: 13 },
    { name: 'Traditional Food', coords: [19.51465274620761, 42.0672268599382, 0], category: 'eat', minZoom: 13 },
    { name: 'Ristorante Montalcino', coords: [19.51331291568257, 42.06797338188613, 0], category: 'eat', minZoom: 13 },
    { name: 'Venetian Art Mask Factory', coords: [19.52961397179209, 42.08179583849546, 0], category: 'see', minZoom: 10 },
    { name: 'Rozafa Castle', coords: [19.493844659339743, 42.04664614803619, 0], category: 'see', minZoom: 10 },
    { name: 'Mesi Bridge', coords: [19.57507048757086, 42.114467845122725, 0], category: 'see', minZoom: 9 },
    { name: 'Shiroka Village', coords: [19.4574742901822, 42.05937487786602, 0], category: 'see', minZoom: 9 },
    { name: 'Lonely Tree Hike', coords: [19.468276251483733, 42.04246677134261, 0], category: 'see', minZoom: 9 },
    { name: 'Theth Return Bus Location)', coords: [19.772315376603874, 42.39677313338882, 0], category: 'transit', minZoom: 6 }
];

// Helper to generate a Geographical circle for the 5-minute walk radius
const createGeoJSONCircle = (center: [number, number], radiusInKm: number, points: number = 64) => {
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

export default function LocationMapInner({ accessToken }: LocationMapInnerProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [isSatellite, setIsSatellite] = React.useState(false);
    const [currentZoom, setCurrentZoom] = React.useState(14);

    // Reusable function to apply our "Boutique" customizations
    const applyCustomizations = (map: mapboxgl.Map) => {
        const layers = map.getStyle().layers;
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
                    'line-width': 1.5,
                    'line-dasharray': [2, 2],
                    'line-opacity': 0.8
                }
            }, labelLayerId);
        }

        // 3. 3D BUILDINGS: Add extrusions (STREETS ONLY)
        const isSatelliteStyle = map.getStyle().sprite?.includes('satellite') || map.getStyle().name?.toLowerCase().includes('satellite');

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

        mapboxgl.accessToken = accessToken;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: HOSTEL_COORDS,
            zoom: 13,
            pitch: 45,
            bearing: -17.6,
            antialias: true
        });

        mapRef.current = map;

        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');
        map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

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
        label.style.marginBottom = '6px';
        label.style.padding = '6px 14px';
        label.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        label.style.backdropFilter = 'blur(4px)';
        label.style.color = '#0f172a';
        label.style.borderRadius = '8px';
        label.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
        label.style.whiteSpace = 'nowrap';
        label.style.border = '0.5px solid #0ea5e9';
        label.style.textDecoration = 'none';
        label.style.display = 'flex';
        label.style.flexDirection = 'column';
        label.style.alignItems = 'center';
        label.style.gap = '1px';

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
        busLabel.style.marginBottom = '4px';
        busLabel.style.padding = '4px 10px';
        busLabel.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        busLabel.style.backdropFilter = 'blur(4px)';
        busLabel.style.color = '#0f172a'; // slate-900
        busLabel.style.fontSize = '10px';
        busLabel.style.fontWeight = '600';
        busLabel.style.borderRadius = '6px';
        busLabel.style.whiteSpace = 'nowrap';
        busLabel.style.border = '0.5px solid white';
        busLabel.style.textDecoration = 'none';
        busLabel.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';

        busEl.appendChild(busLabel);
        busEl.appendChild(busCircle);
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
            poiLabel.style.marginBottom = '4px';
            poiLabel.style.padding = '3px 8px';
            poiLabel.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            poiLabel.style.backdropFilter = 'blur(4px)';
            poiLabel.style.color = '#0f172a';
            poiLabel.style.fontSize = '9px';
            poiLabel.style.fontWeight = '600';
            poiLabel.style.borderRadius = '4px';
            poiLabel.style.whiteSpace = 'nowrap';
            poiLabel.style.textDecoration = 'none';
            poiLabel.style.border = '1px solid rgba(226, 232, 240, 0.5)';
            poiLabel.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.05)';
            poiLabel.style.display = 'flex';
            poiLabel.style.flexDirection = 'column';
            poiLabel.style.alignItems = 'center';
            poiLabel.style.gap = '1px';

            poiEl.appendChild(poiLabel);
            poiEl.appendChild(poiCircle);

            // Set initial visibility
            const initialZoom = map.getZoom();
            if ((poi as any).minZoom && initialZoom < (poi as any).minZoom) {
                poiEl.classList.add('zoom-hidden');
            }

            new mapboxgl.Marker({ element: poiEl, anchor: 'bottom' }).setLngLat(poi.coords as [number, number]).addTo(map);
        });

        // Add move listener to toggle sensitive markers reliably
        map.on('move', () => {
            const zoom = map.getZoom();
            setCurrentZoom(zoom);

            const sensitiveMarkers = document.querySelectorAll('.zoom-sensitive');
            sensitiveMarkers.forEach(m => {
                const el = m as HTMLElement;
                const minZoom = parseFloat(el.getAttribute('data-min-zoom') || '0');
                el.classList.toggle('zoom-hidden', zoom < minZoom);
            });
        });

        map.on('load', () => {
            map.flyTo({ center: HOSTEL_COORDS, zoom: 15.5, speed: 0.8, curve: 1, essential: true });
            applyCustomizations(map);

            // Force a resize calculation after the initial fly-to and parent layout stabilization
            setTimeout(() => {
                if (mapRef.current) mapRef.current.resize();
            }, 100);
        });

        // Crucial: Re-apply customizations whenever the style is changed
        map.on('style.load', () => {
            applyCustomizations(map);

            // Re-calculate size after style swap to prevent 'gray box' issues
            setTimeout(() => {
                if (mapRef.current) mapRef.current.resize();
            }, 50);
        });

        return () => {
            map.remove();
            document.head.removeChild(style);
        };
    }, [accessToken]);

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
                className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-black/60 active:scale-95"
            >
                <div className="size-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                {isSatellite ? 'View Streets' : 'View Satellite'}
            </button>

            {/* Map Legend - Hidden at regional zoom levels (< 11) */}
            <div className={`absolute bottom-4 left-4 z-10 flex flex-col gap-2 rounded-xl border border-slate-200 bg-white/40 p-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-900 shadow-lg backdrop-blur-md transition-opacity duration-500 ${currentZoom <= 11 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
