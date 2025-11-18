/**
  {
    "api": 1,
    "name": "Insert at Position",
    "description": "Inserts text at specific positions in each line (first line: position, second: text to insert)",
    "author": "Boop",
    "icon": "text",
    "tags": "insert,position,column,add"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");

    if (lines.length < 3) {
      state.postError("Need at least 3 lines: position, text to insert, then content");
      return;
    }

    const position = parseInt(lines[0].trim(), 10);
    const insertText = lines[1];
    const content = lines.slice(2);

    if (isNaN(position) || position < 0) {
      state.postError("Position must be a non-negative number");
      return;
    }

    const result = content.map(line => {
      if (position > line.length) {
        return line + ' '.repeat(position - line.length) + insertText;
      }
      return line.slice(0, position) + insertText + line.slice(position);
    });

    state.text = result.join("\n");
  } catch (error) {
    state.postError("Failed to insert text: " + error.message);
  }
}
