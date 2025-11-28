/**
  {
    "api": 1,
    "name": "SVG Optimizer",
    "description": "Optimize SVG by removing unnecessary attributes and whitespace",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "svg,optimize,minify,compress,graphics"
  }
**/

function main(state) {
  try {
    let svg = state.text;

    // Remove comments
    svg = svg.replace(/<!--[\s\S]*?-->/g, '');

    // Remove unnecessary whitespace
    svg = svg.replace(/\s+/g, ' ');
    svg = svg.replace(/>\s+</g, '><');

    // Remove editor-specific attributes
    svg = svg.replace(/\s*(xmlns:sketch|sketch:type|xmlns:dc|xmlns:cc|xmlns:rdf|xmlns:svg)="[^"]*"/g, '');

    // Remove empty attributes
    svg = svg.replace(/\s+\w+=""\s*/g, ' ');

    // Trim
    svg = svg.trim();

    const originalSize = state.text.length;
    const newSize = svg.length;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

    state.text = svg;
    state.postInfo(`Optimized: ${originalSize} → ${newSize} bytes (${savings}% reduction)`);
  } catch (error) {
    state.postError("Error optimizing SVG: " + error.message);
  }
}
