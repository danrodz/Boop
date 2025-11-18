/**
  {
    "api": 1,
    "name": "Median of Numbers",
    "description": "Calculates median of numbers in text",
    "author": "Boop",
    "icon": "function",
    "tags": "math,median,numbers,statistics,calculate"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found in text");
    return;
  }

  const nums = numbers.map(Number).sort((a, b) => a - b);
  const median = nums.length % 2 === 0 ?
    (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2 :
    nums[Math.floor(nums.length / 2)];

  state.text = String(median);
}
