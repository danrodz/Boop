/**
  {
    "api": 1,
    "name": "Math Expression Calculator",
    "description": "Evaluates mathematical expressions safely",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,expression,evaluate"
  }
**/

function main(state) {
  try {
    const expr = state.text.trim();

    // Safe evaluation - only allow math operations
    if (!/^[\d\s\+\-\*\/\^\%\(\)\.\,]+$/.test(expr)) {
      state.postError("Only numbers and math operators allowed: + - * / ^ % ( )");
      return;
    }

    // Replace ^ with ** for exponentiation
    const sanitized = expr.replace(/\^/g, '**').replace(/,/g, '');

    // Use Function instead of eval for slightly better safety
    const result = Function('"use strict"; return (' + sanitized + ')')();

    if (!isFinite(result)) {
      state.postError("Result is infinite or undefined");
      return;
    }

    state.text = `${expr} = ${result}`;

  } catch (error) {
    state.postError("Invalid expression: " + error.message);
  }
}
