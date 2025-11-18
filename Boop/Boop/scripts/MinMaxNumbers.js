/**
  {
    "api": 1,
    "name": "Min/Max Numbers",
    "description": "Finds the minimum and maximum numbers in the text",
    "author": "Boop",
    "icon": "calculator",
    "tags": "min,max,minimum,maximum,numbers,math"
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
    const min = Math.min(...nums);
    const max = Math.max(...nums);

    state.text = `Min: ${min}\nMax: ${max}`;
    state.postInfo(`Found ${nums.length} number(s)`);
  } catch (error) {
    state.postError("Failed to find min/max: " + error.message);
  }
}
