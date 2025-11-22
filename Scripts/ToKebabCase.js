/**
  {
    "api": 1,
    "name": "To kebab-case",
    "description": "Converts text to kebab-case",
    "author": "Boop",
    "icon": "textformat",
    "tags": "kebab,case,convert,naming,hyphen"
  }
**/

function main(state) {
  state.text = state.text
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
  
  state.postInfo("Converted to kebab-case");
}
