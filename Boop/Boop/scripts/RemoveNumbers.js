/**
  {
    "api": 1,
    "name": "Remove Numbers",
    "description": "Removes all numbers from the text",
    "author": "Boop",
    "icon": "trash",
    "tags": "remove,numbers,filter,digits"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/\d+/g, '');
  } catch (error) {
    state.postError("Failed to remove numbers");
  }
}
