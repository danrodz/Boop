/**
  {
    "api": 1,
    "name": "Align Left",
    "description": "Removes leading whitespace from all lines",
    "author": "Boop",
    "icon": "align-left",
    "tags": "align,left,format,whitespace"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => line.trimStart()).join("\n");
  } catch (error) {
    state.postError("Failed to align left");
  }
}
