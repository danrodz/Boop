/**
  {
    "api": 1,
    "name": "Align Right",
    "description": "Aligns all lines to the right by padding with spaces",
    "author": "Boop",
    "icon": "align-right",
    "tags": "align,right,format,whitespace"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    const maxLength = Math.max(...lines.map(line => line.trimEnd().length));
    state.text = lines.map(line => {
      const trimmed = line.trimEnd();
      return ' '.repeat(maxLength - trimmed.length) + trimmed;
    }).join("\n");
  } catch (error) {
    state.postError("Failed to align right");
  }
}
