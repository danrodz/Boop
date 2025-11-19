/**
  {
    "api": 1,
    "name": "SVG Sprite Generator",
    "description": "Combine multiple SVGs into sprite (separate SVGs with ---)",
    "author": "Boop",
    "icon": "square.grid.3x3",
    "tags": "svg,sprite,combine,icon,optimize"
  }
**/

function main(state) {
  try {
    const svgs = state.text.split('---');

    if (svgs.length < 2) {
      state.postError("Provide multiple SVGs separated by ---");
      return;
    }

    const symbols = [];

    for (let i = 0; i < svgs.length; i++) {
      const svg = svgs[i].trim();
      if (!svg) continue;

      // Extract viewBox
      const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
      const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

      // Extract content between svg tags
      const contentMatch = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
      const content = contentMatch ? contentMatch[1].trim() : svg;

      const id = `icon-${i + 1}`;

      symbols.push(`  <symbol id="${id}" viewBox="${viewBox}">
    ${content}
  </symbol>`);
    }

    const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
${symbols.join('\n')}
</svg>

<!-- Usage: -->
<!-- <svg><use href="#icon-1"/></svg> -->
<!-- <svg><use href="#icon-2"/></svg> -->`;

    state.text = sprite;
    state.postInfo(`Created sprite with ${symbols.length} icon(s)`);
  } catch (error) {
    state.postError("Error creating sprite: " + error.message);
  }
}
