/**
{
  "api": 1,
  "name": "Encode HTML Entities (All)",
  "description": "Encodes all characters as HTML entities",
  "author": "Boop",
  "icon": "textformat",
  "tags": "html,entities,encode,all"
}
**/

function main(state) {
  let result = '';
  for (let i = 0; i < state.text.length; i++) {
    const code = state.text.charCodeAt(i);
    result += '&#' + code + ';';
  }
  state.text = result;
}
