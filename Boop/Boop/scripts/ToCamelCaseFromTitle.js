/**
  {
    "api": 1,
    "name": "Title to camelCase",
    "description": "Converts title case or space-separated words to camelCase",
    "author": "Boop",
    "icon": "type",
    "tags": "camel,case,convert,title"
  }
**/

function main(state) {
  const lodash = require("@boop/lodash.boop");

  try {
    // First convert to camelCase using lodash
    state.text = lodash.camelCase(state.text);
  } catch (error) {
    state.postError("Failed to convert to camelCase");
  }
}
