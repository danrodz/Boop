/**
  {
    "api": 1,
    "name": "Get Percentage Of",
    "description": "Calculates X% of Y",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const nums = state.text.match(/-?\d+\.?\d*/g);
  if (nums && nums.length >= 2) {
    const result = (parseFloat(nums[0]) / 100) * parseFloat(nums[1]);
    state.text = String(result.toFixed(2));
  }
}
