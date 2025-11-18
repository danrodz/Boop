/**
  {
    "api": 1,
    "name": "Toggle: kebab-case ⇄ camelCase",
    "description": "Toggles between kebab-case and camelCase",
    "author": "Boop",
    "icon": "swap",
    "tags": "toggle,kebab,camel,case,convert"
  }
**/

function main(state) {
  const lodash = require("@boop/lodash.boop");

  try {
    // Check if text contains hyphens (likely kebab-case)
    if (/-/.test(state.text)) {
      state.text = lodash.camelCase(state.text);
    } else {
      state.text = lodash.kebabCase(state.text);
    }
  } catch (error) {
    state.postError("Failed to toggle case");
  }
}
