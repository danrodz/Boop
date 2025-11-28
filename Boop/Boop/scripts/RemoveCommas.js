/**
{
  "api": 1,
  "name": "Remove Thousands Separators",
  "description": "Removes commas from numbers",
  "author": "Boop",
  "icon": "scissors",
  "tags": "comma,remove,numbers"
}
**/

function main(state) {
  state.text = state.text.replace(/,/g, '');
}
