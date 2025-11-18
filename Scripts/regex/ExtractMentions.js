/**
  {
    "api": 1,
    "name": "Extract @Mentions",
    "description": "Extracts all @mentions",
    "author": "Boop",
    "icon": "magnifyingglass",
    "tags": "regex,extract,pattern,match"
  }
**/

function main(state) {
  const mentionRegex = /@[a-zA-Z0-9_]+/g;
  const mentions = state.text.match(mentionRegex) || [];
  state.text = mentions.join('\n');
}
