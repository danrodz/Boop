/**
  {
    "api": 1,
    "name": "Minimum Number",
    "description": "Finds the smallest number in text",
    "author": "Boop",
    "icon": "arrow.down",
    "tags": "math,min,minimum,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found in text");
    return;
  }

  const min = Math.min(...numbers.map(Number));
  state.text = String(min);
}
