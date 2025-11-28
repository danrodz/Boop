/**
  {
    "api": 1,
    "name": "Color Palette Generator",
    "description": "Generate color palette from base color (hex)",
    "author": "Boop",
    "icon": "paintpalette.fill",
    "tags": "color,palette,generate,scheme"
  }
**/

function main(state) {
  try {
    let hex = state.text.trim().replace('#', '');

    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }

    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const h = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return h.length === 1 ? '0' + h : h;
      }).join('').toUpperCase();
    }

    // Generate complementary color
    const comp = rgbToHex(255 - r, 255 - g, 255 - b);

    // Generate lighter shades
    const light1 = rgbToHex(r + (255 - r) * 0.3, g + (255 - g) * 0.3, b + (255 - b) * 0.3);
    const light2 = rgbToHex(r + (255 - r) * 0.6, g + (255 - g) * 0.6, b + (255 - b) * 0.6);

    // Generate darker shades
    const dark1 = rgbToHex(r * 0.7, g * 0.7, b * 0.7);
    const dark2 = rgbToHex(r * 0.4, g * 0.4, b * 0.4);

    let result = `Base Color: #${hex.toUpperCase()}\n\n`;
    result += '=== SHADES ===\n';
    result += `Light 60%: ${light2}\n`;
    result += `Light 30%: ${light1}\n`;
    result += `Base: #${hex.toUpperCase()}\n`;
    result += `Dark 30%: ${dark1}\n`;
    result += `Dark 60%: ${dark2}\n\n`;
    result += '=== COMPLEMENTARY ===\n';
    result += `Opposite: ${comp}`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to generate palette: " + error.message);
  }
}
