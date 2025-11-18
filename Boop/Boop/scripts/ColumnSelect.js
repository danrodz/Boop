/**
  {
    "api": 1,
    "name": "Column Select (Vertical Cut)",
    "description": "Extracts characters at specific column positions (first line: start-end positions, e.g., 5-10)",
    "author": "Boop",
    "icon": "columns",
    "tags": "column,select,extract,vertical,cut,substring"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");

    if (lines.length < 2) {
      state.postError("Need at least 2 lines: first line format 'start-end' (e.g., '0-5' or '10-20')");
      return;
    }

    const rangeStr = lines[0].trim();
    const content = lines.slice(1);

    // Parse range (0-indexed)
    const match = rangeStr.match(/^(\d+)-(\d+)$/);
    if (!match) {
      state.postError("Invalid range format. Use 'start-end' (e.g., '0-5')");
      return;
    }

    const start = parseInt(match[1], 10);
    const end = parseInt(match[2], 10);

    if (start > end) {
      state.postError("Start position must be less than or equal to end position");
      return;
    }

    const result = content.map(line => line.substring(start, end + 1));
    state.text = result.join("\n");
  } catch (error) {
    state.postError("Failed to extract column: " + error.message);
  }
}
