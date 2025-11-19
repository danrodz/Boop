/**
  {
    "api": 1,
    "name": "Outlier Detector",
    "description": "Detect outliers using IQR method",
    "author": "Boop",
    "icon": "chart.dots.scatter",
    "tags": "outlier,statistics,iqr"
  }
**/
function main(state) {
  const numbers = state.text.split(/[,\s]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
  if (numbers.length < 4) { state.postError("Need at least 4 numbers"); return; }
  
  const sorted = numbers.slice().sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  
  const outliers = numbers.filter(n => n < lowerBound || n > upperBound);
  
  let result = "Q1: " + q1 + "\nQ3: " + q3 + "\nIQR: " + iqr.toFixed(2) + "\n";
  result += "Lower bound: " + lowerBound.toFixed(2) + "\nUpper bound: " + upperBound.toFixed(2) + "\n\n";
  result += "Outliers (" + outliers.length + "): " + (outliers.length > 0 ? outliers.join(', ') : 'None');
  
  state.text = result;
}