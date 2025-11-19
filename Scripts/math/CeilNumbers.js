/**
  {
    "api": 1,
    "name": "Ceiling Numbers",
    "description": "Ceils all numbers",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (numbers) {
    const ceiled = numbers.map(n => Math.ceil(parseFloat(n)));
    state.text = ceiled.join(', ');
  }
}
