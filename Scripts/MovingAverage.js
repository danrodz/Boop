/**
  {
    "api": 1,
    "name": "Moving Average",
    "description": "Calculate moving average (format: data\nwindow_size)",
    "author": "Boop",
    "icon": "chart.line.uptrend.xyaxis",
    "tags": "moving,average,statistics"
  }
**/
function main(state) {
  const lines = state.text.trim().split('\n');
  const numbers = lines[0].split(/[,\s]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
  const window = parseInt(lines[1]) || 3;
  
  if (numbers.length < window) { state.postError("Not enough data points"); return; }
  
  const ma = [];
  for (let i = 0; i <= numbers.length - window; i++) {
    const windowData = numbers.slice(i, i + window);
    const avg = windowData.reduce((a, b) => a + b, 0) / window;
    ma.push(avg.toFixed(2));
  }
  
  state.text = "Window size: " + window + "\nMoving averages:\n" + ma.join(', ');
}