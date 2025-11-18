/**
  {
    "api": 1,
    "name": "Cube Numbers",
    "description": "Cubes all numbers",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (numbers) {
    const cubed = numbers.map(n => Math.pow(parseFloat(n), 3));
    state.text = cubed.join(', ');
  }
}
