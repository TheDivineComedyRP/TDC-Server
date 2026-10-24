import { Pos } from "../types/mp";

export interface Temple {
  name: string;
  city: string;
  cityPos: Pos;
  respawnPos: Pos;
  cell: string;
}

export const TEMPLES: Temple[] = [
  { name: "Temple of Talos",       city: "Windhelm",  cityPos: [135005.86, 34524.62, -12444.86],  respawnPos: [0.51, -2799.50, 48.04],    cell: "16785:Skyrim.esm" },
  { name: "Temple of Mara",        city: "Riften",    cityPos: [174348.34, -92004.24, 11127.22],  respawnPos: [-1412.79, 202.98, 64.00],  cell: "16bd7:Skyrim.esm" },
  { name: "Temple of Kynareth",    city: "Whiterun",  cityPos: [19208.74, -7445.01, -3608.87],    respawnPos: [230.30, 282.97, 53.57],    cell: "165a7:Skyrim.esm" },
  { name: "Temple of the Divines", city: "Solitude",  cityPos: [-65931.38, 104374.64, -8431.31],  respawnPos: [1678.53, 1711.37, 0],      cell: "16a02:Skyrim.esm" },
  { name: "Temple of Dibella",     city: "Markarth",  cityPos: [-173158.03, 5372.76, -3349.08],   respawnPos: [-1861.36, -110.59, 77.18], cell: "16df3:Skyrim.esm" },
];


// Horizontal distance squared. The Z is intentionally ignored,
// We compare cities on the map, and altitude should not influence which is "closer".
function squareDistance(a: Pos, b: Pos): number {
  const dx = a[0] - b[0], dy = a[1] - b[1];
  return (dx * dx) + (dy * dy);
}

export function nearestTemple(from: Pos): Temple {
  let best = TEMPLES[0];
  let bestD = squareDistance(from, best.cityPos);

  for (const t of TEMPLES) {
    const d = squareDistance(from, t.cityPos)
    if (d < bestD) {
      bestD = d;
      best = t; 
    }
  }
  return best;
}