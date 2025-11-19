/**
  {
    "api": 1,
    "name": "Convert to Blockquote",
    "description": "Converts lines to Markdown blockquote",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "markdown,format,convert,documentation"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.map(line => '> ' + line).join('\n');
}
