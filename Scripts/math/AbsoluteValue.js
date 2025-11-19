/**
  {
    "api": 1,
    "name": "Absolute Value",
    "description": "Converts all numbers to absolute value",
    "author": "Boop",
    "icon": "function",
    "tags": "math,abs,absolute,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found in text");
    return;
  }

  const abs = numbers.map(n => Math.abs(Number(n)));
  state.text = abs.join(', ');
}
