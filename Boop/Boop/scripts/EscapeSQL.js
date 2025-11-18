/**
  {
    "api": 1,
    "name": "Escape SQL String",
    "description": "Escapes single quotes for SQL strings",
    "author": "Boop",
    "icon": "quote",
    "tags": "escape,sql,string,quotes"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/'/g, "''");
  } catch (error) {
    state.postError("Failed to escape SQL string");
  }
}
