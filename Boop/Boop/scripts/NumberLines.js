/**
{
  "api": 1,
  "name": "Add Line Numbers",
  "description": "Adds line numbers at start",
  "author": "Boop",
  "icon": "number",
  "tags": "line,numbers,index"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const numbered = lines.map((line, i) => (i + 1) + ' ' + line);
  state.text = numbered.join('\n');
}
