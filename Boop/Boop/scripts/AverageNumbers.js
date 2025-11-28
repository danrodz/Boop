/**
{
  "api": 1,
  "name": "Average Numbers",
  "description": "Calculates average of all numbers in text",
  "author": "Boop",
  "icon": "divide",
  "tags": "average,mean,math,numbers"
}
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers) {
    state.postError("No numbers found");
    return;
  }

  const sum = numbers.reduce((acc, n) => acc + parseFloat(n), 0);
  const avg = sum / numbers.length;
  state.text = avg.toString();
}
