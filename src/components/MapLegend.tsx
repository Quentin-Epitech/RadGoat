import React from 'react';
import { getRadarColor, getRadarColorName } from '../utils/radarColors';
import { X } from 'lucide-react';

const speedRanges = [50, 70, 90, 110, 130];

interface MapLegendProps {
  onToggle: () => void;
}

export const MapLegend: React.FC<MapLegendProps> = ({ onToggle }) => {
  return (
    <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000] max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg text-gray-800">Légende</h3>
        <button
          onClick={onToggle}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          title="Masquer la légende"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        {speedRanges.map((speed) => (
          <div key={speed} className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: getRadarColor(speed) }}
            />
            <span className="text-sm text-gray-700">
              {getRadarColorName(speed)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          Cliquez sur un radar pour voir ses détails
        </p>
      </div>
    </div>
  );
};