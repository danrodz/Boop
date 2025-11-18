/**
  {
    "api": 1,
    "name": "Remove Punctuation",
    "description": "Removes all punctuation characters",
    "author": "Boop",
    "icon": "trash",
    "tags": "remove,punctuation,special,characters"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/[.,!?;:'"()[\]{}<>]/g, '');
  } catch (error) {
    state.postError("Failed to remove punctuation");
  }
}
