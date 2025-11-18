/**
  {
    "api": 1,
    "name": "Toggle: snake_case ⇄ camelCase",
    "description": "Toggles between snake_case and camelCase",
    "author": "Boop",
    "icon": "swap",
    "tags": "toggle,snake,camel,case,convert"
  }
**/

function main(state) {
  const lodash = require("@boop/lodash.boop");

  try {
    // Check if text contains underscores (likely snake_case)
    if (/_/.test(state.text)) {
      state.text = lodash.camelCase(state.text);
    } else {
      state.text = lodash.snakeCase(state.text);
    }
  } catch (error) {
    state.postError("Failed to toggle case");
  }
}
