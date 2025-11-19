/**
  {
    "api": 1,
    "name": "Data Normalizer",
    "description": "Normalize data to 0-1 range (min-max scaling)",
    "author": "Boop",
    "icon": "slider.horizontal.3",
    "tags": "normalize,scale,statistics"
  }
**/
function main(state) {
  const numbers = state.text.split(/[,\s]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
  if (numbers.length < 2) { state.postError("Need at least 2 numbers"); return; }
  
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  const range = max - min;
  
  const normalized = numbers.map(n => ((n - min) / range).toFixed(4));
  
  state.text = "Original range: [" + min + ", " + max + "]\nNormalized to: [0, 1]\n\nData: " + normalized.join(', ');
}