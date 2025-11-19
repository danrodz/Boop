/**
  {
    "api": 1,
    "name": "Scientific Notation",
    "description": "Convert to/from scientific notation",
    "author": "Boop",
    "icon": "function",
    "tags": "scientific,notation,exponent,math,convert"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    // Check if input is in scientific notation
    if (input.match(/[eE]/)) {
      const num = parseFloat(input);
      if (isNaN(num)) {
        state.postError("Invalid scientific notation");
        return;
      }
      state.text = num.toString();
    } else {
      const num = parseFloat(input);
      if (isNaN(num)) {
        state.postError("Invalid number");
        return;
      }

      const scientific = num.toExponential();
      const parts = scientific.split('e');
      const mantissa = parseFloat(parts[0]);
      const exponent = parseInt(parts[1]);

      const result = [
        `Scientific: ${scientific}`,
        `Mantissa: ${mantissa}`,
        `Exponent: ${exponent}`,
        `Standard: ${num}`
      ].join('\n');

      state.text = result;
    }
  } catch (error) {
    state.postError("Error converting notation: " + error.message);
  }
}
