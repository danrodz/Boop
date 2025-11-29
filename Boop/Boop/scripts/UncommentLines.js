/**
{
  "api": 1,
  "name": "Uncomment Lines (//)",
  "description": "Removes // from start of each line",
  "author": "Boop",
  "icon": "scissors",
  "tags": "uncomment,code,remove"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const uncommented = lines.map(line => line.replace(/^\/\/\s?/, ''));
  state.text = uncommented.join('\n');
}
