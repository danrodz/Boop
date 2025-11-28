/**
{
  "api": 1,
  "name": "Join with Pipe",
  "description": "Joins lines with pipe character",
  "author": "Boop",
  "icon": "arrow.merge",
  "tags": "join,pipe,delimiter"
}
**/

function main(state) {
  const lines = state.text.split('\n').filter(l => l.trim());
  state.text = lines.join(' | ');
}
