/**
  {
    "api": 1,
    "name": "Make Text Italic",
    "description": "Wraps text in italic markers",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "markdown,format,convert,documentation"
  }
**/

function main(state) {
  state.text = \`*\${state.text}*\`;
}
