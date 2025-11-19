/**
  {
    "api": 1,
    "name": "Correlation Calculator",
    "description": "Calculate Pearson correlation between two datasets (format: x1,y1 x2,y2...)",
    "author": "Boop",
    "icon": "arrow.up.forward.and.arrow.down.backward",
    "tags": "correlation,statistics,pearson,data,analysis"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');
    const pairs = lines.map(line => {
      const parts = line.split(/[\s,]+/).map(n => parseFloat(n));
      if (parts.length < 2 || parts.some(n => isNaN(n))) {
        return null;
      }
      return { x: parts[0], y: parts[1] };
    }).filter(p => p !== null);

    if (pairs.length < 2) {
      state.postError("Need at least 2 valid pairs (x,y)");
      return;
    }

    const n = pairs.length;
    const sumX = pairs.reduce((sum, p) => sum + p.x, 0);
    const sumY = pairs.reduce((sum, p) => sum + p.y, 0);
    const sumXY = pairs.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumX2 = pairs.reduce((sum, p) => sum + p.x * p.x, 0);
    const sumY2 = pairs.reduce((sum, p) => sum + p.y * p.y, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    if (denominator === 0) {
      state.postError("Cannot calculate correlation (zero variance)");
      return;
    }

    const r = numerator / denominator;
    const r2 = r * r;

    let interpretation = '';
    if (Math.abs(r) < 0.3) interpretation = 'weak';
    else if (Math.abs(r) < 0.7) interpretation = 'moderate';
    else interpretation = 'strong';

    const direction = r > 0 ? 'positive' : 'negative';

    const result = [
      `Pearson Correlation Coefficient (r): ${r.toFixed(4)}`,
      `R-squared (r²): ${r2.toFixed(4)}`,
      ``,
      `Interpretation: ${interpretation} ${direction} correlation`,
      ``,
      `Sample Size: ${n}`,
      `Mean X: ${(sumX / n).toFixed(4)}`,
      `Mean Y: ${(sumY / n).toFixed(4)}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error calculating correlation: " + error.message);
  }
}
