/**
  {
    "api": 1,
    "name": "Increment Numbers",
    "description": "Increments all numbers in the text by 1",
    "author": "Boop",
    "icon": "plus",
    "tags": "increment,numbers,add,increase"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/\d+/g, match => {
      return String(parseInt(match, 10) + 1);
    });
  } catch (error) {
    state.postError("Failed to increment numbers");
  }
}
