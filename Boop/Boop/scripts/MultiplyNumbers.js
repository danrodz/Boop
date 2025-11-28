/**
{
  "api": 1,
  "name": "Multiply Numbers",
  "description": "Multiplies all numbers found",
  "author": "Boop",
  "icon": "multiply",
  "tags": "math,multiply,product"
}
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers) {
    state.postError("No numbers found");
    return;
  }
  
  const product = numbers.reduce((acc, n) => acc * parseFloat(n), 1);
  state.text = product.toString();
}
