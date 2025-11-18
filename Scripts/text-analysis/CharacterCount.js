/**
  {
    "api": 1,
    "name": "Character Count",
    "description": "Counts total characters in text",
    "author": "Boop",
    "icon": "textformat.123",
    "tags": "count,characters,statistics,analysis"
  }
**/

function main(state) {
  const chars = state.text.length;
  const noSpaces = state.text.replace(/\s/g, '').length;
  state.text = `Characters: ${chars}\nCharacters (no spaces): ${noSpaces}`;
}
