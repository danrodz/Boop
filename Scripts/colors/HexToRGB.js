/**
  {
    "api": 1,
    "name": "Hex to RGB",
    "description": "Converts hex color to RGB",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const hex = state.text.trim().replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  state.text = \`rgb(\${r}, \${g}, \${b})\`;
}
