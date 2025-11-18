/**
  {
    "api": 1,
    "name": "CONSTANT_CASE",
    "description": "Converts text to CONSTANT_CASE (same as SCREAMING_SNAKE_CASE)",
    "author": "Boop",
    "icon": "type",
    "tags": "constant,case,upper,snake,screaming"
  }
**/

function main(state) {
  const lodash = require("@boop/lodash.boop");

  try {
    state.text = lodash.snakeCase(state.text).toUpperCase();
  } catch (error) {
    state.postError("Failed to convert to CONSTANT_CASE");
  }
}
