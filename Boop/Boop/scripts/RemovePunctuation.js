/**
{
  "api": 1,
  "name": "Remove Punctuation",
  "description": "Removes all punctuation from text",
  "author": "Boop",
  "icon": "scissors",
  "tags": "punctuation,remove"
}
**/

function main(state) {
  state.text = state.text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}
