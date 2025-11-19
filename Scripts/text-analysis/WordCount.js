/**
  {
    "api": 1,
    "name": "Word Count",
    "description": "Counts total words in text",
    "author": "Boop",
    "icon": "textformat.123",
    "tags": "count,words,statistics,analysis"
  }
**/

function main(state) {
  const words = state.text.trim().split(/\s+/).filter(w => w.length > 0);
  state.text = `Word count: ${words.length}`;
}
