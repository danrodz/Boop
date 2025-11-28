/**
  {
    "api": 1,
    "name": "SASS Variables to CSS",
    "description": "Convert SASS variables to CSS custom properties",
    "author": "Boop",
    "icon": "palette",
    "tags": "sass,css,variables,convert"
  }
**/

function main(state) {
  let result = state.text;

  // $variable-name: value -> --variable-name: value
  result = result.replace(/\$([a-zA-Z0-9-]+):/g, '--$1:');

  // Usage: $variable-name -> var(--variable-name)
  result = result.replace(/\$([a-zA-Z0-9-]+)(?!:)/g, 'var(--$1)');

  // Wrap in :root
  if (!result.includes(':root')) {
    const lines = result.split('\n').map(l => '  ' + l).join('\n');
    result = `:root {\n${lines}\n}`;
  }

  state.text = result;
  state.postInfo("Converted SASS variables to CSS");
}
