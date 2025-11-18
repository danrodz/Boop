/**
  {
    "api": 1,
    "name": "Markdown to Plain Text",
    "description": "Removes all Markdown formatting",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "markdown,format,convert,documentation"
  }
**/

function main(state) {
  let text = state.text;
  text = text.replace(/^#+\s+/gm, '');
  text = text.replace(/\*\*(.+?)\*\*/g, '$1');
  text = text.replace(/\*(.+?)\*/g, '$1');
  text = text.replace(/\[(.+?)\]\(.+?\)/g, '$1');
  text = text.replace(/^[>-]\s+/gm, '');
  text = text.replace(/`(.+?)`/g, '$1');
  state.text = text;
}
