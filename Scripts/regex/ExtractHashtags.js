/**
  {
    "api": 1,
    "name": "Extract Hashtags",
    "description": "Extracts all hashtags",
    "author": "Boop",
    "icon": "magnifyingglass",
    "tags": "regex,extract,pattern,match"
  }
**/

function main(state) {
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  const hashtags = state.text.match(hashtagRegex) || [];
  state.text = hashtags.join('\n');
}
