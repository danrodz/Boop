/**
  {
    "api": 1,
    "name": "Normalize Whitespace",
    "description": "Collapses multiple spaces into single spaces",
    "author": "Boop",
    "icon": "space",
    "tags": "whitespace,normalize,spaces,collapse"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/[ \t]+/g, ' ');
  } catch (error) {
    state.postError("Failed to normalize whitespace");
  }
}
