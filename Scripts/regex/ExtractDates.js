/**
  {
    "api": 1,
    "name": "Extract Dates",
    "description": "Extracts date patterns",
    "author": "Boop",
    "icon": "magnifyingglass",
    "tags": "regex,extract,pattern,match"
  }
**/

function main(state) {
  const dateRegex = /\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/g;
  const dates = state.text.match(dateRegex) || [];
  state.text = dates.join('\n');
}
