/**
  {
    "api": 1,
    "name": "Maximum Number",
    "description": "Finds the largest number in text",
    "author": "Boop",
    "icon": "arrow.up",
    "tags": "math,max,maximum,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found in text");
    return;
  }

  const max = Math.max(...numbers.map(Number));
  state.text = String(max);
}
