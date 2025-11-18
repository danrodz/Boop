/**
  {
    "api": 1,
    "name": "Average Numbers",
    "description": "Calculates average of numbers in text",
    "author": "Boop",
    "icon": "function",
    "tags": "math,average,mean,numbers,calculate"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found in text");
    return;
  }

  const nums = numbers.map(Number);
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  state.text = String(avg);
}
