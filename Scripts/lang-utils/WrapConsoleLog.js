/**
  {
    "api": 1,
    "name": "Wrap in console.log",
    "description": "Wraps selection in console.log",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "code,programming,javascript,python,format"
  }
**/

function main(state) {
  state.text = \`console.log(\${state.text});\`;
}
