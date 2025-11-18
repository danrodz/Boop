/**
{
  "api": 1,
  "name": "Sentence Case",
  "description": "Converts to sentence case (first letter capital)",
  "author": "Boop",
  "icon": "textformat.abc",
  "tags": "sentence,case,capitalize"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const result = lines.map(line => {
    if (!line) return line;
    return line.charAt(0).toUpperCase() + line.slice(1).toLowerCase();
  });

  state.text = result.join('\n');
}
