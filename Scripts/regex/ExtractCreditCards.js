/**
  {
    "api": 1,
    "name": "Extract Credit Card Numbers",
    "description": "Extracts credit card number patterns",
    "author": "Boop",
    "icon": "magnifyingglass",
    "tags": "regex,extract,pattern,match"
  }
**/

function main(state) {
  const ccRegex = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g;
  const cards = state.text.match(ccRegex) || [];
  state.text = cards.join('\n');
}
