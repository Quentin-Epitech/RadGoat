import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Radar } from '../types/radar';
import { getRadarColor } from '../utils/radarColors';

interface RadarMapProps {
  radars: Radar[];
}

export const RadarMap: React.FC<RadarMapProps> = ({ radars }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on France
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
      dragging: true,
      touchZoom: true
    }).setView([46.603354, 1.888334], 6);
    mapInstanceRef.current = map;

    // Add modern CartoDB tiles (similar to Google Maps style)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors, © CartoDB',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Add radars as markers
    radars.forEach((radar) => {
      const color = getRadarColor(radar.vma);
      
      // Create custom icon with modern style
      const icon = L.divIcon({
        className: 'custom-radar-marker',
        html: `<div style="
          background-color: ${color};
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          cursor: pointer;
          transition: all 0.2s ease;
        "></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([radar.latitude, radar.longitude], { icon })
        .addTo(map);

      // Add popup with radar information (modern style)
      const popupContent = `
        <div class="p-3 min-w-[250px]">
          <div class="flex items-center mb-3">
            <div style="
              background-color: ${color};
              width: 16px;
              height: 16px;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 1px 3px rgba(0,0,0,0.3);
              margin-right: 8px;
            "></div>
            <h3 class="font-bold text-lg text-gray-800">Radar ${radar.numero}</h3>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Type:</span>
              <span class="font-medium text-gray-800">${radar.type}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">VMA:</span>
              <span class="font-semibold text-blue-600">${radar.vma} km/h</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Mise en service:</span>
              <span class="font-medium text-gray-800">${radar.dateMiseEnService}</span>
            </div>
            <div class="pt-2 border-t border-gray-200">
              <div class="text-xs text-gray-500">
                Position: ${radar.latitude.toFixed(5)}, ${radar.longitude.toFixed(5)}
              </div>
            </div>
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [radars]);

  return <div ref={mapRef} className="w-full h-screen" />;
};