/**
  {
    "api": 1,
    "name": "JSON Indent (4 spaces)",
    "description": "Formats JSON with 4-space indentation",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = JSON.stringify(json, null, 4);
  } catch (error) {
    state.postError("Invalid JSON");
  }
}
