/**
  {
    "api": 1,
    "name": "Percentile Calculator",
    "description": "Calculate percentiles from data",
    "author": "Boop",
    "icon": "percent",
    "tags": "percentile,statistics"
  }
**/
function main(state) {
  const numbers = state.text.split(/[,\s]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
  if (numbers.length < 2) { state.postError("Need at least 2 numbers"); return; }
  
  const sorted = numbers.sort((a, b) => a - b);
  const p25 = sorted[Math.floor(sorted.length * 0.25)];
  const p50 = sorted[Math.floor(sorted.length * 0.50)];
  const p75 = sorted[Math.floor(sorted.length * 0.75)];
  const p90 = sorted[Math.floor(sorted.length * 0.90)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  const p99 = sorted[Math.floor(sorted.length * 0.99)];
  
  state.text = "25th percentile (Q1): " + p25 + "\n50th percentile (Median): " + p50 + "\n75th percentile (Q3): " + p75 + "\n90th percentile: " + p90 + "\n95th percentile: " + p95 + "\n99th percentile: " + p99;
}