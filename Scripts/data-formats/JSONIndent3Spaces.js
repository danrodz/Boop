/**
  {
    "api": 1,
    "name": "JSON Indent (3 spaces)",
    "description": "Formats JSON with 3-space indentation",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = JSON.stringify(json, null, 3);
  } catch (error) {
    state.postError("Invalid JSON");
  }
}
