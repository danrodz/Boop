/**
  {
    "api": 1,
    "name": "Vector Magnitude",
    "description": "Calculate vector magnitude/length (format: x y z or x,y,z)",
    "author": "Boop",
    "icon": "arrow.up.right",
    "tags": "vector,magnitude,length,math,physics"
  }
**/

function main(state) {
  try {
    const components = state.text.trim().split(/[\s,]+/).map(n => parseFloat(n));

    if (components.some(n => isNaN(n))) {
      state.postError("Invalid vector components");
      return;
    }

    const magnitude = Math.sqrt(components.reduce((sum, c) => sum + c * c, 0));

    // Calculate unit vector
    const unit = components.map(c => c / magnitude);

    const result = [
      `Magnitude: ${magnitude.toFixed(4)}`,
      ``,
      `Components: [${components.join(', ')}]`,
      `Unit Vector: [${unit.map(u => u.toFixed(4)).join(', ')}]`,
      ``,
      `Sum of Squares: ${components.reduce((sum, c) => sum + c * c, 0).toFixed(4)}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error calculating magnitude: " + error.message);
  }
}
