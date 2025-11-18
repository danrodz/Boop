/**
  {
    "api": 1,
    "name": "Indent Lines (Add 2 Spaces)",
    "description": "Adds 2 spaces of indentation to each line",
    "author": "Boop",
    "icon": "indent",
    "tags": "indent,spaces,format"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => '  ' + line).join("\n");
  } catch (error) {
    state.postError("Failed to indent lines");
  }
}
