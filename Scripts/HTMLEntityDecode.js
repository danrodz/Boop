/**
  {
    "api": 1,
    "name": "HTML Entity Decode",
    "description": "Decodes HTML entities (comprehensive)",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "html,decode,entities,unescape"
  }
**/

function main(state) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = state.text;
  state.text = textarea.value;
}
