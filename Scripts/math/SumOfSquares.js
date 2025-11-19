/**
  {
    "api": 1,
    "name": "Sum of Squares",
    "description": "Calculates sum of squares",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (numbers) {
    const sumSquares = numbers.map(Number).reduce((sum, n) => sum + (n * n), 0);
    state.text = String(sumSquares);
  }
}
