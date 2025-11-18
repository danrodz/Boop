/**
  {
    "api": 1,
    "name": "Suffix Lines (Use First Line)",
    "description": "Adds a suffix to all lines (first line is the suffix)",
    "author": "Boop",
    "icon": "text",
    "tags": "suffix,append,lines,add"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    if (lines.length < 2) {
      state.postError("Need at least 2 lines: first line is the suffix");
      return;
    }

    const suffix = lines[0];
    const result = lines.slice(1).map(line => line + suffix);
    state.text = result.join("\n");
  } catch (error) {
    state.postError("Failed to suffix lines");
  }
}
