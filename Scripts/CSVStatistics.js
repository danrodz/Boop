/**
  {
    "api": 1,
    "name": "CSV Statistics",
    "description": "Calculate statistics from CSV data",
    "author": "Boop",
    "icon": "chart.bar",
    "tags": "csv,statistics,analysis"
  }
**/
function main(state) {
  const lines = state.text.trim().split('\n');
  if (lines.length < 2) { state.postError("Need header and data rows"); return; }
  
  const headers = lines[0].split(',');
  const data = lines.slice(1).map(line => line.split(',').map(v => parseFloat(v)));
  
  const stats = headers.map((header, col) => {
    const values = data.map(row => row[col]).filter(v => !isNaN(v));
    if (values.length === 0) return header + ": N/A";
    
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    const sorted = values.sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    
    return header + ":\n  Mean: " + mean.toFixed(2) + "\n  Median: " + median + "\n  Min: " + min + "\n  Max: " + max;
  });
  
  state.text = stats.join('\n\n');
}