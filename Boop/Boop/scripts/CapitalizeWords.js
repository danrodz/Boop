/**
  {
    "api": 1,
    "name": "Capitalize Each Word",
    "description": "Capitalizes the first letter of each word",
    "author": "Boop",
    "icon": "type",
    "tags": "capitalize,words,title,case"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/\b\w/g, char => char.toUpperCase());
  } catch (error) {
    state.postError("Failed to capitalize words");
  }
}
