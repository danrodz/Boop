/**
{
  "api": 1,
  "name": "Extract from Brackets",
  "description": "Extracts text within [...]",
  "author": "Boop",
  "icon": "textformat",
  "tags": "extract,brackets,square"
}
**/

function main(state) {
  const matches = state.text.match(/\[([^\]]*)\]/g) || [];
  const extracted = matches.map(m => m.slice(1, -1));
  state.text = extracted.join('\n');
}
