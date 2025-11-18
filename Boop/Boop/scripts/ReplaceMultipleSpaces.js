/**
  {
    "api": 1,
    "name": "Replace Multiple Spaces with Single",
    "description": "Replaces multiple consecutive spaces with a single space",
    "author": "Boop",
    "icon": "space",
    "tags": "replace,spaces,normalize,whitespace,collapse"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/ {2,}/g, ' ');
  } catch (error) {
    state.postError("Failed to replace multiple spaces");
  }
}
