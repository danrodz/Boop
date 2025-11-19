/**
  {
    "api": 1,
    "name": "Multiply Numbers",
    "description": "Multiplies all numbers found in text",
    "author": "Boop",
    "icon": "multiply",
    "tags": "math,multiply,product,numbers,calculate"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found in text");
    return;
  }

  const product = numbers.map(Number).reduce((a, b) => a * b, 1);
  state.text = String(product);
}
