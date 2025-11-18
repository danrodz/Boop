/**
  {
    "api": 1,
    "name": "JSON Format (tabs, width 20)",
    "description": "Formats JSON (for display purposes)",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
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
