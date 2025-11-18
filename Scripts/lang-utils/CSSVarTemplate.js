/**
  {
    "api": 1,
    "name": "CSS Variable Template",
    "description": "Creates CSS variable",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) {
  const varName = state.text.trim();
  state.text = \`var(--\${varName})\`;
}
