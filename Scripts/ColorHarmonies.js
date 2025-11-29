/**
  {
    "api": 1,
    "name": "Color Harmonies",
    "description": "Generates harmonious color palettes from a hex color",
    "author": "Boop",
    "icon": "paintpalette",
    "tags": "color,palette,harmony,complementary,design"
  }
**/

function main(state) {
  var hex = state.text.trim().replace("#", "");
  
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    state.postError("Enter a valid hex color (e.g., #FF5733)");
    return;
  }
  
  // Hex to HSL
  function hexToHsl(hex) {
    var r = parseInt(hex.substr(0, 2), 16) / 255;
    var g = parseInt(hex.substr(2, 2), 16) / 255;
    var b = parseInt(hex.substr(4, 2), 16) / 255;
    
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
  }
  
  // HSL to Hex
  function hslToHex(h, s, l) {
    h = ((h % 360) + 360) % 360;
    s /= 100;
    l /= 100;
    
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = l - c / 2;
    var r, g, b;
    
    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    
    var toHex = function(v) {
      var hex = Math.round((v + m) * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    
    return "#" + toHex(r) + toHex(g) + toHex(b);
  }
  
  var hsl = hexToHsl(hex);
  
  var output = [
    "Base Color: #" + hex.toUpperCase(),
    "HSL: " + Math.round(hsl.h) + ", " + Math.round(hsl.s) + "%, " + Math.round(hsl.l) + "%",
    "",
    "Complementary:",
    "  " + hslToHex(hsl.h + 180, hsl.s, hsl.l).toUpperCase(),
    "",
    "Triadic:",
    "  " + hslToHex(hsl.h + 120, hsl.s, hsl.l).toUpperCase(),
    "  " + hslToHex(hsl.h + 240, hsl.s, hsl.l).toUpperCase(),
    "",
    "Split-Complementary:",
    "  " + hslToHex(hsl.h + 150, hsl.s, hsl.l).toUpperCase(),
    "  " + hslToHex(hsl.h + 210, hsl.s, hsl.l).toUpperCase(),
    "",
    "Analogous:",
    "  " + hslToHex(hsl.h - 30, hsl.s, hsl.l).toUpperCase(),
    "  " + hslToHex(hsl.h + 30, hsl.s, hsl.l).toUpperCase(),
    "",
    "Tetradic:",
    "  " + hslToHex(hsl.h + 90, hsl.s, hsl.l).toUpperCase(),
    "  " + hslToHex(hsl.h + 180, hsl.s, hsl.l).toUpperCase(),
    "  " + hslToHex(hsl.h + 270, hsl.s, hsl.l).toUpperCase(),
    "",
    "Shades:",
    "  " + hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 20, 0)).toUpperCase(),
    "  " + hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 40, 0)).toUpperCase(),
    "",
    "Tints:",
    "  " + hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 20, 100)).toUpperCase(),
    "  " + hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 40, 100)).toUpperCase()
  ];
  
  state.text = output.join("\n");
  state.postInfo("Color harmonies generated");
}
