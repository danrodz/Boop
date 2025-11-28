/**
  {
    "api": 1,
    "name": "Random Color Palette",
    "description": "Generate random color palette (input: count, default 5)",
    "author": "Boop",
    "icon": "paintpalette",
    "tags": "random,color,palette,generate,design"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text.trim()) || 5;

    if (count < 1 || count > 20) {
      state.postError("Count must be between 1 and 20");
      return;
    }

    const colors = [];

    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
      const rgb = `rgb(${r}, ${g}, ${b})`;

      // Calculate HSL for better palette generation
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

      const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

      colors.push(`${hex}  ${rgb}  ${hsl}`);
    }

    state.text = colors.join('\n');
    state.postInfo(`Generated palette with ${count} color(s)`);
  } catch (error) {
    state.postError("Error generating palette: " + error.message);
  }
}
