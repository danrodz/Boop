/**
  {
    "api": 1,
    "name": "Count Occurrences",
    "description": "Counts occurrences of a pattern (first line is pattern, rest is content)",
    "author": "Boop",
    "icon": "hash",
    "tags": "count,occurrences,find,search,frequency"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");

    if (lines.length < 2) {
      state.postError("Need at least 2 lines: first line is the pattern to count");
      return;
    }

    const pattern = lines[0];
    const content = lines.slice(1).join("\n");

    // Count as literal string
    const regex = new RegExp(escapeRegex(pattern), 'g');
    const matches = content.match(regex);
    const count = matches ? matches.length : 0;

    state.text = count.toString();
    state.postInfo(`Found ${count} occurrence(s) of "${pattern}"`);
  } catch (error) {
    state.postError("Failed to count occurrences: " + error.message);
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
