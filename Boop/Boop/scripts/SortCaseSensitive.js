/**
  {
    "api": 1,
    "name": "Sort Lines (Case Sensitive)",
    "description": "Sorts lines alphabetically with case sensitivity",
    "author": "Boop",
    "icon": "sort",
    "tags": "sort,lines,case,sensitive,alphabetical"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    lines.sort();
    state.text = lines.join("\n");
  } catch (error) {
    state.postError("Failed to sort lines");
  }
}
