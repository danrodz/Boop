/**
  {
    "api": 1,
    "name": "Make Text Bold",
    "description": "Wraps text in bold markers",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "markdown,format,convert,documentation"
  }
**/

function main(state) {
  state.text = \`**\${state.text}**\`;
}
