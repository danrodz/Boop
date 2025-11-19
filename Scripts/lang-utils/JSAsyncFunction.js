/**
  {
    "api": 1,
    "name": "JS Async Function",
    "description": "Creates async function",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) {
  state.text = \`async function() {
  \${state.text}
}\`;
}
