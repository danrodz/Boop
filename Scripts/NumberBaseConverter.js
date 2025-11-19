/**
  {
    "api": 1,
    "name": "Number Base Converter",
    "description": "Converts numbers between bases (2, 8, 10, 16)",
    "author": "Boop",
    "icon": "number.circle.fill",
    "tags": "number,base,convert,hex,binary,octal,decimal"
  }
**/

function main(state) {
  try {
    let input = state.text.trim().toLowerCase();
    let num;
    let inputBase;

    // Detect input base
    if (input.startsWith('0x')) {
      num = parseInt(input, 16);
      inputBase = 16;
    } else if (input.startsWith('0b')) {
      num = parseInt(input.slice(2), 2);
      inputBase = 2;
    } else if (input.startsWith('0o')) {
      num = parseInt(input.slice(2), 8);
      inputBase = 8;
    } else if (/^[01]+$/.test(input)) {
      num = parseInt(input, 2);
      inputBase = 2;
    } else if (/^[0-7]+$/.test(input)) {
      // Could be octal or decimal, default to decimal
      num = parseInt(input, 10);
      inputBase = 10;
    } else if (/^[0-9a-f]+$/i.test(input)) {
      num = parseInt(input, 16);
      inputBase = 16;
    } else {
      num = parseInt(input, 10);
      inputBase = 10;
    }

    if (isNaN(num)) {
      state.postError("Invalid number");
      return;
    }

    const dec = num.toString(10);
    const hex = num.toString(16).toUpperCase();
    const bin = num.toString(2);
    const oct = num.toString(8);

    const result = `NUMBER BASE CONVERTER

Input: ${input} (base ${inputBase})

Decimal:     ${dec}
Hexadecimal: 0x${hex}
Binary:      0b${bin}
Octal:       0o${oct}`;

    state.text = result;

  } catch (error) {
    state.postError("Failed to convert: " + error.message);
  }
}
