/**
  {
    "api": 1,
    "name": "Sum Numbers",
    "description": "Sums all numbers found in the text",
    "author": "Boop",
    "icon": "calculator",
    "tags": "sum,add,numbers,calculate,math"
  }
**/

function main(state) {
  try {
    const numbers = state.text.match(/-?\d+\.?\d*/g);

    if (!numbers || numbers.length === 0) {
      state.postError("No numbers found");
      return;
    }

    const sum = numbers.reduce((acc, num) => acc + parseFloat(num), 0);

    state.text = sum.toString();
    state.postInfo(`Sum of ${numbers.length} number(s): ${sum}`);
  } catch (error) {
    state.postError("Failed to sum numbers: " + error.message);
  }
}
