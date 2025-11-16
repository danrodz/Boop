/**
 {
   "api": 1,
   "name": "Binary Calculator",
   "description": "Performs arithmetic operations on binary numbers (+, -, *, /).",
   "author":"danrodz",
   "icon": "calculator",
   "tags": "binary,calculator,math,arithmetic"
 }
 **/

function main(state) {
  function binaryToDecimal(binary) {
    binary = binary.trim();
    if (!/^[01]+$/.test(binary)) {
      return null;
    }
    return parseInt(binary, 2);
  }

  function decimalToBinary(decimal) {
    if (decimal < 0) {
      // Handle negative numbers using two's complement representation
      // For simplicity, we'll just prepend a minus sign
      return '-' + Math.abs(decimal).toString(2);
    }
    return decimal.toString(2);
  }

  function calculate(operand1, operator, operand2) {
    const num1 = binaryToDecimal(operand1);
    const num2 = binaryToDecimal(operand2);

    if (num1 === null || num2 === null) {
      return null;
    }

    let result;
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          return 'ERROR: Division by zero';
        }
        result = Math.floor(num1 / num2);
        break;
      default:
        return null;
    }

    return decimalToBinary(result);
  }

  const text = state.text;
  const lines = text.split(/\n/);
  const results = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      results.push('');
      continue;
    }

    // Parse expression: binary1 operator binary2
    const match = trimmed.match(/^([01]+)\s*([+\-*/])\s*([01]+)$/);

    if (!match) {
      state.postError(`Invalid expression: "${trimmed}". Format: binary1 operator binary2 (e.g., "1010 + 1100")`);
      return;
    }

    const [, operand1, operator, operand2] = match;
    const result = calculate(operand1, operator, operand2);

    if (result === null) {
      state.postError(`Invalid binary expression: "${trimmed}"`);
      return;
    }

    results.push(result);
  }

  state.text = results.join('\n');
}
