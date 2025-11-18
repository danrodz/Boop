/**
  {
    "api": 1,
    "name": "Square Numbers",
    "description": "Squares all numbers in text",
    "author": "Boop",
    "icon": "function",
    "tags": "math,square,power,numbers,calculate"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found in text");
    return;
  }

  const squared = numbers.map(n => {
    const num = Number(n);
    return num * num;
  });

  state.text = squared.join(', ');
}
