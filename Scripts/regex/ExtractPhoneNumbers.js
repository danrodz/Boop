/**
  {
    "api": 1,
    "name": "Extract Phone Numbers",
    "description": "Extracts phone numbers (US format)",
    "author": "Boop",
    "icon": "magnifyingglass",
    "tags": "regex,extract,pattern,match"
  }
**/

function main(state) {
  const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
  const phones = state.text.match(phoneRegex) || [];
  state.text = phones.join('\n');
}
