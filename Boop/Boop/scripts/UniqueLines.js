/**
  {
    "api": 1,
    "name": "Unique Lines",
    "description": "Keeps only unique lines (removes all duplicates, keeping first occurrence)",
    "author": "Boop",
    "icon": "filter",
    "tags": "unique,distinct,duplicates,deduplicate"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    const seen = new Set();
    const unique = [];

    for (const line of lines) {
      if (!seen.has(line)) {
        seen.add(line);
        unique.push(line);
      }
    }

    state.text = unique.join("\n");

    const removed = lines.length - unique.length;
    if (removed > 0) {
      state.postInfo(`Removed ${removed} duplicate line(s)`);
    }
  } catch (error) {
    state.postError("Failed to get unique lines: " + error.message);
  }
}
