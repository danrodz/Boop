/**
  {
    "api": 1,
    "name": "Square Root Numbers",
    "description": "Calculates square root of all numbers in text",
    "author": "Boop",
    "icon": "function",
    "tags": "math,sqrt,square root,numbers,calculate"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found in text");
    return;
  }

  const sqrts = numbers.map(n => Math.sqrt(Number(n)));
  state.text = sqrts.join(', ');
}
