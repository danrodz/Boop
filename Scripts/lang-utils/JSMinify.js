/**
  {
    "api": 1,
    "name": "JavaScript Minify (Basic)",
    "description": "Basic JavaScript minification",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "code,programming,javascript,python,format"
  }
**/

function main(state) {
  let js = state.text;
  js = js.replace(/\/\/.*$/gm, '');
  js = js.replace(/\/\*[\s\S]*?\*\//g, '');
  js = js.replace(/\s{2,}/g, ' ');
  js = js.replace(/\n/g, '');
  state.text = js.trim();
}
