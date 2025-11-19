/**
{
  "api": 1,
  "name": "Extract Quoted Strings",
  "description": "Extracts text within quotes",
  "author": "Boop",
  "icon": "quote",
  "tags": "extract,quotes,strings"
}
**/

function main(state) {
  const matches = state.text.match(/"([^"]*)"|'([^']*)'/g) || [];
  const extracted = matches.map(m => m.slice(1, -1));
  state.text = extracted.join('\n');
}
