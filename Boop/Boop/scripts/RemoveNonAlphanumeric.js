/**
  {
    "api": 1,
    "name": "Remove Non-Alphanumeric",
    "description": "Removes all non-alphanumeric characters",
    "author": "Boop",
    "icon": "trash",
    "tags": "remove,special,characters,alphanumeric"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/[^a-zA-Z0-9\s]/g, '');
  } catch (error) {
    state.postError("Failed to remove non-alphanumeric characters");
  }
}
