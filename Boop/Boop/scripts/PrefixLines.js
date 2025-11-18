/**
  {
    "api": 1,
    "name": "Prefix Lines (Use First Line)",
    "description": "Adds a prefix to all lines (first line is the prefix)",
    "author": "Boop",
    "icon": "text",
    "tags": "prefix,prepend,lines,add"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    if (lines.length < 2) {
      state.postError("Need at least 2 lines: first line is the prefix");
      return;
    }

    const prefix = lines[0];
    const result = lines.slice(1).map(line => prefix + line);
    state.text = result.join("\n");
  } catch (error) {
    state.postError("Failed to prefix lines");
  }
}
