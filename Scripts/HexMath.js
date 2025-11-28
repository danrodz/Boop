/**
  {
    "api": 1,
    "name": "Hex Math Calculator",
    "description": "Calculate hexadecimal expressions (e.g., FF + A5)",
    "author": "Boop",
    "icon": "number",
    "tags": "hex,hexadecimal,math,calculate"
  }
**/

function main(state) {
  try {
    const expr = state.text.trim().toUpperCase();

    // Parse hex expression
    const match = expr.match(/^([0-9A-F]+)\s*([\+\-\*\/])\s*([0-9A-F]+)$/);

    if (!match) {
      state.postError("Format: hex operator hex (e.g., FF + A5)");
      return;
    }

    const num1 = parseInt(match[1], 16);
    const operator = match[2];
    const num2 = parseInt(match[3], 16);

    let result;
    switch (operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': result = Math.floor(num1 / num2); break;
    }

    const hex = result.toString(16).toUpperCase();

    state.text = `Hex: ${hex}\nDecimal: ${result}\nBinary: ${result.toString(2)}`;
  } catch (error) {
    state.postError("Failed to calculate: " + error.message);
  }
}
