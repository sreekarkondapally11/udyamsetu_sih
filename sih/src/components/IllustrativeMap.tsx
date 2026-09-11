import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Users, Home, Target, Navigation, Layers, CheckCircle2 } from 'lucide-react';
import type { MarketReach } from '../types';

interface RealGPSMapProps {
  marketReach: MarketReach;
  locationName: string;
  mandal?: string;
  district?: string;
  state?: string;
  lat?: number;
  lng?: number;
}

// Fallback default coordinates (Hyderabad/Telangana region) if all geocoding fails
const DEFAULT_LAT = 17.9784; // Warangal default
const DEFAULT_LNG = 79.5941;

/**
 * Multi-tiered geocoding fallback for rural locations
 */
async function geocodeLocationHierarchy(
  village: string,
  mandal: string,
  district: string,
  state: string
): Promise<{ lat: number; lng: number; label: string } | null> {
  const attempts = [
    [village, mandal, district, state, 'India'],
    [village, district, state, 'India'],
    [mandal, district, state, 'India'],
    [district, state, 'India'],
    [district, 'India'],
    [state, 'India']
  ].map((parts) => parts.filter((p) => p && p.trim().length > 0).join(', '));

  // Remove duplicate query strings
  const uniqueQueries = Array.from(new Set(attempts));

  for (const query of uniqueQueries) {
    if (!query || query.length < 3) continue;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        if (!isNaN(lat) && !isNaN(lng)) {
          return {
            lat,
            lng,
            label: query
          };
        }
      }
    } catch (err) {
      console.warn(`Geocoding query failed for "${query}":`, err);
    }
  }

  return null;
}

export const IllustrativeMap: React.FC<RealGPSMapProps> = ({
  marketReach,
  locationName,
  mandal = '',
  district = '',
  state = '',
  lat: initialLat,
  lng: initialLng
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>({
    lat: initialLat || DEFAULT_LAT,
    lng: initialLng || DEFAULT_LNG
  });
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
  const [mapSourceText, setMapSourceText] = useState<string>('Live OpenStreetMap GPS Pin');

  // Initialize Leaflet Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [currentCoords.lat, currentCoords.lng],
        zoom: 11,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const customIcon = L.divIcon({
        className: 'custom-gps-pin',
        html: `
          <div style="
            background: #10b981;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 3px solid #ffffff;
            box-shadow: 0 4px 14px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34]
      });

      const marker = L.marker([currentCoords.lat, currentCoords.lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`<b>${locationName || 'Target Location'}</b><br/>${mandal} ${district}`).openPopup();
      markerRef.current = marker;

      const radiusMeters = (marketReach.radius || 10) * 1000;
      const circle = L.circle([currentCoords.lat, currentCoords.lng], {
        radius: radiusMeters,
        color: '#10b981',
        weight: 2.5,
        fillColor: '#10b981',
        fillOpacity: 0.15
      }).addTo(map);
      circleRef.current = circle;

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map view when coordinates or radius change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const { lat, lng } = currentCoords;

    map.flyTo([lat, lng], 11, { duration: 1.2 });

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
      markerRef.current.setPopupContent(`<b>${locationName || 'Target Location'}</b><br/>${mandal} ${district}`);
    }

    if (circleRef.current) {
      circleRef.current.setLatLng([lat, lng]);
      circleRef.current.setRadius((marketReach.radius || 10) * 1000);
    }
  }, [currentCoords, marketReach.radius]);

  // Execute multi-tier geocoding on location parameter change
  useEffect(() => {
    if (initialLat && initialLng) {
      setCurrentCoords({ lat: initialLat, lng: initialLng });
      setMapSourceText(`Exact User GPS: ${initialLat.toFixed(4)}°N, ${initialLng.toFixed(4)}°E`);
      return;
    }

    setIsGeocoding(true);
    geocodeLocationHierarchy(locationName, mandal, district, state).then((res) => {
      if (res) {
        setCurrentCoords({ lat: res.lat, lng: res.lng });
        setMapSourceText(`Geocoded GPS: ${res.lat.toFixed(4)}°N, ${res.lng.toFixed(4)}°E`);
      }
      setIsGeocoding(false);
    });
  }, [locationName, mandal, district, state, initialLat, initialLng]);

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden border border-emerald-900/60">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-emerald-800/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Navigation className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-extrabold text-lg text-white flex items-center gap-2">
              GPS OpenStreetMap Market Reach
            </h4>
            <div className="text-xs text-slate-300">
              Target: <strong className="text-emerald-300">{locationName || 'Village Cluster'}</strong> ({district ? `${district} Dist` : ''}, {marketReach.radius} km Radius)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {isGeocoding ? 'Locating GPS Coordinates...' : mapSourceText}
          </span>
        </div>
      </div>

      {/* Leaflet GPS OpenStreetMap Map Canvas */}
      <div className="relative h-80 w-full rounded-2xl border border-emerald-600/40 overflow-hidden shadow-inner my-4 z-10">
        <div ref={mapContainerRef} className="w-full h-full bg-slate-950" />

        {/* Floating GPS Info Overlay Badge */}
        <div className="absolute top-3 right-3 z-[400] bg-slate-900/90 text-emerald-300 text-xs px-3 py-1.5 rounded-xl border border-emerald-500/40 font-mono shadow-lg flex items-center gap-2 backdrop-blur-md">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Lat: <strong>{currentCoords.lat.toFixed(4)}°</strong> &bull; Lng: <strong>{currentCoords.lng.toFixed(4)}°</strong></span>
        </div>

        {/* Radius Legend Overlay Badge */}
        <div className="absolute bottom-3 left-3 z-[400] bg-slate-900/90 text-teal-300 text-xs px-3 py-1.5 rounded-xl border border-teal-500/40 font-mono shadow-lg flex items-center gap-1.5 backdrop-blur-md">
          <Layers className="w-3.5 h-3.5 text-teal-400" />
          <span>Coverage Circle: <strong className="text-white">{marketReach.radius} km</strong></span>
        </div>
      </div>

      {/* Market Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="bg-slate-800/80 border border-slate-700/80 p-3.5 rounded-2xl shadow">
          <div className="text-slate-400 text-xs font-medium flex items-center gap-1 mb-1">
            <Users className="w-3.5 h-3.5 text-emerald-400" /> Population
          </div>
          <div className="text-2xl font-black text-white">{marketReach.population.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 p-3.5 rounded-2xl shadow">
          <div className="text-slate-400 text-xs font-medium flex items-center gap-1 mb-1">
            <Home className="w-3.5 h-3.5 text-teal-400" /> Households
          </div>
          <div className="text-2xl font-black text-white">{marketReach.households.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 p-3.5 rounded-2xl shadow">
          <div className="text-slate-400 text-xs font-medium flex items-center gap-1 mb-1">
            <Target className="w-3.5 h-3.5 text-amber-400" /> Potential Buyers
          </div>
          <div className="text-2xl font-black text-emerald-300">{marketReach.potentialCustomers.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 p-3.5 rounded-2xl shadow">
          <div className="text-slate-400 text-xs font-medium flex items-center gap-1 mb-1">
            <MapPin className="w-3.5 h-3.5 text-sky-400" /> GPS Service Radius
          </div>
          <div className="text-2xl font-black text-white">{marketReach.radius} km</div>
        </div>
      </div>

    </div>
  );
};
