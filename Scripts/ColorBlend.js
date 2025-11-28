/**
  {
    "api": 1,
    "name": "Color Blend Calculator",
    "description": "Blend two colors (format: hex1 hex2 OR hex1 hex2 ratio)",
    "author": "Boop",
    "icon": "paintpalette",
    "tags": "color,blend,mix,hex"
  }
**/

function main(state) {
  try {
    const parts = state.text.trim().split(/\s+/);

    if (parts.length < 2 || parts.length > 3) {
      state.postError("Format: hex1 hex2 [ratio]");
      return;
    }

    const hex1 = parts[0].replace('#', '');
    const hex2 = parts[1].replace('#', '');
    const ratio = parts[2] ? parseFloat(parts[2]) : 0.5;

    function parseHex(hex) {
      if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
      }
      return {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16)
      };
    }

    const c1 = parseHex(hex1);
    const c2 = parseHex(hex2);

    const blended = {
      r: Math.round(c1.r * (1 - ratio) + c2.r * ratio),
      g: Math.round(c1.g * (1 - ratio) + c2.g * ratio),
      b: Math.round(c1.b * (1 - ratio) + c2.b * ratio)
    };

    const result = '#' +
      blended.r.toString(16).padStart(2, '0') +
      blended.g.toString(16).padStart(2, '0') +
      blended.b.toString(16).padStart(2, '0');

    state.text = `Blended color: ${result.toUpperCase()}\nRGB: rgb(${blended.r}, ${blended.g}, ${blended.b})`;
  } catch (error) {
    state.postError("Failed to blend colors: " + error.message);
  }
}
