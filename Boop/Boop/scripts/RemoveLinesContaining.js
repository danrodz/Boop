/**
  {
    "api": 1,
    "name": "Remove Lines Containing Pattern",
    "description": "Removes all lines containing a pattern (first line is the pattern)",
    "author": "Boop",
    "icon": "trash",
    "tags": "remove,filter,exclude,delete"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");

    if (lines.length < 2) {
      state.postError("Need at least 2 lines: first line is the pattern to remove");
      return;
    }

    const pattern = lines[0];
    const content = lines.slice(1);

    const filtered = content.filter(line => !line.includes(pattern));
    state.text = filtered.join("\n");
  } catch (error) {
    state.postError("Failed to remove lines: " + error.message);
  }
}
