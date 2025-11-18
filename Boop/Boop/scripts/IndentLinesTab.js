/**
  {
    "api": 1,
    "name": "Indent Lines (Add Tab)",
    "description": "Adds a tab of indentation to each line",
    "author": "Boop",
    "icon": "indent",
    "tags": "indent,tab,format"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => '\t' + line).join("\n");
  } catch (error) {
    state.postError("Failed to indent lines");
  }
}
