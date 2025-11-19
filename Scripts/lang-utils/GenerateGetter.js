/**
  {
    "api": 1,
    "name": "Generate Getter Method",
    "description": "Generates a getter method",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "code,programming,javascript,python,format"
  }
**/

function main(state) {
  const prop = state.text.trim();
  state.text = \`get \${prop}() {
  return this._\${prop};
}\`;
}
