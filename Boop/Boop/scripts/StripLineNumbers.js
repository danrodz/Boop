/**
{
  "api": 1,
  "name": "Remove Line Numbers",
  "description": "Removes line numbers from start",
  "author": "Boop",
  "icon": "scissors",
  "tags": "strip,remove,numbers"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const stripped = lines.map(line => line.replace(/^\d+\s+/, ''));
  state.text = stripped.join('\n');
}
