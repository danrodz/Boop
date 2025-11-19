/**
{
  "api": 1,
  "name": "Uppercase First Letter",
  "description": "Uppercases first letter of text",
  "author": "Boop",
  "icon": "textformat",
  "tags": "uppercase,first,letter"
}
**/

function main(state) {
  if (state.text.length > 0) {
    state.text = state.text.charAt(0).toUpperCase() + state.text.slice(1);
  }
}
