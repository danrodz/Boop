/**
  {
    "api": 1,
    "name": "JavaScript Beautify (Basic)",
    "description": "Basic JavaScript formatting",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "code,programming,javascript,python,format"
  }
**/

function main(state) {
  let js = state.text;
  js = js.replace(/\{/g, ' {\n  ');
  js = js.replace(/\}/g, '\n}\n');
  js = js.replace(/;/g, ';\n  ');
  state.text = js;
}
