/**
  {
    "api": 1,
    "name": "Dot Case",
    "description": "Converts text to dot.case format",
    "author": "Boop",
    "icon": "type",
    "tags": "dot,case,convert,format"
  }
**/

function main(state) {
  const lodash = require("@boop/lodash.boop");

  try {
    // Convert to lowercase and join with dots
    const words = lodash.words(state.text.replace(/[.\-_]/g, ' '));
    state.text = words.map(w => w.toLowerCase()).join('.');
  } catch (error) {
    state.postError("Failed to convert to dot.case");
  }
}
