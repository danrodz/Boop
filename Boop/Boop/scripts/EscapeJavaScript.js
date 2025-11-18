/**
  {
    "api": 1,
    "name": "Escape JavaScript String",
    "description": "Escapes special characters for JavaScript strings",
    "author": "Boop",
    "icon": "quote",
    "tags": "escape,javascript,js,string,quotes"
  }
**/

function main(state) {
  try {
    state.text = state.text
      .replace(/\\/g, '\\\\')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\f/g, '\\f')
      .replace(/\b/g, '\\b')
      .replace(/\v/g, '\\v')
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'")
      .replace(/\0/g, '\\0');
  } catch (error) {
    state.postError("Failed to escape JavaScript string");
  }
}
