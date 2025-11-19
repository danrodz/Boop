/**
  {
    "api": 1,
    "name": "JSON Beautify (4 spaces)",
    "description": "Formats JSON with 4-space indentation",
    "author": "Boop",
    "icon": "arrow.up.left.and.arrow.down.right",
    "tags": "json,beautify,format,pretty"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = JSON.stringify(json, null, 4);
  } catch (error) {
    state.postError("Failed to beautify JSON: " + error.message);
  }
}
