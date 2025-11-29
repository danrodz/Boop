/**
  {
    "api": 1,
    "name": "Color Converter (All Formats)",
    "description": "Converts between Hex, RGB, HSL color formats",
    "author": "Boop",
    "icon": "paintpalette.fill",
    "tags": "color,hex,rgb,hsl,convert"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    let r, g, b;

    // Detect and parse input format
    if (input.startsWith('#')) {
      // Hex input
      const hex = input.substring(1);
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else {
        throw new Error("Invalid hex format");
      }
    } else if (input.startsWith('rgb')) {
      // RGB input
      const match = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) throw new Error("Invalid RGB format");
      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
    } else if (input.startsWith('hsl')) {
      // HSL input - convert to RGB
      const match = input.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/);
      if (!match) throw new Error("Invalid HSL format");

      const h = parseInt(match[1]) / 360;
      const s = parseInt(match[2]) / 100;
      const l = parseInt(match[3]) / 100;

      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      if (s === 0) {
        r = g = b = Math.round(l * 255);
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
        g = Math.round(hue2rgb(p, q, h) * 255);
        b = Math.round(hue2rgb(p, q, h - 1/3) * 255);
      }
    } else {
      throw new Error("Unsupported format. Use hex (#RRGGBB), rgb(r,g,b), or hsl(h,s%,l%)");
    }

    // Convert RGB to all formats
    const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
    const rgb = `rgb(${r}, ${g}, ${b})`;

    // Convert to HSL
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }

    const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

    state.text = `HEX: ${hex}\nRGB: ${rgb}\nHSL: ${hsl}`;

  } catch (error) {
    state.postError(error.message);
  }
}
