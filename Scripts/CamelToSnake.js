/**
  {
    "api": 1,
    "name": "CamelCase to snake_case",
    "description": "Converts camelCase or PascalCase to snake_case",
    "author": "Boop",
    "icon": "textformat",
    "tags": "camel,snake,case,convert,naming"
  }
**/

function main(state) {
  state.text = state.text
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .toLowerCase();
  
  state.postInfo("Converted to snake_case");
}
