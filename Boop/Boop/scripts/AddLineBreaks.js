/**
{
  "api": 1,
  "name": "Add Line Breaks",
  "description": "Adds HTML line breaks (<br>) at line ends",
  "author": "Boop",
  "icon": "return",
  "tags": "html,br,linebreak,convert"
}
**/

function main(state) {
  state.text = state.text.split('\n').join('<br>\n');
}
