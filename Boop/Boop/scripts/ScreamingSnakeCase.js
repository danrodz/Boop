/**
  {
    "api": 1,
    "name": "SCREAMING_SNAKE_CASE",
    "description": "Converts text to SCREAMING_SNAKE_CASE (uppercase snake_case)",
    "author": "Boop",
    "icon": "type",
    "tags": "screaming,snake,case,convert,upper,constant"
  }
**/

function main(state) {
  const lodash = require("@boop/lodash.boop");

  try {
    state.text = lodash.snakeCase(state.text).toUpperCase();
  } catch (error) {
    state.postError("Failed to convert to SCREAMING_SNAKE_CASE");
  }
}
