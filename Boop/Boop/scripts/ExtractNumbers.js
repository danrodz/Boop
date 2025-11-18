/**
  {
    "api": 1,
    "name": "Extract Numbers",
    "description": "Extracts all numbers from the text",
    "author": "Boop",
    "icon": "hash",
    "tags": "extract,numbers,filter,digits"
  }
**/

function main(state) {
  try {
    const numbers = state.text.match(/\d+/g);
    if (numbers) {
      state.text = numbers.join('\n');
    } else {
      state.text = '';
    }
  } catch (error) {
    state.postError("Failed to extract numbers");
  }
}
