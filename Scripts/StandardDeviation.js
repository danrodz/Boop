/**
  {
    "api": 1,
    "name": "Standard Deviation",
    "description": "Calculate standard deviation",
    "author": "Boop",
    "icon": "chart.line.uptrend.xyaxis",
    "tags": "stddev,statistics,deviation"
  }
**/
function main(state) {
  const numbers = state.text.split(/[,\s]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
  if (numbers.length < 2) { state.postError("Need at least 2 numbers"); return; }
  
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  const variance = numbers.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / numbers.length;
  const stdDev = Math.sqrt(variance);
  const sampleStdDev = Math.sqrt(numbers.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / (numbers.length - 1));
  
  state.text = "Mean: " + mean.toFixed(2) + "\nVariance: " + variance.toFixed(2) + "\nStd Dev (population): " + stdDev.toFixed(2) + "\nStd Dev (sample): " + sampleStdDev.toFixed(2);
}