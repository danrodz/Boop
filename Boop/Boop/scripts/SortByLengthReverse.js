/**
  {
    "api": 1,
    "name": "Sort Lines by Length (Reverse)",
    "description": "Sorts lines by their length (longest to shortest)",
    "author": "Boop",
    "icon": "sort",
    "tags": "sort,lines,length,size,reverse"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    lines.sort((a, b) => b.length - a.length);
    state.text = lines.join("\n");
  } catch (error) {
    state.postError("Failed to sort lines by length");
  }
}
