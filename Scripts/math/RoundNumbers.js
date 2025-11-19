/**
  {
    "api": 1,
    "name": "Round Numbers",
    "description": "Rounds all numbers to nearest integer",
    "author": "Boop",
    "icon": "function",
    "tags": "math,round,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found in text");
    return;
  }

  const rounded = numbers.map(n => Math.round(Number(n)));
  state.text = rounded.join(', ');
}
