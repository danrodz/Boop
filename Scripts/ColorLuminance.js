/**
  {
    "api": 1,
    "name": "Color Luminance Calculator",
    "description": "Calculate relative luminance of a color (hex)",
    "author": "Boop",
    "icon": "paintbrush",
    "tags": "color,luminance,brightness,hex"
  }
**/

function main(state) {
  try {
    let hex = state.text.trim().replace('#', '');

    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }

    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // Convert to linear RGB
    const toLinear = (c) => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    const rLinear = toLinear(r);
    const gLinear = toLinear(g);
    const bLinear = toLinear(b);

    // Calculate relative luminance
    const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;

    const perceived = luminance > 0.5 ? 'light' : 'dark';
    const textColor = luminance > 0.5 ? 'black' : 'white';

    state.text = `Luminance: ${luminance.toFixed(4)}\nPerceived: ${perceived}\nRecommended text color: ${textColor}`;
  } catch (error) {
    state.postError("Failed to calculate luminance: " + error.message);
  }
}
