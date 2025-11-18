/**
  {
    "api": 1,
    "name": "Add Numbers",
    "description": "Adds all numbers found in text",
    "author": "Boop",
    "icon": "plus",
    "tags": "math,add,sum,numbers,calculate"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found in text");
    return;
  }

  const sum = numbers.map(Number).reduce((a, b) => a + b, 0);
  state.text = String(sum);
}
