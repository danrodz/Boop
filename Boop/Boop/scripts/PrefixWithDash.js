/**
{
  "api": 1,
  "name": "Add Dash Prefix",
  "description": "Adds dash (-) to each line",
  "author": "Boop",
  "icon": "minus",
  "tags": "dash,list,prefix"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const dashed = lines.map(line => '- ' + line);
  state.text = dashed.join('\n');
}
