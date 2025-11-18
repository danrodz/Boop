/**
  {
    "api": 1,
    "name": "Unindent Lines (Remove 2 Spaces)",
    "description": "Removes 2 spaces of indentation from each line",
    "author": "Boop",
    "icon": "outdent",
    "tags": "unindent,outdent,spaces,format"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => line.replace(/^  /, '')).join("\n");
  } catch (error) {
    state.postError("Failed to unindent lines");
  }
}
