/**
{
  "api": 1,
  "name": "Generate Random Color Palette",
  "description": "Generates N random hex colors (enter count)",
  "author": "Boop",
  "icon": "paintpalette",
  "tags": "color,palette,hex,generate,random"
}
**/

function main(state) {
  const count = parseInt(state.text.trim()) || 5;
  const colors = [];

  for (let i = 0; i < count; i++) {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    colors.push(color);
  }

  state.text = colors.join('\n');
}
