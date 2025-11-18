/**
  {
    "api": 1,
    "name": "CSS Variables to SASS",
    "description": "Convert CSS custom properties to SASS variables",
    "author": "Boop",
    "icon": "palette",
    "tags": "css,sass,variables,convert"
  }
**/

function main(state) {
  let result = state.text;

  // --variable-name: value -> $variable-name: value
  result = result.replace(/--([a-zA-Z0-9-]+):/g, '$$$1:');

  // var(--variable-name) -> $variable-name
  result = result.replace(/var\(--([a-zA-Z0-9-]+)\)/g, '$$$1');

  // Remove :root { } wrapper if present
  result = result.replace(/:root\s*\{/, '');
  result = result.replace(/\}\s*$/, '');

  state.text = result.trim();
  state.postInfo("Converted CSS variables to SASS");
}
