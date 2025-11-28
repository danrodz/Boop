/**
{
  "api": 1,
  "name": "Number Statistics",
  "description": "Shows min, max, avg, sum of numbers",
  "author": "Boop",
  "icon": "chart.bar",
  "tags": "stats,statistics,numbers"
}
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found");
    return;
  }
  
  const nums = numbers.map(parseFloat);
  const sum = nums.reduce((a, b) => a + b, 0);
  const avg = sum / nums.length;
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  
  state.text = `Count: ${nums.length}\nSum: ${sum}\nAverage: ${avg}\nMin: ${min}\nMax: ${max}`;
}
