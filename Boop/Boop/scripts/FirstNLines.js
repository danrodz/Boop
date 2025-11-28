/**
{
  "api": 1,
  "name": "First N Lines",
  "description": "Gets first N lines (count on line 1)",
  "author": "Boop",
  "icon": "arrow.up",
  "tags": "head,first,lines"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const n = parseInt(lines[0]) || 10;
  const result = lines.slice(1, n + 1);
  state.text = result.join('\n');
}
