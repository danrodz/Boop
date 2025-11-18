/**
  {
    "api": 1,
    "name": "Line Count",
    "description": "Counts total lines in text",
    "author": "Boop",
    "icon": "list.number",
    "tags": "count,lines,statistics,analysis"
  }
**/

function main(state) {
  const lines = state.text.split('\n').length;
  const nonEmpty = state.text.split('\n').filter(l => l.trim().length > 0).length;
  state.text = `Lines: ${lines}\nNon-empty lines: ${nonEmpty}`;
}
