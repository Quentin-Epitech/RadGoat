import React, { useState, useEffect } from 'react';
import { RadarMap } from './components/RadarMap';
import { MapLegend } from './components/MapLegend';
import { RadarStats } from './components/RadarStats';
import { LoadingSpinner } from './components/LoadingSpinner';
import { parseCSVData } from './utils/csvParser';
import { Radar } from './types/radar';

function App() {
  const [radars, setRadars] = useState<Radar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(true);
  const [showLegend, setShowLegend] = useState(true);

  useEffect(() => {
    const loadRadarData = async () => {
      try {
        const response = await fetch('/jeu-de-donnees-liste-des-radars-fixes-en-france-2024-.csv');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        
        const csvText = await response.text();
        const parsedRadars = parseCSVData(csvText);
        
        if (parsedRadars.length === 0) {
          throw new Error('Aucune donnée de radar valide trouvée');
        }
        
        setRadars(parsedRadars);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    loadRadarData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <RadarMap radars={radars} />
      {showStats && <RadarStats radars={radars} onToggle={() => setShowStats(false)} />}
      {showLegend && <MapLegend onToggle={() => setShowLegend(false)} />}
      
      {!showStats && (
        <button
          onClick={() => setShowStats(true)}
          className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg z-[1000] hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Statistiques
        </button>
      )}
      
      {!showLegend && (
        <button
          onClick={() => setShowLegend(true)}
          className="absolute top-4 right-4 bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg z-[1000] hover:bg-green-700 transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
          </svg>
          Légende
        </button>
      )}
    </div>
  );
}

export default App;