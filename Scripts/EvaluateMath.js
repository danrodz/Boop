/**
  {
    "api": 1,
    "name": "Evaluate Math Expression",
    "description": "Calculate mathematical expressions safely",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,evaluate,expression"
  }
**/

function main(state) {
  try {
    const expr = state.text.trim();

    // Safe evaluation - only allow numbers and basic operators
    const sanitized = expr.replace(/[^0-9+\-*/(). ]/g, '');

    if (sanitized !== expr) {
      state.postError("Expression contains invalid characters");
      return;
    }

    // Evaluate using Function constructor (safer than eval)
    const result = Function('"use strict"; return (' + sanitized + ')')();

    state.text = `${expr} = ${result}`;
  } catch (error) {
    state.postError("Failed to evaluate: " + error.message);
  }
}
