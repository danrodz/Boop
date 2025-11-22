/**
  {
    "api": 1,
    "name": "snake_case to camelCase",
    "description": "Converts snake_case to camelCase",
    "author": "Boop",
    "icon": "textformat",
    "tags": "snake,camel,case,convert,naming"
  }
**/

function main(state) {
  state.text = state.text
    .toLowerCase()
    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  
  state.postInfo("Converted to camelCase");
}
