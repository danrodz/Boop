/**
  {
    "api": 1,
    "name": "Moving Average",
    "description": "Calculate moving average (input: numbers, then window size)",
    "author": "Boop",
    "icon": "waveform.path",
    "tags": "moving,average,statistics,smooth,data"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');
    const numbers = lines[0].split(/[\s,]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    const window = lines.length > 1 ? parseInt(lines[1]) : 3;

    if (numbers.length === 0) {
      state.postError("No valid numbers found");
      return;
    }

    if (window < 1 || window > numbers.length) {
      state.postError(`Window size must be between 1 and ${numbers.length}`);
      return;
    }

    const movingAvg = [];
    for (let i = 0; i <= numbers.length - window; i++) {
      const slice = numbers.slice(i, i + window);
      const avg = slice.reduce((sum, n) => sum + n, 0) / window;
      movingAvg.push(avg);
    }

    const result = [
      `Moving Average (window=${window}):`,
      ``,
      ...movingAvg.map((avg, i) => `[${i}] ${avg.toFixed(4)}`),
      ``,
      `Original: ${numbers.length} values`,
      `Result: ${movingAvg.length} values`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error calculating moving average: " + error.message);
  }
}
