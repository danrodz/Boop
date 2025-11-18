/**
  {
    "api": 1,
    "name": "JSON Indent (8 spaces)",
    "description": "Formats JSON with 8-space indentation",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = JSON.stringify(json, null, 8);
  } catch (error) {
    state.postError("Invalid JSON");
  }
}
