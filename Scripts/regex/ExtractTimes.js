/**
  {
    "api": 1,
    "name": "Extract Times",
    "description": "Extracts time patterns",
    "author": "Boop",
    "icon": "magnifyingglass",
    "tags": "regex,extract,pattern,match"
  }
**/

function main(state) {
  const timeRegex = /\b\d{1,2}:\d{2}(:\d{2})?(\s?[AP]M)?\b/gi;
  const times = state.text.match(timeRegex) || [];
  state.text = times.join('\n');
}
