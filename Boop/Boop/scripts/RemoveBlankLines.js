/**
  {
    "api": 1,
    "name": "Remove Blank Lines",
    "description": "Removes all blank/whitespace-only lines",
    "author": "Boop",
    "icon": "trash",
    "tags": "remove,blank,empty,lines,whitespace"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    const filtered = lines.filter(line => line.trim().length > 0);
    state.text = filtered.join("\n");
  } catch (error) {
    state.postError("Failed to remove blank lines");
  }
}
