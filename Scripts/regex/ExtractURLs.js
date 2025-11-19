/**
  {
    "api": 1,
    "name": "Extract URLs",
    "description": "Extracts all URLs",
    "author": "Boop",
    "icon": "magnifyingglass",
    "tags": "regex,extract,pattern,match"
  }
**/

function main(state) {
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = state.text.match(urlRegex) || [];
  state.text = urls.join('\n');
}
