/**
  {
    "api": 1,
    "name": "Convert to Inline Code",
    "description": "Wraps text in backticks",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "markdown,format,convert,documentation"
  }
**/

function main(state) {
  state.text = \`\\`\${state.text}\\`\`;
}
