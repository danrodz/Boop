/**
  {
    "api": 1,
    "name": "Paragraph Count",
    "description": "Counts paragraphs in text",
    "author": "Boop",
    "icon": "text.alignleft",
    "tags": "count,paragraphs,statistics,analysis"
  }
**/

function main(state) {
  const paragraphs = state.text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
  state.text = `Paragraphs: ${paragraphs}`;
}
