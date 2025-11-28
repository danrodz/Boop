/**
{
  "api": 1,
  "name": "Keep Only Letters",
  "description": "Removes everything except letters",
  "author": "Boop",
  "icon": "textformat",
  "tags": "letters,keep,filter"
}
**/

function main(state) {
  state.text = state.text.replace(/[^a-zA-Z]/g, '');
}
