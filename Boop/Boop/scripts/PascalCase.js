/**
  {
    "api": 1,
    "name": "Pascal Case",
    "description": "Converts text to PascalCase (upper camel case)",
    "author": "Boop",
    "icon": "type",
    "tags": "pascal,case,convert,upper,camel"
  }
**/

function main(state) {
  const lodash = require("@boop/lodash.boop");

  try {
    // Convert to PascalCase (same as startCase but without spaces)
    state.text = lodash.startCase(state.text).replace(/ /g, '');
  } catch (error) {
    state.postError("Failed to convert to PascalCase");
  }
}
