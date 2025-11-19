/**
  {
    "api": 1,
    "name": "JSON Indent (10 spaces)",
    "description": "Formats JSON with 10-space indentation",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = JSON.stringify(json, null, 10);
  } catch (error) {
    state.postError("Invalid JSON");
  }
}
