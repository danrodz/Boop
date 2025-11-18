/**
  {
    "api": 1,
    "name": "Wrap with Braces",
    "description": "Wraps each line with curly braces",
    "author": "Boop",
    "icon": "brackets",
    "tags": "wrap,braces,curly,format"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => '{' + line + '}').join("\n");
  } catch (error) {
    state.postError("Failed to wrap with braces");
  }
}
