/**
  {
    "api": 1,
    "name": "Sort Lines by Length",
    "description": "Sorts lines by their length (shortest to longest)",
    "author": "Boop",
    "icon": "sort",
    "tags": "sort,lines,length,size"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    lines.sort((a, b) => a.length - b.length);
    state.text = lines.join("\n");
  } catch (error) {
    state.postError("Failed to sort lines by length");
  }
}
