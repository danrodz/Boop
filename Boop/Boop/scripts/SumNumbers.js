/**
{
  "api": 1,
  "name": "Sum Numbers",
  "description": "Sums all numbers found in text",
  "author": "Boop",
  "icon": "plus.slash.minus",
  "tags": "sum,math,numbers,calculate"
}
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers) {
    state.postError("No numbers found");
    return;
  }

  const sum = numbers.reduce((acc, n) => acc + parseFloat(n), 0);
  state.text = sum.toString();
}
