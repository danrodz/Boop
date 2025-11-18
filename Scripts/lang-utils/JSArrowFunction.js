/**
  {
    "api": 1,
    "name": "JS Arrow Function",
    "description": "Creates arrow function",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) {
  const params = state.text.trim() || 'x';
  state.text = \`(\${params}) => {
  // code here
}\`;
}
