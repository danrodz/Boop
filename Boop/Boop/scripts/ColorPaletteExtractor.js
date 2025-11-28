/**
  {
    "api": 1,
    "name": "Color Palette Extractor",
    "description": "Extract color palette from CSS or SVG",
    "author": "Boop",
    "icon": "paintpalette.fill",
    "tags": "color,palette,extract,css,svg"
  }
**/

function main(state) {
  try {
    const input = state.text;
    const colors = new Set();

    // Match HEX colors
    const hexPattern = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g;
    let match;

    while ((match = hexPattern.exec(input)) !== null) {
      let hex = match[1];
      // Convert 3-digit to 6-digit
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      colors.add('#' + hex.toUpperCase());
    }

    // Match RGB colors
    const rgbPattern = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/g;

    while ((match = rgbPattern.exec(input)) !== null) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);

      const hex = '#' + [r, g, b].map(x => {
        const h = x.toString(16);
        return h.length === 1 ? '0' + h : h;
      }).join('').toUpperCase();

      colors.add(hex);
    }

    if (colors.size === 0) {
      state.postError("No colors found in input");
      return;
    }

    const result = [
      `Color Palette (${colors.size} colors):`,
      '',
      ...Array.from(colors).map((color, i) => `${i + 1}. ${color}`),
      '',
      'CSS Variables:',
      ...Array.from(colors).map((color, i) => `--color-${i + 1}: ${color};`)
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error extracting colors: " + error.message);
  }
}
