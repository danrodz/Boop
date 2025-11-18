/**
  {
    "api": 1,
    "name": "Convert to Code Block",
    "description": "Wraps text in Markdown code block",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "markdown,format,convert,documentation"
  }
**/

function main(state) {
  state.text = \`\\`\\`\\`\n\${state.text}\n\\`\\`\\`\`;
}
