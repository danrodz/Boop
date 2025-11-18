/**
  {
    "api": 1,
    "name": "Outlier Detector",
    "description": "Detect statistical outliers using IQR method",
    "author": "Boop",
    "icon": "exclamationmark.triangle",
    "tags": "outlier,statistics,data,analysis,iqr"
  }
**/

function main(state) {
  try {
    const numbers = state.text.split(/[\s,\n]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (numbers.length < 4) {
      state.postError("Need at least 4 numbers to detect outliers");
      return;
    }

    const sorted = numbers.slice().sort((a, b) => a - b);

    // Calculate quartiles
    function quartile(arr, q) {
      const pos = (arr.length - 1) * q;
      const base = Math.floor(pos);
      const rest = pos - base;
      if (arr[base + 1] !== undefined) {
        return arr[base] + rest * (arr[base + 1] - arr[base]);
      } else {
        return arr[base];
      }
    }

    const q1 = quartile(sorted, 0.25);
    const q2 = quartile(sorted, 0.5);
    const q3 = quartile(sorted, 0.75);
    const iqr = q3 - q1;

    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    const outliers = numbers.filter(n => n < lowerBound || n > upperBound);
    const normal = numbers.filter(n => n >= lowerBound && n <= upperBound);

    const result = [
      `Statistics:`,
      `Q1 (25%): ${q1.toFixed(2)}`,
      `Q2 (50% / Median): ${q2.toFixed(2)}`,
      `Q3 (75%): ${q3.toFixed(2)}`,
      `IQR: ${iqr.toFixed(2)}`,
      ``,
      `Outlier Bounds:`,
      `Lower: ${lowerBound.toFixed(2)}`,
      `Upper: ${upperBound.toFixed(2)}`,
      ``,
      `Outliers (${outliers.length}): ${outliers.length > 0 ? outliers.join(', ') : 'None'}`,
      `Normal Values (${normal.length}): ${normal.length}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error detecting outliers: " + error.message);
  }
}
