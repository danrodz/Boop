/**
  {
    "api": 1,
    "name": "Find and Replace",
    "description": "Find and replace text (first line: find, second line: replace)",
    "author": "Boop",
    "icon": "search",
    "tags": "find,replace,search,substitute"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");

    if (lines.length < 3) {
      state.postError("Need at least 3 lines: find pattern, replacement, then content");
      return;
    }

    const findPattern = lines[0];
    const replacement = lines[1];
    const content = lines.slice(2).join("\n");

    // Try as literal first
    if (content.includes(findPattern)) {
      state.text = content.replace(new RegExp(escapeRegex(findPattern), 'g'), replacement);
    } else {
      // Try as regex
      try {
        state.text = content.replace(new RegExp(findPattern, 'g'), replacement);
      } catch (e) {
        state.postError("Pattern not found and invalid as regex: " + e.message);
      }
    }
  } catch (error) {
    state.postError("Failed to find and replace: " + error.message);
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
