/**
  {
    "api": 1,
    "name": "Create Markdown Link",
    "description": "Creates Markdown link",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "markdown,format,convert,documentation"
  }
**/

function main(state) {
  const text = state.text.trim();
  state.text = \`[Link Text](\${text})\`;
}
