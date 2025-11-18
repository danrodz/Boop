/**
{
  "api": 1,
  "name": "JSON String Escape",
  "description": "Escapes text for use in JSON strings",
  "author": "Boop",
  "icon": "textformat.characters",
  "tags": "json,escape,quote"
}
**/

function main(state) {
  state.text = JSON.stringify(state.text).slice(1, -1);
}
