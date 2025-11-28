/**
  {
    "api": 1,
    "name": "Color Converter",
    "description": "Convert color between HEX, RGB, HSL formats",
    "author": "Boop",
    "icon": "paintpalette",
    "tags": "color,hex,rgb,hsl,convert"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    const results = [];

    // Parse HEX
    const hexMatch = input.match(/#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/);
    if (hexMatch) {
      let hex = hexMatch[1];
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      // Convert to HSL
      const rNorm = r / 255;
      const gNorm = g / 255;
      const bNorm = b / 255;

      const max = Math.max(rNorm, gNorm, bNorm);
      const min = Math.min(rNorm, gNorm, bNorm);
      const l = (max + min) / 2;

      let h = 0;
      let s = 0;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case rNorm: h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6; break;
          case gNorm: h = ((bNorm - rNorm) / d + 2) / 6; break;
          case bNorm: h = ((rNorm - gNorm) / d + 4) / 6; break;
        }
      }

      results.push(`HEX: #${hex.toUpperCase()}`);
      results.push(`RGB: rgb(${r}, ${g}, ${b})`);
      results.push(`HSL: hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
      results.push(`\nDecimal RGB: R=${r} G=${g} B=${b}`);
    }

    // Parse RGB
    const rgbMatch = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch && !hexMatch) {
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);

      const hex = '#' + [r, g, b].map(x => {
        const h = x.toString(16);
        return h.length === 1 ? '0' + h : h;
      }).join('').toUpperCase();

      results.push(`HEX: ${hex}`);
      results.push(`RGB: rgb(${r}, ${g}, ${b})`);
    }

    if (results.length === 0) {
      state.postError("Could not parse color. Use HEX (#FF5733) or RGB (rgb(255, 87, 51))");
      return;
    }

    state.text = results.join('\n');
  } catch (error) {
    state.postError("Error converting color: " + error.message);
  }
}
