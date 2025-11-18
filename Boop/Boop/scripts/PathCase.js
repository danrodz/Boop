/**
  {
    "api": 1,
    "name": "Path Case",
    "description": "Converts text to path/case format",
    "author": "Boop",
    "icon": "type",
    "tags": "path,case,convert,format"
  }
**/

function main(state) {
  const lodash = require("@boop/lodash.boop");

  try {
    // Convert to lowercase and join with forward slashes
    const words = lodash.words(state.text.replace(/[\/\-_]/g, ' '));
    state.text = words.map(w => w.toLowerCase()).join('/');
  } catch (error) {
    state.postError("Failed to convert to path/case");
  }
}
