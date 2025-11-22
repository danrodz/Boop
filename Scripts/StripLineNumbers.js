/**
  {
    "api": 1,
    "name": "Strip Line Numbers",
    "description": "Removes line numbers from text",
    "author": "Boop",
    "icon": "list.bullet",
    "tags": "strip,remove,lines,numbers"
  }
**/

function main(state) {
  const lines = state.text.split('\n');

  const stripped = lines.map(line => {
    // Remove common line number formats: "1: ", "1. ", "1) ", "  1: ", etc.
    return line.replace(/^\s*\d+[\.\:\)\]\-]\s*/, '');
  });

  state.text = stripped.join('\n');
}
