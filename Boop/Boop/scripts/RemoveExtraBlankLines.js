/**
  {
    "api": 1,
    "name": "Remove Extra Blank Lines",
    "description": "Collapses multiple consecutive blank lines into one",
    "author": "Boop",
    "icon": "trash",
    "tags": "remove,blank,empty,lines,collapse"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/\n\s*\n\s*\n/g, '\n\n');
  } catch (error) {
    state.postError("Failed to remove extra blank lines");
  }
}
