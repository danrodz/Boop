/**
  {
    "api": 1,
    "name": "Remove Letters",
    "description": "Removes all letters from the text",
    "author": "Boop",
    "icon": "trash",
    "tags": "remove,letters,filter,alpha"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/[a-zA-Z]/g, '');
  } catch (error) {
    state.postError("Failed to remove letters");
  }
}
