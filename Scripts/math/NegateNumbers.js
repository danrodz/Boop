/**
  {
    "api": 1,
    "name": "Negate Numbers",
    "description": "Negates all numbers",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (numbers) {
    const negated = numbers.map(n => -parseFloat(n));
    state.text = negated.join(', ');
  }
}
