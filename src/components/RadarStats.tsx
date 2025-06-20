import React from 'react';
import { Radar } from '../types/radar';
import { BarChart3, MapPin, Calendar, X } from 'lucide-react';

interface RadarStatsProps {
  radars: Radar[];
  onToggle: () => void;
}

export const RadarStats: React.FC<RadarStatsProps> = ({ radars, onToggle }) => {
  const totalRadars = radars.length;
  const avgSpeed = Math.round(radars.reduce((sum, radar) => sum + radar.vma, 0) / totalRadars);
  
  const speedDistribution = radars.reduce((acc, radar) => {
    if (radar.vma <= 50) acc.low++;
    else if (radar.vma <= 70) acc.medium++;
    else if (radar.vma <= 90) acc.high++;
    else if (radar.vma <= 110) acc.veryHigh++;
    else acc.highway++;
    return acc;
  }, { low: 0, medium: 0, high: 0, veryHigh: 0, highway: 0 });

  const typeDistribution = radars.reduce((acc, radar) => {
    acc[radar.type] = (acc[radar.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000] max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg text-gray-800 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Statistiques
        </h3>
        <button
          onClick={onToggle}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          title="Masquer les statistiques"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Total radars:
          </span>
          <span className="font-semibold text-blue-600">{totalRadars.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">VMA moyenne:</span>
          <span className="font-semibold text-green-600">{avgSpeed} km/h</span>
        </div>
        
        <div className="border-t pt-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Répartition par vitesse:</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>≤50 km/h:</span>
              <span className="text-green-600">{speedDistribution.low}</span>
            </div>
            <div className="flex justify-between">
              <span>51-70 km/h:</span>
              <span className="text-yellow-600">{speedDistribution.medium}</span>
            </div>
            <div className="flex justify-between">
              <span>71-90 km/h:</span>
              <span className="text-orange-600">{speedDistribution.high}</span>
            </div>
            <div className="flex justify-between">
              <span>91-110 km/h:</span>
              <span className="text-red-600">{speedDistribution.veryHigh}</span>
            </div>
            <div className="flex justify-between">
              <span>{'>'}110 km/h:</span>
              <span className="text-purple-600">{speedDistribution.highway}</span>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Types principaux:</h4>
          <div className="space-y-1 text-xs">
            {Object.entries(typeDistribution)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 3)
              .map(([type, count]) => (
                <div key={type} className="flex justify-between">
                  <span>{type}:</span>
                  <span className="text-blue-600">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};