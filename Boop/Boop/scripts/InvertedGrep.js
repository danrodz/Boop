/**
  {
    "api": 1,
    "name": "Inverted Grep (Exclude Pattern)",
    "description": "Keeps only lines NOT matching the pattern (uses first line as pattern)",
    "author": "Boop",
    "icon": "filter",
    "tags": "grep,filter,inverted,exclude,pattern"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    if (lines.length < 2) {
      state.postError("Need at least 2 lines: first line is the pattern");
      return;
    }

    const pattern = lines[0];

    // Validate regex pattern
    let regex;
    try {
      regex = new RegExp(pattern);
    } catch (e) {
      state.postError("Invalid regex pattern: " + e.message);
      return;
    }

    const filtered = lines.slice(1).filter(line => !regex.test(line));
    state.text = filtered.join("\n");
  } catch (error) {
    state.postError("Failed to invert grep: " + error.message);
  }
}
