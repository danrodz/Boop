/**
{
  "api": 1,
  "name": "Lowercase First Letter",
  "description": "Lowercases first letter of text",
  "author": "Boop",
  "icon": "textformat",
  "tags": "lowercase,first,letter"
}
**/

function main(state) {
  if (state.text.length > 0) {
    state.text = state.text.charAt(0).toLowerCase() + state.text.slice(1);
  }
}
