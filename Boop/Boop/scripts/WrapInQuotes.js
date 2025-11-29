/**
{
  "api": 1,
  "name": "Wrap Lines in Double Quotes",
  "description": "Wraps each line in double quotes",
  "author": "Boop",
  "icon": "quote",
  "tags": "wrap,quotes,lines"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const wrapped = lines.map(line => `"${line}"`);
  state.text = wrapped.join('\n');
}
