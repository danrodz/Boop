/**
  {
    "api": 1,
    "name": "JSON Indent (9 spaces)",
    "description": "Formats JSON with 9-space indentation",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = JSON.stringify(json, null, 9);
  } catch (error) {
    state.postError("Invalid JSON");
  }
}
