/**
  {
    "api": 1,
    "name": "Correlation Calculator",
    "description": "Calculate Pearson correlation (format: x1,x2,x3...\ny1,y2,y3...)",
    "author": "Boop",
    "icon": "arrow.up.right",
    "tags": "correlation,pearson,statistics"
  }
**/
function main(state) {
  const lines = state.text.trim().split('\n');
  if (lines.length < 2) { state.postError("Need two rows of numbers"); return; }
  
  const x = lines[0].split(',').map(n => parseFloat(n));
  const y = lines[1].split(',').map(n => parseFloat(n));
  
  if (x.length !== y.length) { state.postError("Arrays must be same length"); return; }
  
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
  
  const r = (n * sumXY - sumX * sumY) / Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  state.text = "Pearson correlation (r): " + r.toFixed(4) + "\n\n" +
    (Math.abs(r) > 0.7 ? "Strong" : Math.abs(r) > 0.4 ? "Moderate" : "Weak") + " correlation";
}