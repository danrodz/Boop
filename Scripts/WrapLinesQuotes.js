/**
  {
    "api": 1,
    "name": "Wrap Lines (Quotes)",
    "description": "Wraps each line in double quotes",
    "author": "Boop",
    "icon": "text.quote",
    "tags": "wrap,quotes,lines,string"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.map(line => `"${line.replace(/"/g, '\\"')}"`).join('\n');
}
