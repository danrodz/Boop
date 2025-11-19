/**
  {
    "api": 1,
    "name": "JSON Compact (Minify)",
    "description": "Minifies JSON by removing whitespace",
    "author": "Boop",
    "icon": "arrow.down.right.and.arrow.up.left",
    "tags": "json,minify,compact,compress"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = JSON.stringify(json);
  } catch (error) {
    state.postError("Failed to compact JSON: " + error.message);
  }
}
