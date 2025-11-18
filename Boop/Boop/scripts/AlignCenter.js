/**
  {
    "api": 1,
    "name": "Align Center",
    "description": "Centers all lines by padding with spaces",
    "author": "Boop",
    "icon": "align-center",
    "tags": "align,center,format,whitespace"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    const maxLength = Math.max(...lines.map(line => line.trim().length));
    state.text = lines.map(line => {
      const trimmed = line.trim();
      const leftPad = Math.floor((maxLength - trimmed.length) / 2);
      const rightPad = maxLength - trimmed.length - leftPad;
      return ' '.repeat(leftPad) + trimmed + ' '.repeat(rightPad);
    }).join("\n");
  } catch (error) {
    state.postError("Failed to align center");
  }
}
