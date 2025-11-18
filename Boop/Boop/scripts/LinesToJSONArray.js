/**
{
  "api": 1,
  "name": "Lines to JSON Array",
  "description": "Converts lines to JSON array",
  "author": "Boop",
  "icon": "list.bullet",
  "tags": "json,array,lines,join"
}
**/

function main(state) {
  const lines = state.text.split('\n').filter(l => l.trim());
  state.text = JSON.stringify(lines, null, 2);
}
