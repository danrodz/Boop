/**
  {
    "api": 1,
    "name": "Wrap Lines in Quotes",
    "description": "Wraps each line in quotes",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.map(line => \`"\${line}"\`).join('\n');
}
