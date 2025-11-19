/**
{
  "api": 1,
  "name": "Add Star Prefix",
  "description": "Adds asterisk (*) to each line",
  "author": "Boop",
  "icon": "star",
  "tags": "star,asterisk,list,prefix"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const starred = lines.map(line => '* ' + line);
  state.text = starred.join('\n');
}
