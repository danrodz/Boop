/**
{
  "api": 1,
  "name": "Remove HTML Line Breaks",
  "description": "Removes HTML line breaks (<br>) and replaces with newlines",
  "author": "Boop",
  "icon": "scissors",
  "tags": "html,br,remove,convert"
}
**/

function main(state) {
  state.text = state.text.replace(/<br\s*\/?>/gi, '\n');
}
