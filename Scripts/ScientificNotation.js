/**
  {
    "api": 1,
    "name": "Scientific Notation Converter",
    "description": "Convert between standard and scientific notation",
    "author": "Boop",
    "icon": "x.squareroot",
    "tags": "scientific,notation,convert,math"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    // Check if already in scientific notation
    if (input.includes('e') || input.includes('E')) {
      // Convert to standard
      const num = parseFloat(input);
      state.text = num.toString();
    } else {
      // Convert to scientific
      const num = parseFloat(input);
      state.text = num.toExponential();
    }
  } catch (error) {
    state.postError("Failed to convert: " + error.message);
  }
}
