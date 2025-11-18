/**
  {
    "api": 1,
    "name": "Bash Escape String",
    "description": "Escapes string for bash",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) {
  const escaped = state.text.replace(/(["\`$\\])/g, '\\$1');
  state.text = \`"\${escaped}"\`;
}
