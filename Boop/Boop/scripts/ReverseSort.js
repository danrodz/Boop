/**
  {
    "api": 1,
    "name": "Reverse Sort Lines",
    "description": "Sorts lines in reverse alphabetical order",
    "author": "Boop",
    "icon": "sort",
    "tags": "sort,lines,reverse,alphabetical"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    lines.sort((a, b) => b.localeCompare(a));
    state.text = lines.join("\n");
  } catch (error) {
    state.postError("Failed to reverse sort lines");
  }
}
