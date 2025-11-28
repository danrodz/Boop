/**
{
  "api": 1,
  "name": "Last N Lines",
  "description": "Gets last N lines (count on line 1)",
  "author": "Boop",
  "icon": "arrow.down",
  "tags": "tail,last,lines"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const n = parseInt(lines[0]) || 10;
  const textLines = lines.slice(1);
  const result = textLines.slice(-n);
  state.text = result.join('\n');
}
