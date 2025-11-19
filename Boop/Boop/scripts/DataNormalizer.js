/**
  {
    "api": 1,
    "name": "Data Normalizer",
    "description": "Normalize numbers to 0-1 range (min-max normalization)",
    "author": "Boop",
    "icon": "chart.line.uptrend.xyaxis",
    "tags": "normalize,data,scale,math,statistics"
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

    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const range = max - min;

    if (range === 0) {
      state.text = numbers.map(() => '0.5').join('\n');
      state.postInfo("All values are equal, normalized to 0.5");
      return;
    }

    const normalized = numbers.map(n => (n - min) / range);

    const result = [
      'Normalized Values (0-1):',
      ...normalized.map((n, i) => `${numbers[i]} → ${n.toFixed(4)}`),
      '',
      `Original Range: [${min}, ${max}]`,
      `Range: ${range}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error normalizing data: " + error.message);
  }
}
