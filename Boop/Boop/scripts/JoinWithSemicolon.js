/**
{
  "api": 1,
  "name": "Join with Semicolon",
  "description": "Joins lines with semicolons",
  "author": "Boop",
  "icon": "arrow.merge",
  "tags": "join,semicolon"
}
**/

function main(state) {
  const lines = state.text.split('\n').filter(l => l.trim());
  state.text = lines.join('; ');
}
