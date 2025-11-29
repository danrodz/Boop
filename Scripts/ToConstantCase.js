/**
  {
    "api": 1,
    "name": "To CONSTANT_CASE",
    "description": "Converts text to CONSTANT_CASE (screaming snake)",
    "author": "Boop",
    "icon": "textformat",
    "tags": "constant,screaming,snake,case,convert,uppercase"
  }
**/

function main(state) {
  state.text = state.text
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toUpperCase();
  
  state.postInfo("Converted to CONSTANT_CASE");
}
