/**
  {
    "api": 1,
    "name": "Sentence Count",
    "description": "Counts sentences in text",
    "author": "Boop",
    "icon": "textformat.abc",
    "tags": "count,sentences,statistics,analysis"
  }
**/

function main(state) {
  const sentences = state.text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  state.text = `Sentences: ${sentences}`;
}
