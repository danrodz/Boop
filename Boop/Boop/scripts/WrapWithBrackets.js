/**
  {
    "api": 1,
    "name": "Wrap with Brackets",
    "description": "Wraps each line with square brackets",
    "author": "Boop",
    "icon": "brackets",
    "tags": "wrap,brackets,square,format"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => '[' + line + ']').join("\n");
  } catch (error) {
    state.postError("Failed to wrap with brackets");
  }
}
