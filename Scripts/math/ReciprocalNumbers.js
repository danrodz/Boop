/**
  {
    "api": 1,
    "name": "Reciprocal (1/x)",
    "description": "Calculates reciprocal of numbers",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (numbers) {
    const reciprocal = numbers.map(n => 1 / parseFloat(n));
    state.text = reciprocal.join(', ');
  }
}
