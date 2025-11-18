/**
  {
    "api": 1,
    "name": "Escape PHP String",
    "description": "Escapes special characters for PHP strings",
    "author": "Boop",
    "icon": "quote",
    "tags": "escape,php,string,quotes"
  }
**/

function main(state) {
  try {
    state.text = state.text
      .replace(/\\/g, '\\\\')
      .replace(/\$/g, '\\$')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'");
  } catch (error) {
    state.postError("Failed to escape PHP string");
  }
}
