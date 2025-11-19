/**
  {
    "api": 1,
    "name": "Wrap in Try-Catch",
    "description": "Wraps code in try-catch block",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "code,programming,javascript,python,format"
  }
**/

function main(state) {
  const code = state.text;
  state.text = \`try {
  \${code}
} catch (error) {
  console.error(error);
}\`;
}
