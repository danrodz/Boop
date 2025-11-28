/**
  {
    "api": 1,
    "name": "Fraction to Decimal",
    "description": "Convert fraction to decimal (format: 3/4 or 1 1/2)",
    "author": "Boop",
    "icon": "divide",
    "tags": "fraction,decimal,convert,math"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    // Handle mixed fractions (e.g., "1 1/2")
    const mixedMatch = input.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (mixedMatch) {
      const whole = parseInt(mixedMatch[1]);
      const numerator = parseInt(mixedMatch[2]);
      const denominator = parseInt(mixedMatch[3]);
      const decimal = whole + (numerator / denominator);
      state.text = decimal.toString();
      return;
    }

    // Handle simple fractions (e.g., "3/4")
    const simpleMatch = input.match(/^(\d+)\/(\d+)$/);
    if (simpleMatch) {
      const numerator = parseInt(simpleMatch[1]);
      const denominator = parseInt(simpleMatch[2]);
      if (denominator === 0) {
        state.postError("Cannot divide by zero");
        return;
      }
      const decimal = numerator / denominator;
      state.text = decimal.toString();
      return;
    }

    state.postError("Invalid fraction format. Use: 3/4 or 1 1/2");
  } catch (error) {
    state.postError("Error converting fraction: " + error.message);
  }
}
