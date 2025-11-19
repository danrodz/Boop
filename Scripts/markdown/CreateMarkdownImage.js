/**
  {
    "api": 1,
    "name": "Create Markdown Image",
    "description": "Creates Markdown image",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "markdown,format,convert,documentation"
  }
**/

function main(state) {
  const url = state.text.trim();
  state.text = \`![Alt Text](\${url})\`;
}
