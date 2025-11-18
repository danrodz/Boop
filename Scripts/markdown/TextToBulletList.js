/**
  {
    "api": 1,
    "name": "Convert to Bullet List",
    "description": "Converts lines to Markdown bullet list",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "markdown,format,convert,documentation"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.map(line => line.trim() ? '- ' + line : '').join('\n');
}
