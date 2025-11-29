/**
{
  "api": 1,
  "name": "Comment Lines (//)",
  "description": "Adds // at start of each line",
  "author": "Boop",
  "icon": "number.square",
  "tags": "comment,code,slash"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const commented = lines.map(line => '// ' + line);
  state.text = commented.join('\n');
}
