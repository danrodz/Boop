/**
  {
    "api": 1,
    "name": "Power of 2",
    "description": "Raises numbers to power of 2",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (numbers) {
    const powered = numbers.map(n => Math.pow(parseFloat(n), 2));
    state.text = powered.join(', ');
  }
}
