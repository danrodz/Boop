/**
  {
    "api": 1,
    "name": "To PascalCase",
    "description": "Converts text to PascalCase",
    "author": "Boop",
    "icon": "textformat",
    "tags": "pascal,case,convert,naming,capitalize"
  }
**/

function main(state) {
  state.text = state.text
    .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
    .replace(/^(.)/, char => char.toUpperCase());
  
  state.postInfo("Converted to PascalCase");
}
