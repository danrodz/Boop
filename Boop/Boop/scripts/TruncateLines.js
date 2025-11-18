/**
{
  "api": 1,
  "name": "Truncate Lines",
  "description": "Truncates each line to 50 characters",
  "author": "Boop",
  "icon": "scissors",
  "tags": "truncate,cut,limit,shorten"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const truncated = lines.map(line => line.substring(0, 50));
  state.text = truncated.join('\n');
}
