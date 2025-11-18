/**
  {
    "api": 1,
    "name": "Pad Lines to Width",
    "description": "Pads all lines to the same width (first line: width, second: padding char)",
    "author": "Boop",
    "icon": "align-left",
    "tags": "pad,width,align,format,fill"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");

    if (lines.length < 3) {
      state.postError("Need at least 3 lines: width, padding character, then content");
      return;
    }

    const width = parseInt(lines[0].trim(), 10);
    const padChar = lines[1].charAt(0) || ' ';
    const content = lines.slice(2);

    if (isNaN(width) || width <= 0) {
      state.postError("Width must be a positive number");
      return;
    }

    const padded = content.map(line => {
      if (line.length >= width) {
        return line;
      }
      return line + padChar.repeat(width - line.length);
    });

    state.text = padded.join("\n");
  } catch (error) {
    state.postError("Failed to pad lines: " + error.message);
  }
}
