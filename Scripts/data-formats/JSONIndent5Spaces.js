/**
  {
    "api": 1,
    "name": "JSON Indent (5 spaces)",
    "description": "Formats JSON with 5-space indentation",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = JSON.stringify(json, null, 5);
  } catch (error) {
    state.postError("Invalid JSON");
  }
}
