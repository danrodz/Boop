/**
{
  "api": 1,
  "name": "Remove All Numbers",
  "description": "Removes all numbers from text",
  "author": "Boop",
  "icon": "scissors",
  "tags": "numbers,remove,digit"
}
**/

function main(state) {
  state.text = state.text.replace(/\d/g, '');
}
