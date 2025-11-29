/**
  {
    "api": 1,
    "name": "SVG ViewBox Calculator",
    "description": "Calculate and generate SVG viewBox from dimensions",
    "author": "Boop",
    "icon": "square.resize",
    "tags": "svg,viewbox,dimensions,calculate,resize"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    // Parse input: "width height" or "minX minY width height"
    const parts = input.split(/\s+/).map(n => parseFloat(n));

    if (parts.length < 2) {
      state.text = 'Format:\nwidth height\nor\nminX minY width height';
      return;
    }

    let minX, minY, width, height;

    if (parts.length === 2) {
      [width, height] = parts;
      minX = 0;
      minY = 0;
    } else {
      [minX, minY, width, height] = parts;
    }

    const viewBox = `${minX} ${minY} ${width} ${height}`;

    const result = [
      'SVG ViewBox:',
      `viewBox="${viewBox}"`,
      '',
      'Breakdown:',
      `Min X: ${minX}`,
      `Min Y: ${minY}`,
      `Width: ${width}`,
      `Height: ${height}`,
      '',
      'Aspect Ratio:',
      `${width}:${height} (${(width / height).toFixed(2)}:1)`,
      '',
      'Common Aspect Ratios:',
      `16:9 = ${(16/9).toFixed(2)}:1`,
      `4:3 = ${(4/3).toFixed(2)}:1`,
      `1:1 = 1:1 (square)`,
      '',
      'Usage:',
      `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">`,
      '  <!-- SVG content -->',
      '</svg>'
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error calculating viewBox: " + error.message);
  }
}
