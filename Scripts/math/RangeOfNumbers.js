/**
  {
    "api": 1,
    "name": "Range (Max - Min)",
    "description": "Calculates range of numbers",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (numbers) {
    const nums = numbers.map(Number);
    const range = Math.max(...nums) - Math.min(...nums);
    state.text = String(range);
  }
}
