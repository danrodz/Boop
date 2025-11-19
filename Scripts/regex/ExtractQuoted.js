/**
  {
    "api": 1,
    "name": "Extract Quoted Text",
    "description": "Extracts text within quotes",
    "author": "Boop",
    "icon": "magnifyingglass",
    "tags": "regex,extract,pattern,match"
  }
**/

function main(state) {
  const quotedRegex = /"([^"]+)"|'([^']+)'/g;
  const matches = [...state.text.matchAll(quotedRegex)];
  const quoted = matches.map(m => m[1] || m[2]);
  state.text = quoted.join('\n');
}
