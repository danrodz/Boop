/**
{
  "api": 1,
  "name": "Spaces to Tabs",
  "description": "Converts 4 spaces to tabs",
  "author": "Boop",
  "icon": "arrow.right",
  "tags": "spaces,tabs,convert"
}
**/

function main(state) {
  state.text = state.text.replace(/ {4}/g, '\t');
}
