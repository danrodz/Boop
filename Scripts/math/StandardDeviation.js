/**
  {
    "api": 1,
    "name": "Standard Deviation",
    "description": "Calculates standard deviation",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (numbers) {
    const nums = numbers.map(Number);
    const avg = nums.reduce((a, b) => a + b) / nums.length;
    const variance = nums.reduce((sum, num) => sum + Math.pow(num - avg, 2), 0) / nums.length;
    const stdDev = Math.sqrt(variance);
    state.text = stdDev.toFixed(4);
  }
}
