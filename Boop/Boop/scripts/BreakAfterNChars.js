/**
  {
    "api": 1,
    "name": "Add Line Break After N Characters",
    "description": "Inserts line breaks after every N characters (first line is N)",
    "author": "Boop",
    "icon": "return",
    "tags": "wrap,break,split,chunk,width"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");

    if (lines.length < 2) {
      state.postError("Need at least 2 lines: first line is the character count (e.g., '80')");
      return;
    }

    const width = parseInt(lines[0].trim(), 10);

    if (isNaN(width) || width <= 0) {
      state.postError("First line must be a positive number");
      return;
    }

    const content = lines.slice(1).join("\n");
    const result = [];

    for (let i = 0; i < content.length; i += width) {
      result.push(content.substring(i, i + width));
    }

    state.text = result.join("\n");
  } catch (error) {
    state.postError("Failed to add line breaks: " + error.message);
  }
}
