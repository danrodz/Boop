/**
{
  "api": 1,
  "name": "Join with Comma",
  "description": "Joins lines with commas",
  "author": "Boop",
  "icon": "arrow.merge",
  "tags": "join,comma,csv"
}
**/

function main(state) {
  const lines = state.text.split('\n').filter(l => l.trim());
  state.text = lines.join(', ');
}
