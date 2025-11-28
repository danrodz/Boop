/**
  {
    "api": 1,
    "name": "Binary Math Calculator",
    "description": "Calculate binary expressions (e.g., 1010 + 1100)",
    "author": "Boop",
    "icon": "01.circle",
    "tags": "binary,math,calculate"
  }
**/

function main(state) {
  try {
    const expr = state.text.trim();

    // Parse binary expression
    const match = expr.match(/^([01]+)\s*([\+\-\*\/])\s*([01]+)$/);

    if (!match) {
      state.postError("Format: binary operator binary (e.g., 1010 + 1100)");
      return;
    }

    const num1 = parseInt(match[1], 2);
    const operator = match[2];
    const num2 = parseInt(match[3], 2);

    let result;
    switch (operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': result = Math.floor(num1 / num2); break;
    }

    const binary = result.toString(2);

    state.text = `Binary: ${binary}\nDecimal: ${result}\nHex: ${result.toString(16).toUpperCase()}`;
  } catch (error) {
    state.postError("Failed to calculate: " + error.message);
  }
}
