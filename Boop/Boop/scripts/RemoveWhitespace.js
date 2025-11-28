/**
{
  "api": 1,
  "name": "Remove All Whitespace",
  "description": "Removes all whitespace from text",
  "author": "Boop",
  "icon": "scissors",
  "tags": "remove,whitespace,space"
}
**/

function main(state) {
  state.text = state.text.replace(/\s/g, '');
}
