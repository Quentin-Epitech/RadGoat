export function getRadarColor(vma: number): string {
  if (vma <= 50) return '#22c55e'; // Green for low speed
  if (vma <= 70) return '#eab308'; // Yellow for medium speed
  if (vma <= 90) return '#f97316'; // Orange for high speed
  if (vma <= 110) return '#ef4444'; // Red for very high speed
  return '#8b5cf6'; // Purple for highway speed
}

export function getRadarColorName(vma: number): string {
  if (vma <= 50) return 'Vert (≤50 km/h)';
  if (vma <= 70) return 'Jaune (51-70 km/h)';
  if (vma <= 90) return 'Orange (71-90 km/h)';
  if (vma <= 110) return 'Rouge (91-110 km/h)';
  return 'Violet (>110 km/h)';
}