import { Radar } from '../types/radar';

export function parseCSVData(csvText: string): Radar[] {
  const lines = csvText.split('\n');
  const radars: Radar[] = [];
  
  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const columns = line.split(';');
    if (columns.length >= 6) {
      const latitude = parseFloat(columns[3]);
      const longitude = parseFloat(columns[4]);
      const vma = parseInt(columns[5]);
      
      // Only add radars with valid coordinates and VMA
      if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(vma) && vma > 0) {
        radars.push({
          numero: columns[0],
          type: columns[1],
          dateMiseEnService: columns[2],
          latitude,
          longitude,
          vma
        });
      }
    }
  }
  
  return radars;
}