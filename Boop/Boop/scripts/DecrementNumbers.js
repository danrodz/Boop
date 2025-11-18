/**
  {
    "api": 1,
    "name": "Decrement Numbers",
    "description": "Decrements all numbers in the text by 1",
    "author": "Boop",
    "icon": "minus",
    "tags": "decrement,numbers,subtract,decrease"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/\d+/g, match => {
      return String(parseInt(match, 10) - 1);
    });
  } catch (error) {
    state.postError("Failed to decrement numbers");
  }
}
