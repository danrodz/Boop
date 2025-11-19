/**
  {
    "api": 1,
    "name": "JSON Indent (7 spaces)",
    "description": "Formats JSON with 7-space indentation",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = JSON.stringify(json, null, 7);
  } catch (error) {
    state.postError("Invalid JSON");
  }
}
