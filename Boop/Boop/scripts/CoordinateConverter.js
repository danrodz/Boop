/**
  {
    "api": 1,
    "name": "Coordinate Converter",
    "description": "Convert between coordinate systems (format: x y type, type: cart/polar)",
    "author": "Boop",
    "icon": "location",
    "tags": "coordinate,convert,cartesian,polar,math"
  }
**/

function main(state) {
  try {
    const parts = state.text.trim().split(/\s+/);

    if (parts.length < 3) {
      state.text = 'Format: x y type\n\nTypes:\n  cart - Cartesian (x, y)\n  polar - Polar (r, θ)';
      return;
    }

    const a = parseFloat(parts[0]);
    const b = parseFloat(parts[1]);
    const type = parts[2].toLowerCase();

    if (isNaN(a) || isNaN(b)) {
      state.postError("Invalid coordinates");
      return;
    }

    if (type === 'cart' || type === 'cartesian') {
      // Cartesian to Polar
      const x = a;
      const y = b;
      const r = Math.sqrt(x * x + y * y);
      const theta = Math.atan2(y, x);
      const thetaDeg = theta * 180 / Math.PI;

      state.text = [
        'Polar Coordinates:',
        `r = ${r.toFixed(4)}`,
        `θ = ${theta.toFixed(4)} rad`,
        `θ = ${thetaDeg.toFixed(4)}°`
      ].join('\n');
    } else if (type === 'polar') {
      // Polar to Cartesian
      const r = a;
      const theta = b; // assuming radians
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);

      state.text = [
        'Cartesian Coordinates:',
        `x = ${x.toFixed(4)}`,
        `y = ${y.toFixed(4)}`
      ].join('\n');
    } else {
      state.postError("Unknown type. Use 'cart' or 'polar'");
    }
  } catch (error) {
    state.postError("Error converting coordinates: " + error.message);
  }
}
