/**
  {
    "api": 1,
    "name": "JSON Indent (2 spaces)",
    "description": "Formats JSON with 2-space indentation",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = JSON.stringify(json, null, 2);
  } catch (error) {
    state.postError("Invalid JSON");
  }
}
