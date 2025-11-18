/**
  {
    "api": 1,
    "name": "Hex to HSL (approx)",
    "description": "Converts hex to HSL",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const hex = state.text.trim().replace('#', '');
  let r = parseInt(hex.substr(0, 2), 16) / 255;
  let g = parseInt(hex.substr(2, 2), 16) / 255;
  let b = parseInt(hex.substr(4, 2), 16) / 255;
  
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
  
  state.text = \`hsl(\${Math.round(h*360)}, \${Math.round(s*100)}%, \${Math.round(l*100)}%)\`;
}
