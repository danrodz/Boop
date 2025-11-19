/**
  {
    "api": 1,
    "name": "Calculate Percentage",
    "description": "Calculates percentage (num1 is what % of num2)",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const nums = state.text.match(/-?\d+\.?\d*/g);
  if (nums && nums.length >= 2) {
    const pct = (parseFloat(nums[0]) / parseFloat(nums[1])) * 100;
    state.text = pct.toFixed(2) + '%';
  }
}
