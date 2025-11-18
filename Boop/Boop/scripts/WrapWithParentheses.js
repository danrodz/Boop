/**
  {
    "api": 1,
    "name": "Wrap with Parentheses",
    "description": "Wraps each line with parentheses",
    "author": "Boop",
    "icon": "brackets",
    "tags": "wrap,parentheses,brackets,format"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => '(' + line + ')').join("\n");
  } catch (error) {
    state.postError("Failed to wrap with parentheses");
  }
}
