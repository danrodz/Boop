/**
  {
    "api": 1,
    "name": "Floor Numbers",
    "description": "Floors all numbers",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (numbers) {
    const floored = numbers.map(n => Math.floor(parseFloat(n)));
    state.text = floored.join(', ');
  }
}
