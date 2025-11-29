/**
{
  "api": 1,
  "name": "Unwrap Lines",
  "description": "Joins all lines into single line with spaces",
  "author": "Boop",
  "icon": "text.alignleft",
  "tags": "unwrap,join,flatten,single"
}
**/

function main(state) {
  state.text = state.text.split('\n').map(l => l.trim()).join(' ');
}
