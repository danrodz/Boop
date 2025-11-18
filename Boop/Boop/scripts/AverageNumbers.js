/**
  {
    "api": 1,
    "name": "Average Numbers",
    "description": "Calculates the average of all numbers in the text",
    "author": "Boop",
    "icon": "calculator",
    "tags": "average,mean,numbers,calculate,math"
  }
**/

function main(state) {
  try {
    const numbers = state.text.match(/-?\d+\.?\d*/g);

    if (!numbers || numbers.length === 0) {
      state.postError("No numbers found");
      return;
    }

    const nums = numbers.map(n => parseFloat(n));
    const sum = nums.reduce((acc, num) => acc + num, 0);
    const avg = sum / nums.length;

    state.text = avg.toString();
    state.postInfo(`Average of ${nums.length} number(s): ${avg}`);
  } catch (error) {
    state.postError("Failed to calculate average: " + error.message);
  }
}
