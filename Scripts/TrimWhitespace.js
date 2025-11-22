/**
  {
    "api": 1,
    "name": "Trim Whitespace",
    "description": "Trims leading/trailing whitespace from each line",
    "author": "Boop",
    "icon": "scissors",
    "tags": "trim,whitespace,clean,lines"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.map(line => line.trim()).join('\n');
}
