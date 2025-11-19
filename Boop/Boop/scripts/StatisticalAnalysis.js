/**
  {
    "api": 1,
    "name": "Statistical Analysis",
    "description": "Calculate mean, median, mode, standard deviation from numbers",
    "author": "Boop",
    "icon": "chart.bar",
    "tags": "statistics,math,mean,median,mode,stddev"
  }
**/

function main(state) {
  try {
    const numbers = state.text.split(/[\s,\n]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (numbers.length === 0) {
      state.postError("No valid numbers found");
      return;
    }

    // Mean
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;

    // Median
    const sorted = numbers.slice().sort((a, b) => a - b);
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

    // Mode
    const frequency = {};
    numbers.forEach(n => frequency[n] = (frequency[n] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(k => frequency[k] === maxFreq);
    const mode = modes.length === numbers.length ? 'No mode' : modes.join(', ');

    // Standard Deviation
    const variance = numbers.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / numbers.length;
    const stdDev = Math.sqrt(variance);

    // Range
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const range = max - min;

    const result = [
      `Count: ${numbers.length}`,
      `Mean: ${mean.toFixed(2)}`,
      `Median: ${median.toFixed(2)}`,
      `Mode: ${mode}`,
      `Std Dev: ${stdDev.toFixed(2)}`,
      `Variance: ${variance.toFixed(2)}`,
      `Min: ${min}`,
      `Max: ${max}`,
      `Range: ${range}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error calculating statistics: " + error.message);
  }
}
