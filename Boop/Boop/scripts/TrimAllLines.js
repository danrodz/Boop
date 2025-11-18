/**
  {
    "api": 1,
    "name": "Trim All Lines",
    "description": "Trims whitespace from the start and end of all lines",
    "author": "Boop",
    "icon": "trim",
    "tags": "trim,whitespace,lines,clean"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    state.text = lines.map(line => line.trim()).join("\n");
  } catch (error) {
    state.postError("Failed to trim all lines");
  }
}
